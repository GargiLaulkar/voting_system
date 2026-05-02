import { ethers, upgrades } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy VotingRegistry
  const VotingRegistry = await ethers.getContractFactory("VotingRegistry");
  const votingRegistry = await upgrades.deployProxy(VotingRegistry, [deployer.address], {
    initializer: "initialize",
  });
  await votingRegistry.waitForDeployment();
  const votingRegistryAddress = await votingRegistry.getAddress();
  console.log("VotingRegistry deployed to:", votingRegistryAddress);

  // Deploy ZKVerifier (Non-upgradeable mock)
  const ZKVerifier = await ethers.getContractFactory("ZKVerifier");
  const zkVerifier = await ZKVerifier.deploy();
  await zkVerifier.waitForDeployment();
  const zkVerifierAddress = await zkVerifier.getAddress();
  console.log("ZKVerifier deployed to:", zkVerifierAddress);

  // Deploy BallotFactory
  const BallotFactory = await ethers.getContractFactory("BallotFactory");
  const ballotFactory = await upgrades.deployProxy(BallotFactory, [deployer.address], {
    initializer: "initialize",
  });
  await ballotFactory.waitForDeployment();
  const ballotFactoryAddress = await ballotFactory.getAddress();
  console.log("BallotFactory deployed to:", ballotFactoryAddress);

  // Deploy VoteCast
  const VoteCast = await ethers.getContractFactory("VoteCast");
  const voteCast = await upgrades.deployProxy(VoteCast, [
    deployer.address,
    ballotFactoryAddress,
    votingRegistryAddress,
    zkVerifierAddress
  ], {
    initializer: "initialize",
  });
  await voteCast.waitForDeployment();
  const voteCastAddress = await voteCast.getAddress();
  console.log("VoteCast deployed to:", voteCastAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
