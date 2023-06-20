import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCourierLocationDto } from './dto/courier.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CourierService {
  constructor(
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

  async getCourierLocation(id: string) {
    this.redisService.getLocation(id);
  }
}
