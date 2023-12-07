import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(
    @Inject('varToUseGlobally') private readonly varToUseGlobally: string,
    private readonly configService: ConfigService
  ) { }

  getHello(): string {
    return `Hello World! ${this.varToUseGlobally} in DATABASE_NAME ${this.configService.get('DATABASE_NAME')}`;
  }
}
