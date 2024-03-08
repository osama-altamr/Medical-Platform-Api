

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class ChatMessage extends Document {
  @Prop({ type: Types.ObjectId, ref: "User" })
  senderId: User
  @Prop({ type: Types.ObjectId, ref: "User" })
  receiverId: User
  @Prop()
  message: string
  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);