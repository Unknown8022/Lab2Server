import { IsString, IsNumber, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateProsthesisWithSensorsDto {
  @IsString()
  modelName: string;

  @IsNumber()
  @IsOptional()
  batteryLevel?: number;

  @IsUUID() // Змінюємо number на string (UUID)
  userId: string; 

  @IsArray()
  @IsUUID('4', { each: true }) // Перевіряємо, що кожен ID у масиві — це UUID
  sensorIds: string[]; 

  @IsUUID() // Змінюємо number на string (UUID)
  engineId: string; 
}
