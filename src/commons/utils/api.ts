export const API = {
  ADDRESS: {
    ANALYTICS: "addresses/analytics",
    DETAIL: "addresses",
    MIN_MAX_BALANCE: "addresses/min-max-balance",
    TOP_ADDRESS: "addresses/top-addresses",
    TOKENS: "addresses/:address/tokens",
  },
  BLOCK: {
    DETAIL: "blocks",
    LIST: "blocks",
  },
  CONTRACT: "contracts",
  DELEGATION: {
    HEADER: "delegations/header",
    POOL_ANALYTICS: "delegations/pool-detail-analytics",
    POOL_DETAIL_HEADER: "delegations/pool-detail-header",
    POOL_DETAIL: "delegations/pool-detail",
    POOL_LIST: "delegations/pool-list",
    TOP: "delegations/top",
  },
  EPOCH: {
    CURRENT_EPOCH: "epochs/current",
    DETAIL: "epochs",
    LIST: "epochs",
  },
  POLICY: "policies",
  POOL: "pools",

  TOKEN: { LIST: "tokens", TOKEN_TRX: "tokens/:tokenId/txs", ANALYTICS: "tokens/analytics" },
  TRANSACTION: {
    CURRENT: "txs/current",
    DETAIL: "txs",
    LIST: "txs",
    GRAPH: "txs/graph",
  },
  STAKE: {
    ANALYTICS: "stakes/analytics",
    ANALYTICS_BALANCE: "stakes/analytics-balance",
    ANALYTICS_REWARD: "stakes/analytics-reward",
    DETAIL: "stakes",
    DE_REGISTRATION: "stakes/de-registration",
    TOP_DELEGATOR: "stakes/top-delegators",
    REGISTRATION: "stakes/registration",
    MIN_MAX_BALANCE: "stakes/min-max-balance",
  },
  STAKE_LIFECYCLE: {
    REGISTRATION: (stakeKey: string) => `stake-lifecycle/${stakeKey}/registrations`,
    DELEGATION: (stakeKey: string) => `stake-lifecycle/${stakeKey}/delegations`,
    WITHDRAW: (stakeKey: string) => `stake-lifecycle/${stakeKey}/withdrawals`,
    DELEGATION_DETAIL: (stakeKey: string, hash: string) => `stake-lifecycle/${stakeKey}/delegations/${hash}`,
    WITHDRAW_DETAIL: (stakeKey: string, hash: string) => `stake-lifecycle/${stakeKey}/withdrawals/${hash}`,
    DEREGISTRATION: (stakeKey: string) => `stake-lifecycle/${stakeKey}/de-registrations`,
    RECEIVED_REWARD: (stakeKey: string) => `stake-lifecycle/${stakeKey}/rewards`,
    WALLET_ACTIVITY: (stakeKey: string) => `stake-lifecycle/${stakeKey}/wallet-activity`,
    REWARDS_ACTIVITY: (stakeKey: string) => `stake-lifecycle/${stakeKey}/reward-activity`,
  },
  SPO_LIFECYCLE: {
    SPO_REGISTRATION: (poolId: string) => `pool-lifecycle/registration?poolView=${poolId}`,
    SPO_REGISTRATION_LIST: (poolId: string) => `pool-lifecycle/registration-list?poolView=${poolId}`,
    SPO_REGISTRATION_DETAIl: (poolView: string, poolId: number) =>
      `pool-lifecycle/registration-detail?poolView=${poolView}&id=${poolId}`,
    POOL_UPDATE: (poolId: string) => `pool-lifecycle/pool-update?poolView=${poolId}`,
    POOL_UPDATE_LIST: (poolId: string) => `pool-lifecycle/pool-update-list?poolView=${poolId}`,
    POOL_UPDATE_DETAIL: (poolId: number) => `pool-lifecycle/pool-update-detail?id=${poolId}`,
    POOL_INFO: (poolId: string) => `pool-lifecycle/pool-info?poolView=${poolId}`,
    REWARD: (poolId: string) => `pool-lifecycle/reward?poolView=${poolId}`,
    SPO_DEREGISTRATION: (poolId: string) => `pool-lifecycle/de-registration?poolView=${poolId}`,
    SPO_POOL_INFO: (poolId: string) => `pool-lifecycle/pool-info?poolView=${poolId}`,
    SPO_DEREGISTRATION_DETAIl: (poolView: string, poolId: number) =>
      `pool-lifecycle/de-registration-detail?poolView=${poolView}&id=${poolId}`,
  },
  MARKETS: "markets",
  PROTOCOL_PARAMETER: {
    CURRENT: "protocol/current",
    HISTORY: "protocol/:type/history",
  },
};

export const USER_API = {
  ACTIVITY_LOG: "user/activities-log",
  INFO: "user/info",
  BOOKMARK: "find-all-key",
};