import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Prosthesis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelName: string;

  @Column({ default: 'active' })
  status: string;

  @Column('float', { default: 100 })
  batteryLevel: number;

  @ManyToOne(() => User, (user) => user.prostheses)
  owner: User;
}
