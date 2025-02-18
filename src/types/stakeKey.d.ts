interface IStakeKey {
  txKey?: string;
  txHash: string;
  txTime: string;
  block: number;
  epoch: number;
  slotNo: number;
  epochSlotNo: number;
  stakeKey: string;
  poolName?: string;
}

type StakeStatus = "ACTIVE" | "DEACTIVATED" | "INACTIVE" | "RETIRED" | "EXPIRED";

interface IStakeKeyDetail {
  status: StakeStatus;
  stakeAddress: string;
  totalStake: number;
  rewardAvailable: number;
  rewardWithdrawn: number;
  rewardPools: string[];
  pool: {
    tickerName: string;
    poolName: string;
    poolId: string;
    iconUrl?: string;
    logoUrl?: string;
  };
}

type TabStakeDetail = "delegation" | "stake-key" | "withdrawal" | "instantaneous" | "transactions" | "";

interface DelegationHistory {
  time: string;
  epochNo: number;
  blockNo: number;
  epochSlotNo: number;
  txHash: string;
  poolId: string;
  poolData: string;
}

interface Instantaneous {
  time: string;
  epochNo: number;
  blockNo: number;
  amount: string;
  epochSlotNo: number;
  txHash: string;
}

interface StakeHistory {
  time: string;
  epochNo: number;
  blockNo: number;
  epochSlotNo: number;
  txHash: string;
  action: "Registered" | "De Registered";
}

interface WithdrawalHistory {
  time: string;
  epochNo: number;
  blockNo: number;
  amount: string;
  epochSlotNo: number;
  txHash: string;
}

interface StakeAnalytics {
  activeStake: number;
  liveStake: number;
}

interface PostOverview {
  depositsAndFees: number;
  rewards: number;
  treasury: number;
  reserves: number;
  epoch: number;
}

interface RegistrationItem {
  txHash: string;
  fee: number;
  deposit: number;
  time: string;
}

interface RegistrationDetail extends RegistrationItem {
  joinDepositPaid: boolean;
}

interface DelegationItem {
  txHash: string;
  outSum: number;
  fee: number;
  time: string;
  poolName?: string;
  poolId: string;
}
interface DelegationDetail extends DelegationItem {
  blockNo: number;
  epoch: number;
  poolId: string;
  poolName: string;
  stakeTotalAmount: number;
}

interface RewardDistributionItem {
  epoch: number;
  time: string;
  amount: number;
  type: string;
}

interface WithdrawItem {
  txHash: string;
  value: number;
  time: string;
  fee: number;
}

interface WithdrawalHistoryItem {
  amount: number;
  blockNo: number;
  epochNo: number;
  epochSlotNo: number;
  fee: number;
  time: string;
  txHash: string;
  txId: number;
}

type DeregistrationItem = RegistrationItem;

type DeregistrationDetail = RegistrationDetail;

interface StakeDelegations {
  blockNo: number;
  epochNo: number;
  epochSlotNo: number;
  pools: string[];
  stakeKeys: string[];
  time: string;
  txHash: string;
  slotNo: number;
}

interface InstantRewards {
  blockNo: number;
  epochNo: number;
  epochSlotNo: number;
  numberOfStakes: number;
  slotNo: number;
  time: string;
  txHash: string;
  rewards: number;
}

interface RewardDistributionStaking {
  stakeAddress: string;
  rewardAvailable: number;
  hasMemberReward: boolean;
  hasLeaderReward: boolean;
}

interface AnalyticsBalance {
  date: string;
  value: number;
}

interface AnalyticsReward {
  epoch: number;
  value: number;
}

interface StakeAnalyticsBalance {
  data: AnalyticsBalance[];
  highestBalance: number | null;
  lowestBalance: number | null;
}

interface AnalyticsBalanceExpanded extends AnalyticsBalance {
  highest: number;
  lowest: number;
}

interface AnalyticRewardsExpanded extends AnalyticsReward {
  highest: number;
  lowest: number;
}
