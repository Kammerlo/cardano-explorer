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
 * @interface ScriptDetailDto
 */
export interface ScriptDetailDto {
  /**
   * @type {string}
   * @memberof ScriptDetailDto
   */
  scriptHash?: string;

  /**
   * @type {string}
   * @memberof ScriptDetailDto
   */
  scriptType?: ScriptDetailDtoScriptTypeEnum;

  /**
   * @type {JsonNode}
   * @memberof ScriptDetailDto
   */
  content?: JsonNode;
}

/**
 * @export
 * @enum {string}
 */
export enum ScriptDetailDtoScriptTypeEnum {
  Timelock = "timelock",
  PlutusV1 = "plutusV1",
  PlutusV2 = "plutusV2",
  PlutusV3 = "plutusV3"
}