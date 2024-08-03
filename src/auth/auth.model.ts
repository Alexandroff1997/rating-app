import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true })
export class Auth {
  _id: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  passwrodHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
