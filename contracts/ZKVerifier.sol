// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ZKVerifier
 * @dev Deterministic development verifier.
 * Replace this contract with a snarkjs/circom generated verifier before using real elections.
 */
contract ZKVerifier {
    /**
     * @dev Simulates verification of a zk-SNARK proof.
     * @param proof The simulated proof bytes.
     * @param publicSignals The public signals (e.g., nullifier hash, election ID, merkle root).
     * @return bool True if valid, false otherwise.
     */
    function verifyProof(bytes memory proof, uint256[] memory publicSignals) public pure returns (bool) {
        if (proof.length != 32 || publicSignals.length != 3) {
            return false;
        }

        bytes32 supplied = abi.decode(proof, (bytes32));
        bytes32 expected = keccak256(abi.encodePacked(publicSignals[0], publicSignals[1], publicSignals[2]));
        return supplied == expected;
    }
}
