import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'mysql',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: 'root',
  database: 'kanban',
  entities: ['dist/**/*.model{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);