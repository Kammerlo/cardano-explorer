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
 * @interface StakeAccountInfo
 */
export interface StakeAccountInfo {
  /**
   * @type {string}
   * @memberof StakeAccountInfo
   */
  stakeAddress?: string;

  /**
   * @type {number}
   * @memberof StakeAccountInfo
   */
  controlledAmount?: number;

  /**
   * @type {number}
   * @memberof StakeAccountInfo
   */
  withdrawableAmount?: number;

  /**
   * @type {string}
   * @memberof StakeAccountInfo
   */
  poolId?: string;
}