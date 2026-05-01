import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Battery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  percentage: number;

  @Column()
  voltage: number;
  @Column()
  isCharging: boolean;
  @Column()
  temperature: number;
}
