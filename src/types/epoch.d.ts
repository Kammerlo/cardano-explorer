interface IDataEpoch {
  no: number;
  status: string;
  blkCount: number;
  endTime: string;
  startTime: string;
  outSum: number;
  txCount: number;
}

interface IEpoch {
  data: IDataEpoch[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

interface IBlockEpochDetail extends IDataEpoch {
  slot: string;
  createdBy: string;
  transaction: string;
}

