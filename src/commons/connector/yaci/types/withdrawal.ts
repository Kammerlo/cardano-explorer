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
 * @interface Withdrawal
 */
export interface Withdrawal {
  /**
   * @type {number}
   * @memberof Withdrawal
   */
  blockNumber?: number;

  /**
   * @type {number}
   * @memberof Withdrawal
   */
  blockTime?: number;

  /**
   * @type {string}
   * @memberof Withdrawal
   */
  address?: string;

  /**
   * @type {string}
   * @memberof Withdrawal
   */
  txHash?: string;

  /**
   * @type {number}
   * @memberof Withdrawal
   */
  amount?: number;

  /**
   * @type {number}
   * @memberof Withdrawal
   */
  epoch?: number;

  /**
   * @type {number}
   * @memberof Withdrawal
   */
  slot?: number;
}
