interface TProtocolParam {
  minFeeA: string | number;
  minFeeB: string | number;
  maxBlockSize: string | number;
  maxTxSize: string | number;
  maxBHSize: string | number;
  keyDeposit: string | number;
  poolDeposit: string | number;
  maxEpoch: string | number;
  entropy: string | number;
  protocolMajor: string | number;
  protocolMinor: string | number;
  minUtxoValue: string | number;
  minPoolCost: string | number;
  priceMem: string | number;
  priceStep: string | number;
  maxTxExMem: string | number;
  maxTxExSteps: string | number;
  maxBlockExMem: string | number;
  maxBlockExSteps: string | number;
  maxValSize: string | number;
  collateralPercent: string | number;
  maxCollateralInputs: string | number;
  coinsPerUTxOByte: string | number;
  maxTxExUnits: string | number;
  maxBBSize: string | number;
  maxBlockExUnits: string | number;
  rho: string | number;
  tau: string | number;
  a0: string | number;
  eMax: string | number;
  nOpt: string | number;
  costModels: string | number;
  collateralPercentage: string | number;
  govActionLifetime: string | number;
  govActionDeposit: string | number;
  drepDeposit: string | number;
  drepActivity: string | number;
  ccMinSize: string | number;
  ccMaxTermLength: string | number;
}
