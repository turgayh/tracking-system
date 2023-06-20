import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCourierLocationDto } from './dto/courier.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'save-location' })
  async saveNewLocation(createCourierLocationDto: CreateCourierLocationDto) {
    await this.appService.createNewLocation(createCourierLocationDto);
  }
}
