import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PageDocument = HydratedDocument<Page>;

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HeadHunterData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

export class PageAdventage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

@Schema({ timestamps: true })
export class Page {
  _id: string;

  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({ type: () => HeadHunterData })
  headHunter?: HeadHunterData;

  @Prop({ type: () => [PageAdventage] })
  advantages?: PageAdventage[];

  @Prop()
  seoText?: string;

  @Prop()
  tagsTitle: string;

  @Prop({ type: () => [String] })
  tags: string[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
