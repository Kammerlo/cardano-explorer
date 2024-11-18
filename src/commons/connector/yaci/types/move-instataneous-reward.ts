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
 * @interface MoveInstataneousReward
 */
export interface MoveInstataneousReward {
  /**
   * @type {number}
   * @memberof MoveInstataneousReward
   */
  blockNumber?: number;

  /**
   * @type {number}
   * @memberof MoveInstataneousReward
   */
  blockTime?: number;

  /**
   * @type {string}
   * @memberof MoveInstataneousReward
   */
  pot?: MoveInstataneousRewardPotEnum;

  /**
   * @type {string}
   * @memberof MoveInstataneousReward
   */
  txHash?: string;

  /**
   * @type {number}
   * @memberof MoveInstataneousReward
   */
  certIndex?: number;

  /**
   * @type {string}
   * @memberof MoveInstataneousReward
   */
  credential?: string;

  /**
   * @type {string}
   * @memberof MoveInstataneousReward
   */
  address?: string;

  /**
   * @type {number}
   * @memberof MoveInstataneousReward
   */
  amount?: number;

  /**
   * @type {number}
   * @memberof MoveInstataneousReward
   */
  epoch?: number;

  /**
   * @type {number}
   * @memberof MoveInstataneousReward
   */
  slot?: number;

  /**
   * @type {string}
   * @memberof MoveInstataneousReward
   */
  blockHash?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum MoveInstataneousRewardPotEnum {
  RESERVES = "RESERVES",
  TREASURY = "TREASURY"
}