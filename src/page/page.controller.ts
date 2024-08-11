import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Page } from './page.model';
import { FindPageDto } from './dto/find-page.dto';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { NOT_FOUND_PAGE_ERROR } from './common/page.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Post('create')
  async create(@Body() dto: CreatePageDto) {
    return this.pageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.pageService.findById(id);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }

    return page;
  }

  @HttpCode(200)
  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.pageService.findByAlias(alias);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }

    return page;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedPage = await this.pageService.deleteById(id);

    if (!deletedPage) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreatePageDto,
  ) {
    const updatedPage = await this.pageService.updateById(id, dto);

    if (!updatedPage) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindPageDto) {
    return this.pageService.findByCategory(dto.firstCategory);
  }
}
