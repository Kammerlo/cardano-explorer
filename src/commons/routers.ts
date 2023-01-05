export const routers = {
  HOME: "/",
  BLOCK_LIST: "/blocks",
  BLOCK_DETAIL: "/block/:blockId",
  TRANSACTION_LIST: "/transactions",
  TRANSACTION_DETAIL: "/transaction/:trxHash",
  EPOCH_LIST: "/epochs",
  EPOCH_DETAIL: "/epoch/:epochId",
  DELEGATION_POOLS: "/delegation-pools",
  DELEGATION_POOL_DETAIL: "/delegation-pool/:poolId",
  REGISTRATION_POOLS: "/registration-pools",
  STORY_LIST: "/stories",
  STORY_DETAIL: "/story/:storyId",
  ADDRESS_LIST: "/addresses",
  ADDRESS_DETAIL: "/address/:address",
  TOKEN_LIST: "/tokens",
  TOKEN_DETAIL: "/token/:tokenId",
  STAKE_LIST: "/stakes",
  STAKE_DETAIL: "/stake/:stakeId",
  CONTRACT_LIST: "/contracts",
  CONTRACT_DETAIL: "/contracts/:address",
  NFT_LIST: "/nfts",
  POLICY_DETAIL: "/policy/:policyId",
  NFT_DETAIL: "/nft/:nftId",
  TOP_DELEGATOR: "/top-delegator",
  SEARCH: "/search",
  ACCOUNT: "/account",
  MY_PROFILE: "/profile",
  BOOKMARK: "/bookmark",
  PRIVATE_NOTES: "/notes",
  NOT_FOUND: "/*",
};

export const details = {
  block: (blockId?: number) => routers.BLOCK_DETAIL.replace(":blockId", `${blockId ?? ""}`),
  transaction: (trxHash?: string) => routers.TRANSACTION_DETAIL.replace(":trxHash", trxHash ?? ""),
  epoch: (epochId?: number) => routers.EPOCH_DETAIL.replace(":epochId", `${epochId ?? ""}`),
  delegation: (poolId?: string) => routers.DELEGATION_POOL_DETAIL.replace(":poolId", poolId ?? ""),
  story: (storyId?: string) => routers.STORY_DETAIL.replace(":storyId", storyId ?? ""),
  address: (address?: string) => routers.ADDRESS_DETAIL.replace(":address", address ?? ""),
  token: (tokenId?: string) => routers.TOKEN_DETAIL.replace(":tokenId", tokenId ?? ""),
  stake: (stakeId?: string) => routers.STAKE_DETAIL.replace(":stakeId", stakeId ?? ""),
  nft: (nftId?: string) => routers.NFT_DETAIL.replace(":nftId", nftId ?? ""),
  policyDetail: (policyId?: string) => routers.POLICY_DETAIL.replace(":policyId", policyId ?? ""),
};
