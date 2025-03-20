import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSensorDataDto {
  @IsString()
  @IsNotEmpty()
  sensorId: string;

  @IsNumber()
  timestamp: number; // Unix epoch formatında (saniye cinsinden)

  @IsNumber()
  temperature: number;

  @IsNumber()
  humidity: number;
}
