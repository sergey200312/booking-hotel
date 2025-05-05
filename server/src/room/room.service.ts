import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Room, RoomDocument, BookStatus } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Review, ReviewDocument } from 'src/review/entities/review.entity';
import { SortOrder } from 'mongoose';
import { filterMapping } from 'src/constants/filterMapping';
import { Booking, BookingDocument } from 'src/booking/entities/booking.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>
  ) { }

  async create(createRoomDto: CreateRoomDto) {
    const existingRoom = await this.roomModel.findOne({ number: createRoomDto.number });
    if (existingRoom) {
      throw new BadRequestException(`Комната с номером ${createRoomDto.number} уже существует`);
    }

    const newRoom = new this.roomModel({
      number: createRoomDto.number,
      type: createRoomDto.type,
      images: createRoomDto.images || [],
      price: createRoomDto.price,
      ...createRoomDto.selectedFeatures.reduce((acc, feature) => {
        acc[feature] = true;
        return acc;
      }, {}),
    });

    return newRoom.save();
  }

  async findAll(page: number, limit: number, sort: string, minPrice: number,
    maxPrice: number, filters?: string, startDate?: Date, endDate?: Date) {

    const validSort = sort === "desc" || sort === "asc" ? sort : "asc"
    const priceFilter = {}

    if (startDate && endDate) {
      console.log(startDate, endDate)
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new BadRequestException('Некорректный формат даты');
      }
      const booking = await this.bookingModel.find({
        $or: [
          { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
        ]
      })

      const bookingArr = booking.map(bkng => bkng.room)

      if (bookingArr.length > 0) {
        priceFilter["_id"] = { $nin: bookingArr }
      }
    }


    const sortBy: SortOrder = sort === 'desc' ? -1 : 1
    const sortOptions: Record<string, SortOrder> = { price: sortBy }
    const filtersArr = filters ? filters.split(',') : []

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      priceFilter['price'] = { $gte: minPrice, $lte: maxPrice }
    }


    filtersArr.forEach(filter => {
      const field = filterMapping[filter]

      if (field) {
        priceFilter[field] = true
      }
    })

    const rooms = await this.roomModel.find(priceFilter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit).exec();

    const roomIds = rooms.map(room => room._id);
    const reviews = await this.reviewModel.find({ room: { $in: roomIds } }).exec();

    const total = await this.roomModel.find().countDocuments().exec()

    console.log(rooms)

    return { rooms, reviews, total };
  }


  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Некорректный ID номера');
    }

    const room = await this.roomModel.findById(id).exec();
    if (!room) {
      throw new BadRequestException(`Номер с ID ${id} не найден`);
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Некорректный ID номера');
    }

    const updatedRoom = await this.roomModel.findByIdAndUpdate(id, updateRoomDto, { new: true });
    if (!updatedRoom) {
      throw new BadRequestException('Номер не найден');
    }

    return updatedRoom;
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Некорректный ID номера');
    }

    const deletedRoom = await this.roomModel.findByIdAndDelete(id);
    if (!deletedRoom) {
      throw new BadRequestException('Номер не найден');
    }

    return { message: 'Номер удален', deletedRoom };
  }

  async bookRoom(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Некорректный ID номера');
    }

    const room = await this.roomModel.findById(id);
    if (!room || room.status === BookStatus.Booked) {
      throw new BadRequestException('Номер не найден или уже забронирован');
    }

    room.status = BookStatus.Booked;
    await room.save();
    return { message: 'Номер успешно забронирован', room };
  }
}
