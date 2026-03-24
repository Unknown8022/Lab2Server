import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Prosthesis } from '../../prosthesis/entities/prosthesis.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @OneToMany(() => Prosthesis, (prosthesis) => prosthesis.owner)
  prostheses: Prosthesis[];
}
