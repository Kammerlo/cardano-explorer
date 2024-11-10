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

import { TxOuput } from "./tx-ouput";
import { TxUtxo } from "./tx-utxo";
/**
 *
 *
 * @export
 * @interface TransactionDetails
 */
export interface TransactionDetails {
  /**
   * @type {string}
   * @memberof TransactionDetails
   */
  hash?: string;

  /**
   * @type {number}
   * @memberof TransactionDetails
   */
  blockHeight?: number;

  /**
   * @type {number}
   * @memberof TransactionDetails
   */
  slot?: number;

  /**
   * @type {Array<TxUtxo>}
   * @memberof TransactionDetails
   */
  inputs?: Array<TxUtxo>;

  /**
   * @type {Array<TxUtxo>}
   * @memberof TransactionDetails
   */
  outputs?: Array<TxUtxo>;

  /**
   * @type {number}
   * @memberof TransactionDetails
   */
  utxoCount?: number;

  /**
   * @type {number}
   * @memberof TransactionDetails
   */
  totalOutput?: number;

  /**
   * @type {number}
   * @memberof TransactionDetails
   */
  fees?: number;

  /**
   * @type {number}
   * @memberof TransactionDetails
   */
  ttl?: number;

  /**
   * @type {string}
   * @memberof TransactionDetails
   */
  auxiliaryDataHash?: string;

  /**
   * @type {number}
   * @memberof TransactionDetails
   */
  validityIntervalStart?: number;

  /**
   * @type {string}
   * @memberof TransactionDetails
   */
  scriptDataHash?: string;

  /**
   * @type {Array<TxUtxo>}
   * @memberof TransactionDetails
   */
  collateralInputs?: Array<TxUtxo>;

  /**
   * @type {Array<string>}
   * @memberof TransactionDetails
   */
  requiredSigners?: Array<string>;

  /**
   * @type {number}
   * @memberof TransactionDetails
   */
  netowrkId?: number;

  /**
   * @type {TxOuput}
   * @memberof TransactionDetails
   */
  collateralReturn?: TxOuput;

  /**
   * @type {number}
   * @memberof TransactionDetails
   */
  totalCollateral?: number;

  /**
   * @type {Array<TxUtxo>}
   * @memberof TransactionDetails
   */
  referenceInputs?: Array<TxUtxo>;

  /**
   * @type {boolean}
   * @memberof TransactionDetails
   */
  invalid?: boolean;
}
