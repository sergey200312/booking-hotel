import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ICurrentUser } from 'src/types/types';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@CurrentUser() user: ICurrentUser, @Param('id') roomId: string,  @Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(user.id, roomId, createReviewDto);
  }

  @Get(':id')
  findAll(@Param('id') roomId: string) {
    return this.reviewService.findAll(roomId);
  }

  @Get(':id/reviewCount')
  reviewCount(@Param('id') roomId: string) {
    return this.reviewService.getReviewInfo(roomId)
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
