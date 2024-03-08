
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ChatMessage } from "src/chat-message/schemas/chat-message.schema";
import { User } from "src/user/schemas/user.schema";



@Schema({ timestamps: true })
export class Conversation {
    @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
    participants: User[]
    @Prop({ type: [{ type: Types.ObjectId, ref: "ChatMessage", default: [] }] })
    messages: ChatMessage[]
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation)