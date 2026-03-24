import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Webhook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  targetUrl: string; // URL-адреса, куди будуть надсилатися дані (наприклад, Discord)

  @Column({ default: 'SENSOR_ALERT' })
  eventType: string; // Тип події, на яку реагує вебхук
}
