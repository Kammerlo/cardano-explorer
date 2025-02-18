/* tslint:disable */
/* eslint-disable */
/**
 * Yaci Store API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 *
 *
 * @export
 * @interface VotingProcedure
 */
export interface VotingProcedure {
  /**
   * @type {number}
   * @memberof VotingProcedure
   */
  blockNumber?: number;

  /**
   * @type {number}
   * @memberof VotingProcedure
   */
  blockTime?: number;

  /**
   * @type {string}
   * @memberof VotingProcedure
   */
  id?: string;

  /**
   * @type {string}
   * @memberof VotingProcedure
   */
  txHash?: string;

  /**
   * @type {number}
   * @memberof VotingProcedure
   */
  index?: number;

  /**
   * @type {number}
   * @memberof VotingProcedure
   */
  slot?: number;

  /**
   * @type {string}
   * @memberof VotingProcedure
   */
  voterType?: VotingProcedureVoterTypeEnum;

  /**
   * @type {string}
   * @memberof VotingProcedure
   */
  voterHash?: string;

  /**
   * @type {string}
   * @memberof VotingProcedure
   */
  govActionTxHash?: string;

  /**
   * @type {number}
   * @memberof VotingProcedure
   */
  govActionIndex?: number;

  /**
   * @type {string}
   * @memberof VotingProcedure
   */
  vote?: VotingProcedureVoteEnum;

  /**
   * @type {string}
   * @memberof VotingProcedure
   */
  anchorUrl?: string;

  /**
   * @type {string}
   * @memberof VotingProcedure
   */
  anchorHash?: string;

  /**
   * @type {number}
   * @memberof VotingProcedure
   */
  epoch?: number;
}

/**
 * @export
 * @enum {string}
 */
export enum VotingProcedureVoterTypeEnum {
  CONSTITUTIONALCOMMITTEEHOTKEYHASH = "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH",
  CONSTITUTIONALCOMMITTEEHOTSCRIPTHASH = "CONSTITUTIONAL_COMMITTEE_HOT_SCRIPT_HASH",
  DREPKEYHASH = "DREP_KEY_HASH",
  DREPSCRIPTHASH = "DREP_SCRIPT_HASH",
  STAKINGPOOLKEYHASH = "STAKING_POOL_KEY_HASH"
}
/**
 * @export
 * @enum {string}
 */
export enum VotingProcedureVoteEnum {
  NO = "NO",
  YES = "YES",
  ABSTAIN = "ABSTAIN"
}
