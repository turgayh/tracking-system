import { Module } from '@nestjs/common';
import { CourierService } from './courier.service';
import { CourierController } from './courier.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
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
