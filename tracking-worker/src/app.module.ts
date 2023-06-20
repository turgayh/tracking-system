import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CourierLocation,
  CourierLocationSchema,
} from './schemas/courier.location.schema';
import { RedisModule } from './redis/redis.module';
import { CourierInfo, CourierInfoSchema } from './schemas/courier-info.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/courier-tracking'),
    MongooseModule.forFeature([
      { name: CourierLocation.name, schema: CourierLocationSchema },
    ]),
    MongooseModule.forFeature([
      { name: CourierInfo.name, schema: CourierInfoSchema },
    ]),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
