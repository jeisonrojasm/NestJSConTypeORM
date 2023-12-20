import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: '.env' })

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    migrations: ['src/database/migrations/*.ts'],
    migrationsTableName: 'migrations',
    entities: ['src/**/*.entity.ts']
});

