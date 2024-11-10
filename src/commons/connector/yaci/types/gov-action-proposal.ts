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

import { JsonNode } from "./json-node";
/**
 *
 *
 * @export
 * @interface GovActionProposal
 */
export interface GovActionProposal {
  /**
   * @type {number}
   * @memberof GovActionProposal
   */
  blockNumber?: number;

  /**
   * @type {number}
   * @memberof GovActionProposal
   */
  blockTime?: number;

  /**
   * @type {string}
   * @memberof GovActionProposal
   */
  txHash?: string;

  /**
   * @type {number}
   * @memberof GovActionProposal
   */
  index?: number;

  /**
   * @type {number}
   * @memberof GovActionProposal
   */
  slot?: number;

  /**
   * @type {number}
   * @memberof GovActionProposal
   */
  deposit?: number;

  /**
   * @type {string}
   * @memberof GovActionProposal
   */
  returnAddress?: string;

  /**
   * @type {string}
   * @memberof GovActionProposal
   */
  type?: GovActionProposalTypeEnum;

  /**
   * @type {JsonNode}
   * @memberof GovActionProposal
   */
  details?: JsonNode;

  /**
   * @type {string}
   * @memberof GovActionProposal
   */
  anchorUrl?: string;

  /**
   * @type {string}
   * @memberof GovActionProposal
   */
  anchorHash?: string;

  /**
   * @type {number}
   * @memberof GovActionProposal
   */
  epoch?: number;
}

/**
 * @export
 * @enum {string}
 */
export enum GovActionProposalTypeEnum {
  PARAMETERCHANGEACTION = "PARAMETER_CHANGE_ACTION",
  HARDFORKINITIATIONACTION = "HARD_FORK_INITIATION_ACTION",
  TREASURYWITHDRAWALSACTION = "TREASURY_WITHDRAWALS_ACTION",
  NOCONFIDENCE = "NO_CONFIDENCE",
  UPDATECOMMITTEE = "UPDATE_COMMITTEE",
  NEWCONSTITUTION = "NEW_CONSTITUTION",
  INFOACTION = "INFO_ACTION"
}
