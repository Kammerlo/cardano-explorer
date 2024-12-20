import { YaciConnector } from "./yaci/yaciConnector";
import { ApiReturnType } from "./types/APIReturnType";
import { FunctionEnum } from "./types/FunctionEnum";
import { POOL_TYPE } from "../../pages/RegistrationPools";
// @ts-ignore
import { TProtocolParam } from "../../types/protocol";
import { ParsedUrlQuery } from "querystring";

const API_URL: string = process.env.REACT_APP_API_URL || "";
const API_CONNECTOR_TYPE: string = process.env.REACT_APP_API_TYPE || "";

export enum StakeAddressAction {
  REGISTRATION,
  DEREGISTRATION
}

export abstract class ApiConnector {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public static getApiConnector(): ApiConnector {
    if (API_CONNECTOR_TYPE === "YACI") {
      return new YaciConnector(API_URL);
    }
    throw new Error("Invalid API_CONNECTOR_TYPE");
    // return new YaciConnector("https://api.mainnet.yaci.xyz/api/v1");
  }
  abstract getSupportedFunctions(): FunctionEnum[];

  abstract getEpochs(pageInfo: ParsedUrlQuery): Promise<ApiReturnType<IDataEpoch[]>>;

  abstract getEpoch(epochId: number): Promise<ApiReturnType<IDataEpoch>>;

  abstract getBlocksPage(pageInfo: ParsedUrlQuery): Promise<ApiReturnType<Block[]>>;

  abstract getBlocksByEpoch(epoch: number): Promise<ApiReturnType<Block[]>>;

  abstract getBlockDetail(blockId: string): Promise<ApiReturnType<Block>>;

  abstract getTxDetail(txHash: string): Promise<ApiReturnType<TransactionDetail>>;

  abstract getTransactions(
    blockId: number | string | undefined,
    pageInfo: ParsedUrlQuery
  ): Promise<ApiReturnType<Transaction[]>>;

  abstract getWalletAddressFromAddress(address: string): Promise<ApiReturnType<WalletAddress>>;

  abstract getWalletStakeFromAddress(address: string): Promise<ApiReturnType<WalletStake>>;

  abstract getStakeAddressRegistrations(stakeAddressAction: StakeAddressAction): Promise<ApiReturnType<IStakeKey[]>>;

  abstract getStakeDelegations(): Promise<ApiReturnType<IStakeKey[]>>;

  abstract getPoolRegistrations(type: POOL_TYPE): Promise<ApiReturnType<Registration[]>>;

  abstract getCurrentProtocolParameters(): Promise<ApiReturnType<TProtocolParam>>;
}
