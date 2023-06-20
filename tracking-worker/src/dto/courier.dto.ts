import { IsNotEmpty, IsLongitude, IsLatitude } from 'class-validator';

export class CreateCourierLocationDto {
  @IsNotEmpty()
  courierID: number;

  @IsLatitude()
  @IsNotEmpty()
  lat: number;

  @IsLongitude()
  @IsNotEmpty()
  long: number;

  created: Date;
}
