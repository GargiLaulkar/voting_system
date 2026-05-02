import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { VotingRegistry, BallotFactory, VoteCast, ZKVerifier } from "../typechain-types";

describe("Voting System", function () {
  let votingRegistry: any;
  let ballotFactory: any;
  let voteCast: any;
  let zkVerifier: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const VotingRegistry = await ethers.getContractFactory("VotingRegistry");
    votingRegistry = await upgrades.deployProxy(VotingRegistry, [owner.address]);

    const ZKVerifier = await ethers.getContractFactory("ZKVerifier");
    zkVerifier = await ZKVerifier.deploy();

    const BallotFactory = await ethers.getContractFactory("BallotFactory");
    ballotFactory = await upgrades.deployProxy(BallotFactory, [owner.address]);

    const VoteCast = await ethers.getContractFactory("VoteCast");
    voteCast = await upgrades.deployProxy(VoteCast, [
      owner.address,
      await ballotFactory.getAddress(),
      await votingRegistry.getAddress(),
      await zkVerifier.getAddress()
    ]);
  });

  it("Should create an election and cast a vote", async function () {
    const electionId = 1;
    const ipfsHash = "QmTestHash123";
    
    // Create Election
    const block = await ethers.provider.getBlock("latest");
    const startTime = block!.timestamp;
    const endTime = startTime + 86400; // 1 day
    
    await ballotFactory.createElection(ipfsHash, startTime, endTime);
    await ballotFactory.setElectionState(electionId, 1); // 1 = Active

    // Set Merkle Root for election
    const dummyRoot = ethers.keccak256(ethers.toUtf8Bytes("dummy-root"));
    await votingRegistry.setMerkleRoot(electionId, dummyRoot);

    // Cast Vote
    const encryptedVote = "encrypted-data";
    const nullifierHash = ethers.keccak256(ethers.toUtf8Bytes("nullifier-1"));
    const dummyProof = ethers.toUtf8Bytes("dummy-proof"); // must be > 0 bytes

    await expect(voteCast.castVote(electionId, encryptedVote, nullifierHash, dummyProof))
      .to.emit(voteCast, "VoteCasted")
      .withArgs(electionId, nullifierHash, encryptedVote);

    // Double voting should fail
    await expect(voteCast.castVote(electionId, encryptedVote, nullifierHash, dummyProof))
      .to.be.revertedWith("Vote already cast");
  });
});
