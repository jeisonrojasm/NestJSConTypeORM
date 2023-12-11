import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { config } from './config';

@Injectable()
export class AppService {

  constructor(
    @Inject('varToUseGlobally') private readonly varToUseGlobally: string,
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    @Inject('PG') private readonly client: Client
  ) { }

  getHello(): string {
    return `Hello World! ${this.varToUseGlobally} in DATABASE_NAME ${this.configService.database.name}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.client.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      })
    });
  }
}


