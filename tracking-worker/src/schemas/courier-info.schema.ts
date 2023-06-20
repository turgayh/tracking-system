import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourierInfoDocument = HydratedDocument<CourierInfo>;

@Schema()
export class CourierInfo {
  @Prop({ required: true, unique: true })
  courierID: number;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  lastActivity: Date;
}

export const CourierInfoSchema = SchemaFactory.createForClass(CourierInfo);
