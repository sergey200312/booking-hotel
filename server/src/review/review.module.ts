import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review, ReviewSchema } from './entities/review.entity';
import { Room, RoomSchema } from 'src/room/entities/room.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Booking, BookingSchema } from 'src/booking/entities/booking.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Review.name, schema: ReviewSchema },
    { name: Booking.name, schema: BookingSchema }]),],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule { }
