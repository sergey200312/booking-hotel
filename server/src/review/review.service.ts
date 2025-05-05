import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Review, ReviewDocument } from './entities/review.entity';
import { Room, RoomDocument } from 'src/room/entities/room.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Booking, BookingDocument } from 'src/booking/entities/booking.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) { }

  async create(userId: string, roomId: string, createReviewDto: CreateReviewDto) {
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(roomId)) {
      throw new BadRequestException('Некорректный ID пользователя или номера');
    }

    const room = await this.bookingModel.findOne({ room: roomId, user: userId }).exec()
    const existReview = await this.reviewModel.findOne({ room: roomId, user: userId }).exec()

    if (!room) {
      throw new BadRequestException('Номер не найден или вы не бронировали данный номер')
    }

    if (existReview) {
      throw new BadRequestException('Вы уже оставляли отзыв')
    }

    if (new Date() < new Date(room.startDate)) {
      throw new BadRequestException('Вы не можете оставить отзыв, т.к. еще не заехали в данный номер')
    }

    const review = new this.reviewModel({
      ...createReviewDto,
      user: userId,
      room: roomId
    })

    await review.save()

    return { review };
  }

  async findAll(roomId: string) {

    const reviews = await this.reviewModel.find({ room: roomId }).populate('user').exec()

    const reviewsCount = await this.reviewModel.countDocuments({ room: roomId }).exec()

    if (!reviews) {
      throw new BadRequestException('Отзывов не найдено')
    }

    return { reviews, reviewsCount }
  }

  async getReviewInfo (roomId: string) {
    const reviews = await this.reviewModel.find({ room: roomId }).exec()
    const reviewCount = reviews.length
    
    const totalRating = reviews.reduce((sum, review ) => sum + review.rating, 0)
    const avgRating = reviewCount > 0 ? parseFloat((totalRating / reviewCount).toFixed(1)) : 0
    return { reviewCount, avgRating}
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Некорректный ID отзыва');
    }
    return this.reviewModel.findById(id).populate('room').exec();
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Некорректный ID отзыва');
    }

    const updatedReview = await this.reviewModel.findByIdAndUpdate(id, updateReviewDto, {
      new: true,
    });

    if (!updatedReview) {
      throw new BadRequestException('Отзыв не найден');
    }

    return updatedReview;
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Некорректный ID отзыва');
    }

    const deletedReview = await this.reviewModel.findByIdAndDelete(id);
    if (!deletedReview) {
      throw new BadRequestException('Отзыв не найден');
    }

    return { message: 'Отзыв удален', deletedReview };
  }
}
