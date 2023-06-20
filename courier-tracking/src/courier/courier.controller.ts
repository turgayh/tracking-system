import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CourierService } from './courier.service';
import { CreateCourierLocationDto } from './dto/courier.dto';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}
  @Get('')
  healthCheck() {
    return 'Alive';
  }

  @Post('save-courier-location')
  async saveCourierLocation(
    @Body() createCourierLocationDto: CreateCourierLocationDto,
  ) {
    return this.courierService.addNewLocation(createCourierLocationDto);
  }

  @Get('get-courier-last-location/:id')
  getLastLocationById(@Param() params: any) {
    const courierID: string = params.id;
    this.courierService.getCourierLocation(courierID);
    return 'Alive';
  }
}
