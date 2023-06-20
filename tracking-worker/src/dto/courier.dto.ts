import { IsNotEmpty } from 'class-validator';

export class CreateCourierLocationDto {
  @IsNotEmpty()
  courierID: number;

  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  long: number;

  created: Date;
}

export class CourierInfoDto {
  @IsNotEmpty()
  courierID: number;

  isActive = true;

  @IsNotEmpty()
  lastActivity: Date;
}
