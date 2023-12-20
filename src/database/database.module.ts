import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigType } from '@nestjs/config';
import { config } from 'src/config';

const varToUseGlobally = `I'm the global variable`;

@Global()
@Module({
    imports: [TypeOrmModule.forRootAsync({
        inject: [config.KEY],
        useFactory: (configService: ConfigType<typeof config>) => {
            const { host, port, user, password, name } = configService.postgres
            return {
                type: 'postgres',
                host,
                port,
                username: user,
                password,
                database: name,
                synchronize: false,
                autoLoadEntities: true
            }
        }
    })],
    providers: [
        {
            provide: 'varToUseGlobally',
            useValue: varToUseGlobally
        }
    ],
    exports: ['varToUseGlobally', TypeOrmModule]
})
export class DatabaseModule { }
