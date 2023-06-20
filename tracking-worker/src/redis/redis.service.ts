import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public constructor(
    @Inject(REDIS_CLIENT) private readonly redis: RedisClient,
  ) {}

  onModuleDestroy() {
    this.redis.quit();
  }

  updateCourierLocation(id: string, lat: number, long: number) {
    this.redis.GEOADD(id, {
      latitude: lat,
      longitude: long,
      member: 'location',
    });
  }
}
