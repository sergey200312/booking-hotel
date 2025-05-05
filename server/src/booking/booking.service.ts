import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Booking, BookingDocument } from './entities/booking.entity';
import { Room, RoomDocument } from 'src/room/entities/room.entity';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(userId: string, roomId: string, createBookingDto: CreateBookingDto) {
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(roomId)) {
      throw new BadRequestException('Некорректный ID пользователя или номера');
    }

    const room = await this.roomModel.findById(roomId);
    if (!room) {
      throw new BadRequestException('Номер не найден');
    }

    const existingBookings = await this.bookingModel.find({ room: roomId });

    const newStartDate = new Date(createBookingDto.checkInDate);
    const newEndDate = new Date(createBookingDto.checkOutDate);

    for (const booking of existingBookings) {
      const existingStartDate = new Date(booking.startDate);
      const existingEndDate = new Date(booking.endDate);

      if (newStartDate < existingEndDate && newEndDate > existingStartDate) {
        throw new BadRequestException('Выбранный номер занят в этот период');
      }
    }

    if (isNaN(newStartDate.getTime()) || isNaN(newEndDate.getTime())) {
      throw new BadRequestException('Неверный формат даты');
    }

    const diffTime = Math.abs(newEndDate.getTime() - newStartDate.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * days;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    const newBooking = new this.bookingModel({
      user: userId,
      room: roomId,
      startDate: newStartDate,
      endDate: newEndDate,
      totalPrice,
    });

    await newBooking.save();

    return { newBooking };
  }

  async getOccupiedDates(roomId: string) {
    console.log(roomId)
    const bookings = await this.bookingModel.find({ room: roomId }).exec();

    console.log(bookings)

    let occupiedDates: string[] = [];

    bookings.forEach(({ startDate, endDate }) => {
      let currentDate = new Date(startDate);
      const endDat= new Date(endDate);

      while (currentDate <= endDat) {
        occupiedDates.push(currentDate.toISOString().split('T')[0]); 
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return occupiedDates;
  }

  async findAll(userId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Некорректный ID пользователя');
    }

    const myBookings = await this.bookingModel.find({ user: userId }).populate('room').populate('user').exec();
    
    return { myBookings };
  }
}
