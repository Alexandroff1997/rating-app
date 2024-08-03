import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './product.model';
import { FindProductDto } from './dto/find-product.dto';

@Controller('product')
export class ProductController {
  @HttpCode(201)
  @Post('create')
  async create(@Body() dto: Omit<Product, '_id'>) {}

  @HttpCode(200)
  @Get(':id')
  async get(@Param('id') id: string) {}

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @HttpCode(201)
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: Product) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {}
}
