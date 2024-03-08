import { Module } from '@nestjs/common';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessageService } from './chat-message.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMessage, ChatMessageSchema } from './schemas/chat-message.schema';
import { ChatMessageGateway } from './gateways/chat-message.gateway';
import { UserModule } from 'src/user/user.module';
import { ConversationModule } from 'src/conversation/conversation.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ChatMessage.name,
        schema: ChatMessageSchema
      },
    ]),
    UserModule,
    ConversationModule,
  ],
  controllers: [ChatMessageController],
  providers: [ChatMessageService, ChatMessageGateway]
})
export class ChatMessageModule { }
