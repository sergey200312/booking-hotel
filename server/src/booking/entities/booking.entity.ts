import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Room } from 'src/room/entities/room.entity';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId | User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true })
  room: mongoose.Types.ObjectId | Room;

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
