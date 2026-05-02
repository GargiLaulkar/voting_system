# Smart Contract Audit Checklist

## 1. Access Control
- [ ] Only authorized roles can call restricted functions
- [ ] Proper initialization checks for upgradeable contracts
- [ ] Owner account is secured (multisig recommended for production)

## 2. Reentrancy
- [ ] `ReentrancyGuard` applied to all state-changing functions
- [ ] Checks-Effects-Interactions pattern strictly followed

## 3. Cryptography and Logic
- [ ] Vote commit-reveal hashes cannot be reversed without the salt
- [ ] Nullifiers securely prevent double voting
- [ ] Valid ZK proofs cannot be replayed (use nullifier hashes)
- [ ] Timestamps (e.g. block.timestamp) are used securely with reasonable margins

## 4. Upgradability
- [ ] All proxies and implementation logic use storage gap correctly
- [ ] No `constructor` logic used in upgradeable contracts, only `initialize()`
- [ ] State variable layout order is maintained between upgrades

## 5. Gas Limits & DoS
- [ ] No unbounded loops
- [ ] Batch operations are size-limited
- [ ] Contracts do not rely on untrusted external calls failing or reverting unexpectedly

## 6. Frontend / Client
- [ ] Votes are encrypted *client-side* before submission
- [ ] Private keys are *never* stored or logged
- [ ] Input sanitization on all user-supplied data
- [ ] Secure HTTP headers applied
