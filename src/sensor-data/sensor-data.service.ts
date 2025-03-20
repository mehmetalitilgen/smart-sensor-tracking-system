import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SensorDataService {
  constructor(private prisma: PrismaService) {}

  // Sensör verisi ekleme
  async createSensorData(data: {
    sensorId: string;
    timestamp: Date;
    temperature: number;
    humidity: number;
  }) {
    return this.prisma.sensorData.create({
      data,
    });
  }

  async getAllSensorData() {
    return this.prisma.sensorData.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  async getSensorDataBySensorId(sensorId: string) {
    return this.prisma.sensorData.findMany({
      where: { sensorId },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }
}
