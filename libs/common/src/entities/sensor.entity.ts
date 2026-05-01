import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Prosthesis } from './prosthesis.entity';

@Entity() // Це каже TypeORM, що цей клас - таблиця в базі
export class Sensor {
  @PrimaryGeneratedColumn('uuid') // Автоматичний ID (1, 2, 3...)
  id: string;

  @Column()
  type: string;

  @Column('float', { default: 0 })
  value: number;

  @Column({ default: true })
  isActive: boolean;

  // Зв'язок Many-to-Many з протезами
  @ManyToMany(() => Prosthesis, (prosthesis) => prosthesis.sensors)
  prostheses: Prosthesis[];
}
