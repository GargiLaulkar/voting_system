export type ElectionStatus = 'Active' | 'Draft' | 'Closed' | 'Live';

export type Candidate = {
  id: number;
  name: string;
  party: string;
  manifesto: string;
  votes: number;
};

export type Election = {
  id: number;
  title: string;
  description: string;
  status: ElectionStatus;
  startDate: string;
  endDate: string;
  registeredVoters: number;
  candidates: Candidate[];
  eligibility: 'Eligible' | 'Not Registered' | 'Already Voted';
  paused?: boolean;
};

export const contractAddresses = {
  votingRegistry: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  ballotFactory: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  voteCast: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  zkVerifier: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
};

export const elections: Election[] = [
  {
    id: 1,
    title: '2026 National Presidential Election',
    description: 'National executive election with privacy-preserving ballot submission and public tally verification.',
    status: 'Active',
    startDate: '2026-05-01T09:00:00+05:30',
    endDate: '2026-11-03T20:00:00+05:30',
    registeredVoters: 1245032,
    eligibility: 'Eligible',
    candidates: [
      { id: 1, name: 'Alice Johnson', party: 'Progressive Party', manifesto: 'Modernize civic services, expand voting access, and strengthen privacy guarantees.', votes: 584202 },
      { id: 2, name: 'Bob Smith', party: 'Conservative Party', manifesto: 'Improve local infrastructure, election resilience, and public-sector accountability.', votes: 421183 },
      { id: 3, name: 'Carol Davis', party: 'Independent', manifesto: 'Advance transparent budgets, open data portals, and nonpartisan election oversight.', votes: 239647 },
    ],
  },
  {
    id: 2,
    title: 'City Council Initiative 42',
    description: 'Municipal referendum on smart public transit funding and neighborhood safety upgrades.',
    status: 'Draft',
    startDate: '2026-12-01T08:00:00+05:30',
    endDate: '2026-12-15T18:00:00+05:30',
    registeredVoters: 0,
    eligibility: 'Not Registered',
    candidates: [
      { id: 1, name: 'Yes on 42', party: 'Referendum Option', manifesto: 'Approve the transit modernization funding package.', votes: 0 },
      { id: 2, name: 'No on 42', party: 'Referendum Option', manifesto: 'Reject the proposed funding package.', votes: 0 },
    ],
  },
  {
    id: 3,
    title: 'State Representative District 9',
    description: 'District-level legislative election using auditable encrypted receipts.',
    status: 'Closed',
    startDate: '2026-04-01T08:00:00+05:30',
    endDate: '2026-04-30T18:00:00+05:30',
    registeredVoters: 45021,
    eligibility: 'Already Voted',
    candidates: [
      { id: 1, name: 'Priya Raman', party: 'Civic Alliance', manifesto: 'Focus on healthcare access, election transparency, and clean energy jobs.', votes: 23870 },
      { id: 2, name: 'Daniel Kim', party: 'People First', manifesto: 'Support small businesses, education funding, and independent audits.', votes: 18402 },
      { id: 3, name: 'Maya Torres', party: 'Independent', manifesto: 'Build a digital-first constituent service model.', votes: 2749 },
    ],
  },
];

export const voterRegistry = [
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
  '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  '0x1234567890AbcdEF1234567890aBcdef12345678',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x111111111117dC0aa78b770fA6A738034120C302',
  '0x2222222222222222222222222222222222222222',
  '0x3333333333333333333333333333333333333333',
  '0x4444444444444444444444444444444444444444',
  '0x5555555555555555555555555555555555555555',
  '0x6666666666666666666666666666666666666666',
  '0x7777777777777777777777777777777777777777',
];

export const auditEvents = [
  { id: 1, type: 'VoteRegistered', timestamp: '2026-05-03 00:12 IST', tx: '0x8f3a9b2c4d5e6f70123456789abcdef123456789abcdef123456789abcdef1a2' },
  { id: 2, type: 'VoterCredentialIssued', timestamp: '2026-05-02 23:58 IST', tx: '0x7d22fbc183a907ba123456789abcdef123456789abcdef123456789abc111' },
  { id: 3, type: 'ElectionCreated', timestamp: '2026-05-02 22:44 IST', tx: '0x9271adc90123efab123456789abcdef123456789abcdef123456789abc999' },
  { id: 4, type: 'RegistryRootUpdated', timestamp: '2026-05-02 22:10 IST', tx: '0x4128ddbe3a23123456789abcdef123456789abcdef123456789abc8888' },
];

export const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

export const formatContractError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes('UNPREDICTABLE_GAS_LIMIT')) return 'Transaction failed - check your wallet balance';
  if (message.includes('ACTION_REJECTED') || message.includes('User rejected')) return 'Transaction cancelled by user';
  if (message.includes('CALL_EXCEPTION')) return 'Contract error - you may not be eligible for this action';
  return message || 'Something went wrong. Please try again.';
};
