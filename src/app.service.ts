import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(@Inject('varToUseGlobally') private readonly varToUseGlobally: string) { }

  getHello(): string {
    return `Hello World! ${this.varToUseGlobally}`;
  }
}
