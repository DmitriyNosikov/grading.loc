import {IsString, ValidationError, validateOrReject } from 'class-validator';
import { JWTConfigMessage } from './jwt-config.constant';

export const JWTConfigEnum = {
  JWT_ACCESS_TOKEN_SECRET: 'accessTokenSecret',
  JWT_ACCESS_TOKEN_EXPIRES_IN: 'accessTokenExpiresIn',
} as const;

export interface JWTConfigInterface {
  [JWTConfigEnum.JWT_ACCESS_TOKEN_SECRET]: string,
  [JWTConfigEnum.JWT_ACCESS_TOKEN_EXPIRES_IN]: string,
}

export class JWTConfigSchema implements JWTConfigInterface {
  @IsString()
  accessTokenSecret: string;

  @IsString()
  accessTokenExpiresIn: string;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(JWTConfigMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
