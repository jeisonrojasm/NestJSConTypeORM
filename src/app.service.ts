import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { config } from '../config';

@Injectable()
export class AppService {

  constructor(
    @Inject('varToUseGlobally') private readonly varToUseGlobally: string,
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>
  ) { }

  getHello(): string {
    return `Hello World! ${this.varToUseGlobally} in DATABASE_NAME ${this.configService.database.name}`;
  }
}
