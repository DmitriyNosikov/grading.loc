import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { DEFAULT_PORT, MAX_PORT, MIN_PORT } from './config.constant';

export const ConfigEnum = {
  HOST: 'host',
  PORT: 'port',
} as const;

export interface ConfigInterface {
  [ConfigEnum.HOST]: string;
  [ConfigEnum.PORT]: number;
}

export class ConfigSchema implements ConfigInterface {
  @IsString()
  host: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  port: number = DEFAULT_PORT;

  async validate() {
    return await validateOrReject(this).catch((errors) => {
      console.log('app validation failed: ', errors);

      throw new ValidationError();
    });
  }
}
