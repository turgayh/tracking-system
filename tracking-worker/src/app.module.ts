import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CourierLocation,
  CourierLocationSchema,
} from './schemas/courier.schema';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/courier-tracking'),
    MongooseModule.forFeature([
      { name: CourierLocation.name, schema: CourierLocationSchema },
    ]),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
