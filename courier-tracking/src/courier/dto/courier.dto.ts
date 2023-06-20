import { IsNotEmpty, IsLongitude, IsLatitude } from 'class-validator';

export class CreateCourierLocationDto {
  @IsNotEmpty()
  courierID: string;

  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @IsLongitude()
  @IsNotEmpty()
  long: number;
}
