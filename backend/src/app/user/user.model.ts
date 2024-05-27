import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuthUserInterface } from '@backend/libs/interfaces';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements AuthUserInterface {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
