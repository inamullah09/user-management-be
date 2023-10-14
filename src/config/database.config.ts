import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';
import { User } from 'src/entities/user.entity';

export default class DatabaseConfig {
  static getDatabaseConfig(configService: ConfigService): TypeOrmModuleOptions {
    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: parseInt(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [User, Log],
      synchronize: true,
    }
    return config;
  }
}

export const databaseConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => DatabaseConfig.getDatabaseConfig(configService),
  inject: [ConfigService]
};
