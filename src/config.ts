import { registerAs } from '@nestjs/config';

export const config = registerAs('config', () => {
    return {
        database: {
            name: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
        },
        apiKey: process.env.API_KEY,

        postgres: {
            name: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            port: Number(process.env.POSTGRES_PORT),
            host: process.env.POSTGRES_HOST,
        }
    }
});

