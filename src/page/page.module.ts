import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './page.model';

@Module({
  controllers: [PageController],
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  providers: [PageService],
})
export class PageModule {}
