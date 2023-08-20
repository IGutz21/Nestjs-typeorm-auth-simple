import { Post, User, Comment } from 'src/entities';
import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: process.env.DATABASE_TYPE,
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  // entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [User, Post, Comment],
  synchronize: true,
};

export default config;
