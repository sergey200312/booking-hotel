import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Booking } from 'src/booking/entities/booking.entity';
import { Review } from 'src/review/entities/review.entity';

export type RoomDocument = Room & Document;

export enum BookStatus {
  Free = 'free',
  Booked = 'booked',
}

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true, unique: true })
  number: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: String, enum: BookStatus, default: BookStatus.Free })
  status: BookStatus;
  
  @Prop({ default: false })
  hasWifi: boolean;

  @Prop({ default: false })
  hasConditioner: boolean;

  @Prop({ default: false })
  hasWorkSpace: boolean;

  @Prop({ default: false })
  canSmoke: boolean;

  @Prop({ default: false })
  canPets: boolean;

  @Prop({ default: false })
  canInvite: boolean;

  @Prop({ default: false })
  hasWideCorridor: boolean;

  @Prop({ default: false })
  hasDisabledAssistant: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
