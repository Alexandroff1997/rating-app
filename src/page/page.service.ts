import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Page, PageDocument, TopLevelCategory } from './page.model';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';

@Injectable()
export class PageService {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) {}

  async create(dto: CreatePageDto) {
    return this.pageModel.create(dto);
  }

  async findById(id: string) {
    return this.pageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.pageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.pageModel
      .find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
      .exec();
  }

  async deleteById(id: string) {
    return this.pageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreatePageDto) {
    return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
