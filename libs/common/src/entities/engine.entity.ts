import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Prosthesis } from './prosthesis.entity';

@Entity()
export class Engine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; 

  @Column({ type: 'float' })
  rotationPerSecondSpeed: number; 

  @Column({ type: 'float', nullable: true })
  voltage: number; 

  @Column({ type: 'float', nullable: true })
  electricCurrent: number; 

  @Column({ type: 'float' })
  power: number;

  @Column()
  type: string;

  // Зворотний зв'язок для 1:1
  @OneToOne(() => Prosthesis, (prosthesis) => prosthesis.engine)
  prosthesis: Prosthesis;
}