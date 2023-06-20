import { Injectable } from '@nestjs/common';
import { CourierInfoDto, CreateCourierLocationDto } from './dto/courier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CourierLocation } from './schemas/courier.location.schema';
import { Model } from 'mongoose';
import { RedisService } from './redis/redis.service';
import { CourierInfo } from './schemas/courier-info.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(CourierLocation.name)
    private readonly courierLocationModel: Model<CourierLocation>,

    @InjectModel(CourierInfo.name)
    private readonly courierInfoModel: Model<CourierInfo>,

    private readonly redisService: RedisService,
  ) {}

  async createNewLocation(
    createCourierLocationDto: CreateCourierLocationDto,
  ): Promise<CourierLocation> {
    const createdLoc = await this.courierLocationModel.create(
      createCourierLocationDto,
    );
    const courierInfo: CourierInfoDto = new CourierInfoDto();
    courierInfo.courierID = createCourierLocationDto.courierID;
    courierInfo.lastActivity = createCourierLocationDto.created;

    await this.courierInfoModel.findOneAndUpdate(
      { courierID: courierInfo.courierID },
      courierInfo,
      { upsert: true },
    );
    const { courierID, lat, long } = createCourierLocationDto;
    this.redisService.updateCourierLocation(courierID.toString(), lat, long);

    return createdLoc;
  }
}
