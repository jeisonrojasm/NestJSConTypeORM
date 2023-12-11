import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { config } from 'src/config';

const varToUseGlobally = `I'm the global variable`;

@Global()
@Module({
    providers: [
        {
            provide: 'varToUseGlobally',
            useValue: varToUseGlobally
        },
        {
            provide: 'PG',
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, host, name, password, port } = configService.postgres;

                const client = new Client({
                    user,
                    host,
                    database: name,
                    password,
                    port
                });

                client.connect()

                return client;
            },
            inject: [config.KEY]
        },
    ],
    exports: ['varToUseGlobally', 'PG']
})
export class DatabaseModule { }

