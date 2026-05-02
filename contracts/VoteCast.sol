// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

interface IBallotFactory {
    function isElectionActive(uint256 electionId) external view returns (bool);
}

interface IVotingRegistry {
    function getMerkleRoot(uint256 electionId) external view returns (bytes32);
}

interface IZKVerifier {
    function verifyProof(bytes memory proof, uint256[] memory publicSignals) external view returns (bool);
}

/**
 * @title VoteCast
 * @dev Handles secure vote casting using zk-proofs for eligibility and encrypted payloads for choices.
 */
contract VoteCast is Initializable, AccessControlUpgradeable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    IBallotFactory public ballotFactory;
    IVotingRegistry public votingRegistry;
    IZKVerifier public zkVerifier;
    uint256 private reentrancyStatus;

    // Mapping from election ID to nullifier hash to prevent double voting
    mapping(uint256 => mapping(bytes32 => bool)) public nullifiers;
    mapping(uint256 => mapping(bytes32 => bytes32)) public voteReceipts;

    event VoteCasted(uint256 indexed electionId, bytes32 indexed nullifierHash, bytes32 indexed receiptHash, string encryptedVote);
    event DependenciesUpdated(address ballotFactory, address votingRegistry, address zkVerifier);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address _ballotFactory,
        address _votingRegistry,
        address _zkVerifier
    ) public initializer {
        __AccessControl_init();
        require(_ballotFactory != address(0), "Invalid ballot factory");
        require(_votingRegistry != address(0), "Invalid voting registry");
        require(_zkVerifier != address(0), "Invalid verifier");
        
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(ADMIN_ROLE, defaultAdmin);

        ballotFactory = IBallotFactory(_ballotFactory);
        votingRegistry = IVotingRegistry(_votingRegistry);
        zkVerifier = IZKVerifier(_zkVerifier);
        reentrancyStatus = 1;
    }

    modifier nonReentrant() {
        require(reentrancyStatus != 2, "Reentrant call");
        reentrancyStatus = 2;
        _;
        reentrancyStatus = 1;
    }

    function updateDependencies(
        address _ballotFactory,
        address _votingRegistry,
        address _zkVerifier
    ) external onlyRole(ADMIN_ROLE) {
        require(_ballotFactory != address(0), "Invalid ballot factory");
        require(_votingRegistry != address(0), "Invalid voting registry");
        require(_zkVerifier != address(0), "Invalid verifier");

        ballotFactory = IBallotFactory(_ballotFactory);
        votingRegistry = IVotingRegistry(_votingRegistry);
        zkVerifier = IZKVerifier(_zkVerifier);
        emit DependenciesUpdated(_ballotFactory, _votingRegistry, _zkVerifier);
    }

    /**
     * @dev Casts an encrypted vote.
     * @param electionId ID of the election.
     * @param encryptedVote The encrypted choices.
     * @param nullifierHash Unique hash ensuring the voter hasn't voted yet.
     * @param proof ZK proof of eligibility.
     */
    function castVote(
        uint256 electionId,
        string calldata encryptedVote,
        bytes32 nullifierHash,
        bytes calldata proof
    ) external nonReentrant returns (bytes32 receiptHash) {
        require(bytes(encryptedVote).length > 0, "Encrypted vote required");
        require(nullifierHash != bytes32(0), "Invalid nullifier");
        require(proof.length > 0, "Proof required");
        require(ballotFactory.isElectionActive(electionId), "Election is not active");
        require(!nullifiers[electionId][nullifierHash], "Vote already cast");

        // The public signals would typically include the election Merkle root, election ID, and the nullifierHash.
        // We simulate that by passing them to the verifier.
        bytes32 currentRoot = votingRegistry.getMerkleRoot(electionId);
        require(currentRoot != bytes32(0), "Election has no registered voters");

        uint256[] memory publicSignals = new uint256[](3);
        publicSignals[0] = uint256(currentRoot);
        publicSignals[1] = electionId;
        publicSignals[2] = uint256(nullifierHash);

        require(zkVerifier.verifyProof(proof, publicSignals), "Invalid ZK Proof");

        nullifiers[electionId][nullifierHash] = true;
        receiptHash = keccak256(abi.encodePacked(electionId, nullifierHash, encryptedVote, block.chainid, address(this)));
        voteReceipts[electionId][nullifierHash] = receiptHash;
        
        emit VoteCasted(electionId, nullifierHash, receiptHash, encryptedVote);
    }

    function hasVoted(uint256 electionId, bytes32 nullifierHash) external view returns (bool) {
        return nullifiers[electionId][nullifierHash];
    }
}
