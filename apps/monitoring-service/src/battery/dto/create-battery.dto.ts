import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateBatteryDto {
  @IsNotEmpty()
  @IsNumber()
  public percentage: number;

  @IsNotEmpty()
  @IsNumber()
  public voltage: number;

  @IsNotEmpty()
  @IsBoolean()
  public isCharging: boolean;
}
