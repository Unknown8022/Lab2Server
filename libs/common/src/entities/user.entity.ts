import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Prosthesis } from './prosthesis.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Prosthesis, (prosthesis) => prosthesis.user)
  prostheses: Prosthesis[];
}
