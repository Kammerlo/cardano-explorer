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
 * @interface EpochContent
 */
export interface EpochContent {
  /**
   * @type {number}
   * @memberof EpochContent
   */
  epoch?: number;

  /**
   * @type {number}
   * @memberof EpochContent
   */
  firstBlockTime?: number;

  /**
   * @type {number}
   * @memberof EpochContent
   */
  lastBlockTime?: number;

  /**
   * @type {number}
   * @memberof EpochContent
   */
  blockCount?: number;

  /**
   * @type {number}
   * @memberof EpochContent
   */
  txCount?: number;

  /**
   * @type {string}
   * @memberof EpochContent
   */
  output?: string;

  /**
   * @type {string}
   * @memberof EpochContent
   */
  fees?: string;
}
