import { Module } from '@nestjs/common';
import { CourierService } from './courier.service';
import { CourierController } from './courier.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisModule } from 'src/redis/redis.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CourierLocation,
  CourierLocationSchema,
} from 'src/schemas/courier.schema';
import {
  CourierInfo,
  CourierInfoSchema,
} from 'src/schemas/courier-info.schema';

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
    ClientsModule.register([
      {
        name: 'COURIER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'courier_location_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [CourierController],
  providers: [CourierService],
})
export class CourierModule {}
