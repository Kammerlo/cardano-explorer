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
 * @interface LocalCommitteeMemberDto
 */
export interface LocalCommitteeMemberDto {
  /**
   * @type {string}
   * @memberof LocalCommitteeMemberDto
   */
  hash?: string;

  /**
   * @type {string}
   * @memberof LocalCommitteeMemberDto
   */
  credType?: LocalCommitteeMemberDtoCredTypeEnum;

  /**
   * @type {number}
   * @memberof LocalCommitteeMemberDto
   */
  expiredEpoch?: number;
}

/**
 * @export
 * @enum {string}
 */
export enum LocalCommitteeMemberDtoCredTypeEnum {
  ADDRKEYHASH = "ADDR_KEYHASH",
  SCRIPTHASH = "SCRIPTHASH"
}
