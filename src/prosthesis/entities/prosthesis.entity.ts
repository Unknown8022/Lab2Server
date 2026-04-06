import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Sensor } from '../../sensor/entities/sensor.entity';
import { Engine } from '../../engine/entities/engine.entity';

@Entity()
export class Prosthesis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelName: string;

  @Column('float', { default: 100 })
  batteryLevel: number;

  // Many-to-One: Багато протезів можуть належати одному користувачу
  @ManyToOne(() => User, (user) => user.prostheses)
  owner: User;

  // Many-to-Many: Протез може мати багато датчиків, а датчик може бути на різних протезах
  @ManyToMany(() => Sensor, (sensor) => sensor.prostheses)
  @JoinTable()
  sensors: Sensor[];

  // One-to-One: Один протез має один конкретний двигун
  @OneToOne(() => Engine)
  @JoinColumn() // Вказує, що ця сутність є власником зв'язку (містить engineId)
  engine: Engine;
}
