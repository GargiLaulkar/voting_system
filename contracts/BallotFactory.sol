// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title BallotFactory
 * @dev Manages the creation and lifecycle of elections.
 */
contract BallotFactory is Initializable, AccessControlUpgradeable {
    bytes32 public constant ELECTION_OFFICER_ROLE = keccak256("ELECTION_OFFICER_ROLE");

    enum ElectionState { Draft, Active, Closed }

    struct Election {
        string ipfsHash;      // IPFS hash for ballot metadata (candidates, questions)
        uint256 startTime;
        uint256 endTime;
        ElectionState state;
        bool paused;
        bool exists;
    }

    uint256 public electionCount;
    mapping(uint256 => Election) public elections;

    event ElectionCreated(uint256 indexed electionId, string ipfsHash, uint256 startTime, uint256 endTime);
    event ElectionStateChanged(uint256 indexed electionId, ElectionState newState);
    event ElectionPaused(uint256 indexed electionId, bool paused);

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
     * @dev Creates a new election.
     * @param ipfsHash IPFS hash for ballot content.
     * @param startTime Start timestamp.
     * @param endTime End timestamp.
     */
    function createElection(string calldata ipfsHash, uint256 startTime, uint256 endTime) external onlyRole(ELECTION_OFFICER_ROLE) {
        require(bytes(ipfsHash).length > 0, "Ballot metadata required");
        require(startTime < endTime, "Start time must be before end time");
        require(endTime > block.timestamp, "End time must be in the future");
        
        uint256 electionId = ++electionCount;
        elections[electionId] = Election({
            ipfsHash: ipfsHash,
            startTime: startTime,
            endTime: endTime,
            state: ElectionState.Draft,
            paused: false,
            exists: true
        });

        emit ElectionCreated(electionId, ipfsHash, startTime, endTime);
    }

    /**
     * @dev Updates the state of an election.
     * @param electionId ID of the election.
     * @param newState The new state.
     */
    function setElectionState(uint256 electionId, ElectionState newState) external onlyRole(ELECTION_OFFICER_ROLE) {
        Election storage election = elections[electionId];
        require(election.exists, "Election does not exist");
        require(election.state != ElectionState.Closed || newState == ElectionState.Closed, "Closed election is final");
        if (newState == ElectionState.Active) {
            require(block.timestamp < election.endTime, "Election has ended");
        }
        election.state = newState;
        emit ElectionStateChanged(electionId, newState);
    }

    function setElectionPaused(uint256 electionId, bool paused) external onlyRole(ELECTION_OFFICER_ROLE) {
        Election storage election = elections[electionId];
        require(election.exists, "Election does not exist");
        require(election.state != ElectionState.Closed, "Closed election is final");
        election.paused = paused;
        emit ElectionPaused(electionId, paused);
    }

    /**
     * @dev Helper to check if an election is currently active and within time bounds.
     */
    function isElectionActive(uint256 electionId) public view returns (bool) {
        Election memory election = elections[electionId];
        return (election.exists && 
                election.state == ElectionState.Active && 
                !election.paused &&
                block.timestamp >= election.startTime && 
                block.timestamp <= election.endTime);
    }
}
