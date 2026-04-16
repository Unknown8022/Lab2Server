import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Пароль не буде вибиратися за замовчуванням
  password: string;

  @Column({ default: 'superadmin' })
  accessLevel: string;
}
