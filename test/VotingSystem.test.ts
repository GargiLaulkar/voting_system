import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";

describe("Voting System", function () {
  async function deployFixture() {
    const [owner, officer, voter, attacker] = await ethers.getSigners();

    const VotingRegistry = await ethers.getContractFactory("VotingRegistry");
    const votingRegistry = await upgrades.deployProxy(VotingRegistry, [owner.address]);

    const ZKVerifier = await ethers.getContractFactory("ZKVerifier");
    const zkVerifier = await ZKVerifier.deploy();

    const BallotFactory = await ethers.getContractFactory("BallotFactory");
    const ballotFactory = await upgrades.deployProxy(BallotFactory, [owner.address]);

    const VoteCast = await ethers.getContractFactory("VoteCast");
    const voteCast = await upgrades.deployProxy(VoteCast, [
      owner.address,
      await ballotFactory.getAddress(),
      await votingRegistry.getAddress(),
      await zkVerifier.getAddress(),
    ]);

    const officerRole = await ballotFactory.ELECTION_OFFICER_ROLE();
    await ballotFactory.grantRole(officerRole, officer.address);
    await votingRegistry.grantRole(await votingRegistry.ELECTION_OFFICER_ROLE(), officer.address);

    return { owner, officer, voter, attacker, votingRegistry, ballotFactory, voteCast };
  }

  async function createActiveElection(fixture: Awaited<ReturnType<typeof deployFixture>>) {
    const latest = await ethers.provider.getBlock("latest");
    const startTime = latest!.timestamp;
    const endTime = startTime + 86400;
    const electionId = 1;

    await fixture.ballotFactory.createElection("ipfs://ballot-metadata", startTime, endTime);
    await fixture.ballotFactory.setElectionState(electionId, 1);
    const merkleRoot = ethers.keccak256(ethers.toUtf8Bytes("eligible-voter-root"));
    await fixture.votingRegistry.setMerkleRoot(electionId, merkleRoot);

    return { electionId, merkleRoot };
  }

  function proofFor(merkleRoot: string, electionId: number, nullifierHash: string) {
    const proofHash = ethers.solidityPackedKeccak256(
      ["uint256", "uint256", "uint256"],
      [BigInt(merkleRoot), electionId, BigInt(nullifierHash)],
    );
    return ethers.AbiCoder.defaultAbiCoder().encode(["bytes32"], [proofHash]);
  }

  it("creates an election, accepts one valid vote, and stores a receipt", async function () {
    const fixture = await deployFixture();
    const { electionId, merkleRoot } = await createActiveElection(fixture);
    const nullifierHash = ethers.keccak256(ethers.toUtf8Bytes("nullifier-1"));
    const encryptedVote = "encrypted-candidate-choice";
    const proof = proofFor(merkleRoot, electionId, nullifierHash);

    await expect(fixture.voteCast.connect(fixture.voter).castVote(electionId, encryptedVote, nullifierHash, proof))
      .to.emit(fixture.voteCast, "VoteCasted")
      .withArgs(electionId, nullifierHash, anyValue, encryptedVote);

    expect(await fixture.voteCast.hasVoted(electionId, nullifierHash)).to.equal(true);
    expect(await fixture.voteCast.voteReceipts(electionId, nullifierHash)).to.not.equal(ethers.ZeroHash);
  });

  it("blocks double voting, invalid proofs, paused elections, and unauthorized administration", async function () {
    const fixture = await deployFixture();
    const { electionId, merkleRoot } = await createActiveElection(fixture);
    const nullifierHash = ethers.keccak256(ethers.toUtf8Bytes("nullifier-2"));
    const encryptedVote = "encrypted-vote";
    const proof = proofFor(merkleRoot, electionId, nullifierHash);

    await expect(fixture.ballotFactory.connect(fixture.attacker).setElectionPaused(electionId, true)).to.be.reverted;
    await fixture.voteCast.connect(fixture.voter).castVote(electionId, encryptedVote, nullifierHash, proof);
    await expect(fixture.voteCast.connect(fixture.voter).castVote(electionId, encryptedVote, nullifierHash, proof)).to.be.revertedWith("Vote already cast");

    const secondNullifier = ethers.keccak256(ethers.toUtf8Bytes("nullifier-3"));
    await expect(
      fixture.voteCast.connect(fixture.voter).castVote(electionId, encryptedVote, secondNullifier, ethers.randomBytes(32)),
    ).to.be.revertedWith("Invalid ZK Proof");

    await fixture.ballotFactory.setElectionPaused(electionId, true);
    await expect(
      fixture.voteCast.connect(fixture.voter).castVote(electionId, encryptedVote, secondNullifier, proofFor(merkleRoot, electionId, secondNullifier)),
    ).to.be.revertedWith("Election is not active");
  });

  it("validates election metadata, merkle roots, dependencies, and vote payloads", async function () {
    const fixture = await deployFixture();
    const latest = await ethers.provider.getBlock("latest");

    await expect(fixture.ballotFactory.createElection("", latest!.timestamp + 10, latest!.timestamp + 100)).to.be.revertedWith("Ballot metadata required");
    await expect(fixture.ballotFactory.createElection("ipfs://x", latest!.timestamp + 100, latest!.timestamp + 10)).to.be.revertedWith("Start time must be before end time");
    await expect(fixture.votingRegistry.setMerkleRoot(0, ethers.keccak256(ethers.toUtf8Bytes("root")))).to.be.revertedWith("Invalid election");
    await expect(fixture.votingRegistry.setMerkleRoot(1, ethers.ZeroHash)).to.be.revertedWith("Merkle root required");
    await expect(fixture.voteCast.updateDependencies(ethers.ZeroAddress, await fixture.votingRegistry.getAddress(), await fixture.voteCast.getAddress())).to.be.revertedWith("Invalid ballot factory");

    const { electionId, merkleRoot } = await createActiveElection(fixture);
    const nullifierHash = ethers.keccak256(ethers.toUtf8Bytes("nullifier-4"));
    await expect(
      fixture.voteCast.castVote(electionId, "", nullifierHash, proofFor(merkleRoot, electionId, nullifierHash)),
    ).to.be.revertedWith("Encrypted vote required");
    await expect(
      fixture.voteCast.castVote(electionId, "encrypted", ethers.ZeroHash, proofFor(merkleRoot, electionId, nullifierHash)),
    ).to.be.revertedWith("Invalid nullifier");
  });
});
