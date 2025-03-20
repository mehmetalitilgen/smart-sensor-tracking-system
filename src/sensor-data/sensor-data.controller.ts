import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SensorDataService } from './sensor-data.service';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('Sensor Data')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sensor-data')
export class SensorDataController {
  constructor(private sensorDataService: SensorDataService) {}

  @Post()
  createSensorData(@Body() data: any) {
    return this.sensorDataService.createSensorData(data);
  }

  @Get()
  getSensorData() {
    return this.sensorDataService.getAllSensorData();
  }
}
