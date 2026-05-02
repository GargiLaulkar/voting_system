// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title VotingRegistry
 * @dev Manages the eligibility of voters via Merkle roots. Each election can have its own Merkle root
 * representing the eligible voters.
 */
contract VotingRegistry is Initializable, AccessControlUpgradeable {
    bytes32 public constant ELECTION_OFFICER_ROLE = keccak256("ELECTION_OFFICER_ROLE");

    // Mapping from election ID to Merkle Root of eligible voters
    mapping(uint256 => bytes32) public electionMerkleRoots;

    event MerkleRootUpdated(uint256 indexed electionId, bytes32 newRoot);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin) public initializer {
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(ELECTION_OFFICER_ROLE, defaultAdmin);
    }

    /**
     * @dev Sets the Merkle root for a specific election.
     * @param electionId ID of the election.
     * @param merkleRoot The new Merkle root.
     */
    function setMerkleRoot(uint256 electionId, bytes32 merkleRoot) external onlyRole(ELECTION_OFFICER_ROLE) {
        require(electionId != 0, "Invalid election");
        require(merkleRoot != bytes32(0), "Merkle root required");
        electionMerkleRoots[electionId] = merkleRoot;
        emit MerkleRootUpdated(electionId, merkleRoot);
    }

    /**
     * @dev Retrieves the Merkle root for a specific election.
     * @param electionId ID of the election.
     * @return The Merkle root.
     */
    function getMerkleRoot(uint256 electionId) external view returns (bytes32) {
        return electionMerkleRoots[electionId];
    }
}
