enum EpochStatus {
  FINISHED = "Finish",
  REWARDING = "Rewarding",
  IN_PROGRESS = "In Progress",
  SYNCING = "Syncing"
}
interface IDataEpoch {
  no: number;
  status: keyof typeof EpochStatus;
  blkCount: number;
  endTime: string;
  startTime: string;
  outSum: number;
  txCount: number;
  epochSlotNo: number;
  maxSlot: number;
  rewardsDistributed: number;
  account: number;
  syncingProgress: number;
}

interface EpochCurrentType {
  no: number;
  slot: number;
  totalSlot: number;
  account: number;
  endTime: string;
  startTime: string;
  circulatingSupply: number;
  syncingProgress: number;
  blkCount: number;
}

interface IReportEpochSize {
  size: number;
  fee: number;
  epoch: number;
}
