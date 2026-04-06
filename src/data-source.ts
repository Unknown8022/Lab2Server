import { DataSource } from 'typeorm';
import { Prosthesis } from './prosthesis/entities/prosthesis.entity';
import { Sensor } from './sensor/entities/sensor.entity';
import { Engine } from './engine/entities/engine.entity';
import { User } from './users/entities/user.entity';
import { Battery } from './battery/entities/battery.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_o1n6kFxDymrB@ep-misty-cherry-a9uqk2tp-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require',
  synchronize: false,
  logging: true,
  entities: [Prosthesis, Sensor, Engine, User, Battery],
  migrations: ['src/migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
});
