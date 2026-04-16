import { DataSource } from 'typeorm';
import { Battery } from '../../../libs/common/src/entities/battery.entity';
import { Engine } from '../../../libs/common/src/entities/engine.entity';
import { User } from '../../../libs/common/src/entities/user.entity';
import { Sensor } from '../../../libs/common/src/entities/sensor.entity';
import { Prosthesis } from '../../../libs/common/src/entities/prosthesis.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_o1n6kFxDymrB@ep-misty-cherry-a9uqk2tp-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require',
  synchronize: false,
  logging: true,
  entities: [User, Battery, Engine, Sensor, Prosthesis],
  migrations: ['src/migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
});
