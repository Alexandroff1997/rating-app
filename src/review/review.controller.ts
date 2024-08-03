import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { Review } from './review.model';

@Controller('review')
export class ReviewController {
  @HttpCode(201)
  @Post('create')
  async create(@Body() dto: Omit<Review, '_id'>) {}

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @HttpCode(200)
  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {}
}
