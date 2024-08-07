import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  passwrodHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
