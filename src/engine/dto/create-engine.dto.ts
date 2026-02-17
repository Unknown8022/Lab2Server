import { IsNotEmpty } from 'class-validator';

export class CreateEngineDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: "Ім'я мотора є обов'язковим" })
  public name: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: "Швидкість є обов'язкова" })
  public rotationPerSecondSpeed: number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //@IsNotEmpty({ message: "Ім'я користувача є обов'язковим" })
  public voltage: number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //@IsNotEmpty({ message: "Ім'я користувача є обов'язковим" })
  public electricCurrent: number;
}
