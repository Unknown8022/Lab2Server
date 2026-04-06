import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Prosthesis } from '../../prosthesis/entities/prosthesis.entity';

@Entity()
export class Engine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  power: number;

  @Column()
  type: string;

  // Зворотний зв'язок для 1:1
  @OneToOne(() => Prosthesis, (prosthesis) => prosthesis.engine)
  prosthesis: Prosthesis;
}
