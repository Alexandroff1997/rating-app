import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { Page } from './page.model';
import { FindPageDto } from './dto/find-page.dto';

@Controller('page')
export class PageController {
  @HttpCode(201)
  @Post('create')
  async create(@Body() dto: Omit<Page, '_id'>) {}

  @HttpCode(200)
  @Get(':id')
  async get(@Param('id') id: string) {}

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindPageDto) {}
}
