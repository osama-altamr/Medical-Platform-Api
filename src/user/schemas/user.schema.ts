import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'
import * as bcrypt from 'bcryptjs';
import { UserRoles } from '../enums/user-roles.enum';
import { ChatMessage } from 'src/chat-message/schemas/chat-message.schema';
import { ApiProperty } from '@nestjs/swagger';


@Schema({
  timestamps: true,
  minimize: false,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret.password;
    },
  },
})
export class User extends Document {


  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the user',
  })

  @Prop()
  phoneNumber: string;



  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user. Must be unique.',
  })
  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user. This field is not returned in the response.',
    required: false,
  })
  @Prop({ select: false })
  password: string;


  @ApiProperty({
    example: 'abc123',
    description: 'The verification token for the user',
  })
  @Prop()
  verifyToken: string;
  @Prop({ select: false, type: Date })
  passwordChangedAt: Date;

  @ApiProperty({
    example: 'default.jpg',
    description: 'The avatar of the user. Defaults to "default.jpg" if not provided.',
  })
  @Prop({ default: 'default.jpg' })
  avatar: string;

  @Prop()
  passowrdResetToken: string;

  @Prop({ type: Date })
  passowrdResetExpires: Date;


  @Prop({ default: true, select: false })
  active: boolean;


  @Prop({ default: false, select: false })
  verified: boolean;


  @ApiProperty({
    example: 30,
    description: 'The age of the user',
  })
  @Prop()
  age: number;

  @ApiProperty({
    example: 'Hello, I am John Doe.',
    description: 'The bio of the user',
  })
  @Prop()
  bio: string;


  @ApiProperty({
    example: 'admin',
    description: 'The role of the user. Defaults to USER.',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  @Prop({ enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
