import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Prosthesis } from './prosthesis.entity';
import { Webhook } from 'apps/monitoring-service/src/prosthesis/entities/webhook.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Prosthesis, (prosthesis) => prosthesis.user)
  prostheses: Prosthesis[];

  @OneToMany(() => Webhook, (webhook) => webhook.user)
  webhooks: Webhook[];
}
