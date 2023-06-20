import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCourierLocationDto } from './dto/courier.dto';
import { RedisService } from 'src/redis/redis.service';
import { CourierLocation } from 'src/schemas/courier.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CourierInfo } from 'src/schemas/courier-info.schema';

@Injectable()
export class CourierService {
  constructor(
    @InjectModel(CourierLocation.name)
    private readonly courierLocationModel: Model<CourierLocation>,
    @InjectModel(CourierInfo.name)
    private readonly courierInfoModel: Model<CourierInfo>,
    @Inject('COURIER_SERVICE') private client: ClientProxy,
    private readonly redisService: RedisService,
  ) {}

  async addNewLocation(createCourierLocationDto: CreateCourierLocationDto) {
    const result = this.client.send(
      { cmd: 'save-location' },
      {
        courierID: createCourierLocationDto.courierID,
        long: createCourierLocationDto.long,
        lat: createCourierLocationDto.lat,
        created: new Date(),
      },
    );
    result.subscribe();
  }

  async getLastLocation(id: number): Promise<CreateCourierLocationDto> {
    const result = new CreateCourierLocationDto();
    const cacheData = await this.redisService.getLocation(id.toString());
    if (cacheData != null) {
      result.courierID = id;
      result.lat = cacheData['latitude'];
      result.long = cacheData['longitude'];
    } else {
      const locations = await this.courierLocationModel
        .find({ courierID: id })
        .sort({ created: -1 })
        .exec();
      if (locations.length > 0) {
        result.courierID = id;
        result.lat = locations[0].lat;
        result.long = locations[0].long;
      }
    }
    return result;
  }
  async getLastLocationAllCourier(): Promise<CreateCourierLocationDto[]> {
    const result = [];
    const allCouirerInfo = await this.courierInfoModel.find();
    for (let index = 0; index < allCouirerInfo.length; index++) {
      const location = await this.getLastLocation(
        allCouirerInfo[index]['courierID'],
      );
      result.push(location);
    }
    return result;
  }
}
