import { DataSource } from 'typeorm';
import { Battery } from '../../../libs/common/src/entities/battery.entity';
import { Engine } from '../../../libs/common/src/entities/engine.entity';
import { User } from '../../../libs/common/src/entities/user.entity';
import { Sensor } from '../../../libs/common/src/entities/sensor.entity';
import { Prosthesis } from '../../../libs/common/src/entities/prosthesis.entity';
import * as path from 'path';
const migrationsPath = path.join(__dirname, 'migrations', '*.{ts,js}');
console.log(migrationsPath);

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_o1n6kFxDymrB@ep-misty-cherry-a9uqk2tp-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require&sslmode=require&uselibpqcompat=true',
  synchronize: false,
  logging: true,
  entities: [User, Battery, Engine, Sensor, Prosthesis],
  migrations: [migrationsPath],
  ssl: {
    rejectUnauthorized: false,
  },
});
