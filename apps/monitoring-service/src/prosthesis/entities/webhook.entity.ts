import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@app/common'; 

@Entity('webhooks')
export class Webhook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  targetUrl: string;

  @Column({ default: 'SENSOR_ALERT' })
  eventType: string;

  @ManyToOne(() => User, (user) => user.webhooks, { nullable: true })
  user: User;
}