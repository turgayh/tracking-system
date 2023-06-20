import { Injectable } from '@nestjs/common';
import { CreateCourierLocationDto } from './dto/courier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CourierLocation } from './schemas/courier.schema';
import { Model } from 'mongoose';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(CourierLocation.name)
    private readonly courierLocationModel: Model<CourierLocation>,
    private readonly redisService: RedisService,
  ) {}

  async createNewLocation(
    createCourierLocationDto: CreateCourierLocationDto,
  ): Promise<CourierLocation> {
    const createdLoc = await this.courierLocationModel.create(
      createCourierLocationDto,
    );

    const { courierID, lat, long } = createCourierLocationDto;
    this.redisService.updateCourierLocation(courierID.toString(), lat, long);

    return createdLoc;
  }
}
