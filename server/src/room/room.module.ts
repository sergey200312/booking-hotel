import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from './entities/room.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/review/entities/review.entity';
import { Booking, BookingSchema } from 'src/booking/entities/booking.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Room.name, schema: RoomSchema },
    { name: Review.name, schema: ReviewSchema },
    { name: Booking.name, schema: BookingSchema }
  ])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule { }
