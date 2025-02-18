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

import { ExUnits } from "./ex-units";
/**
 *
 *
 * @export
 * @interface Redeemer
 */
export interface Redeemer {
  /**
   * @type {string}
   * @memberof Redeemer
   */
  tag?: RedeemerTagEnum;

  /**
   * @type {number}
   * @memberof Redeemer
   */
  index?: number;

  /**
   * @type {string}
   * @memberof Redeemer
   */
  data?: string;

  /**
   * @type {ExUnits}
   * @memberof Redeemer
   */
  exUnits?: ExUnits;
}

/**
 * @export
 * @enum {string}
 */
export enum RedeemerTagEnum {
  Spend = "spend",
  Mint = "mint",
  Cert = "cert",
  Reward = "reward",
  Voting = "voting",
  Proposing = "proposing"
}
