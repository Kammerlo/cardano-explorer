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
 * @interface CommitteeRegistration
 */
export interface CommitteeRegistration {
  /**
   * @type {number}
   * @memberof CommitteeRegistration
   */
  blockNumber?: number;

  /**
   * @type {number}
   * @memberof CommitteeRegistration
   */
  blockTime?: number;

  /**
   * @type {string}
   * @memberof CommitteeRegistration
   */
  txHash?: string;

  /**
   * @type {number}
   * @memberof CommitteeRegistration
   */
  certIndex?: number;

  /**
   * @type {number}
   * @memberof CommitteeRegistration
   */
  slot?: number;

  /**
   * @type {string}
   * @memberof CommitteeRegistration
   */
  coldKey?: string;

  /**
   * @type {string}
   * @memberof CommitteeRegistration
   */
  hotKey?: string;

  /**
   * @type {string}
   * @memberof CommitteeRegistration
   */
  credType?: CommitteeRegistrationCredTypeEnum;

  /**
   * @type {number}
   * @memberof CommitteeRegistration
   */
  epoch?: number;
}

/**
 * @export
 * @enum {string}
 */
export enum CommitteeRegistrationCredTypeEnum {
  ADDRKEYHASH = "ADDR_KEYHASH",
  SCRIPTHASH = "SCRIPTHASH"
}
