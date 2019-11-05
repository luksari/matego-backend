import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'POSTGRES_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: process.env.POSTGRES_HOST_DEV,
        port: parseInt(process.env.POSTGRES_PORT_DEV, 10),
        username: process.env.POSTGRES_USERNAME_DEV,
        password: process.env.POSTGRES_PASSWORD_DEV,
        database: process.env.POSTGRES_DATABASE_DEV,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
