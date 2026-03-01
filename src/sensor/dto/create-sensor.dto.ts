import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateSensorDto {
  @IsNotEmpty({ message: "Тип датчика обов'язковий" })
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsBoolean()
  isActive: boolean;
}
