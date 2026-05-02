# Blockchain-Based Secure Voting System

A full-stack decentralized application built for secure, transparent, and accessible voting.

## Features
- Voter Registration with KYC flow mapping to an on-chain Merkle root
- Encrypted Vote Casting using commit-reveal schemas
- Time-locked Ballots & Roles via OpenZeppelin Upgradable contracts
- ZK-ready Verification structures

## Setup Instructions
1. Install dependencies: `npm install`
2. Start local Hardhat node: `npx hardhat node`
3. Deploy contracts (in new terminal): `npx hardhat run scripts/deploy.ts --network localhost`
4. Start frontend: `cd frontend && npm install && npm run dev`

## Environment Variables
See `.env.example` in both root and `frontend/`

## Testing
- Smart Contracts: `npx hardhat test`
- Frontend: `npm run test --prefix frontend`
