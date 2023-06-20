import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourierLocationDocument = HydratedDocument<CourierLocation>;

@Schema()
export class CourierLocation {
  @Prop({ required: true })
  courierID: number;

  @Prop({ required: true })
  long: number;

  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  created: Date;
}

export const CourierLocationSchema =
  SchemaFactory.createForClass(CourierLocation);
