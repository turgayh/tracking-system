import { IsNotEmpty, IsLongitude, IsLatitude } from 'class-validator';

export class CreateCourierLocationDto {
  @IsNotEmpty()
  courierID: number;

  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @IsLongitude()
  @IsNotEmpty()
  long: number;
}

export class CourierInfoDto {
  @IsNotEmpty()
  courierID: number;

  isActive = true;

  @IsNotEmpty()
  lastActivity: Date;
}
