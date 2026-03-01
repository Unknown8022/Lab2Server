import { IsNotEmpty } from 'class-validator';

export class CreateEngineDto {
  @IsNotEmpty({ message: "Ім'я мотора є обов'язковим" })
  public name: string;
  @IsNotEmpty({ message: "Швидкість є обов'язкова" })
  public rotationPerSecondSpeed: number;
  public voltage: number;
  public electricCurrent: number;
}
