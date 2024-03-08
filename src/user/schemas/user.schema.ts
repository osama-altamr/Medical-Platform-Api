import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'
import * as bcrypt from 'bcryptjs';
import { UserRoles } from '../enums/user-roles.enum';
import { ChatMessage } from 'src/chat-message/schemas/chat-message.schema';


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
  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ select: false })
  password: string;
  @Prop()
  verifyToken: string;
  @Prop({ select: false, type: Date })
  passwordChangedAt: Date;

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
  @Prop()
  age: number;

  @Prop()
  bio: string;

  @Prop({ enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });
