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

import { Amount } from "./amount";
/**
 *
 *
 * @export
 * @interface Utxo
 */
export interface Utxo {
  /**
   * @type {string}
   * @memberof Utxo
   */
  txHash?: string;

  /**
   * @type {number}
   * @memberof Utxo
   */
  outputIndex?: number;

  /**
   * @type {string}
   * @memberof Utxo
   */
  address?: string;

  /**
   * @type {Array<Amount>}
   * @memberof Utxo
   */
  amount?: Array<Amount>;

  /**
   * @type {string}
   * @memberof Utxo
   */
  dataHash?: string;

  /**
   * @type {string}
   * @memberof Utxo
   */
  inlineDatum?: string;

  /**
   * @type {string}
   * @memberof Utxo
   */
  referenceScriptHash?: string;

  /**
   * @type {number}
   * @memberof Utxo
   */
  epoch?: number;

  /**
   * @type {number}
   * @memberof Utxo
   */
  blockNumber?: number;

  /**
   * @type {number}
   * @memberof Utxo
   */
  blockTime?: number;
}