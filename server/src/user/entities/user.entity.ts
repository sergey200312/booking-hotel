import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Review } from 'src/review/entities/review.entity';
import { Booking } from 'src/booking/entities/booking.entity';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  gender: string;

  @Prop()
  dateOfBirth: Date;

  @Prop({ default: null })
  avatar: string | null;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: mongoose.Types.ObjectId[] | Review[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }] })
  booking: mongoose.Types.ObjectId[] | Booking[];
}

export const UserSchema = SchemaFactory.createForClass(User);
