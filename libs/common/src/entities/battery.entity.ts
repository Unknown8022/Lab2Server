import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Battery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  percentage: number;

  @Column()
  voltage: number;
  @Column()
  isCharging: boolean;
  @Column()
  temperature: number;
}
