export class CreateProsthesisWithSensorsDto {
  modelName: string;
  batteryLevel?: number;
  userId: number; // ID користувача
  sensorIds: number[]; // Масив ID сенсорів
  engineId: number; // ID двигуна
}
