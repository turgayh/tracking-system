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
  async getLastLocationById(@Param() params: any) {
    const courierID: number = params.id;
    return await this.courierService.getLastLocation(courierID);
  }

  @Get('get-all-couriers-last-location')
  async getLastLocationForAllCourier() {
    return await this.courierService.getLastLocationAllCourier();
  }
}
