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
