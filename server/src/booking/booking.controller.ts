import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ICurrentUser } from 'src/types/types';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: ICurrentUser, @Param('id') id: string, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(user.id, id, createBookingDto);
  }

  @Get(':roomId/occupied-dates')
  async getOccupiedDates(@Param('roomId') roomId: string) {
    return this.bookingService.getOccupiedDates(roomId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: ICurrentUser) {
    console.log(user)
    return this.bookingService.findAll(user.id);
  }
}
