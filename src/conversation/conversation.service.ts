import { Injectable } from '@nestjs/common';
import { Conversation } from './schemas/conversation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { UpdateConversationDto } from './dtos/update-conversation.dto';
import { User } from 'src/user/schemas/user.schema';
import { ChatMessage } from 'src/chat-message/schemas/chat-message.schema';

@Injectable()
export class ConversationService {
    constructor(
        @InjectModel(Conversation.name) private conversationModel: Model<Conversation>,
    ) { }

    async findAll(): Promise<Conversation[]> {
        return await this.conversationModel.find();
    }

    async findById(id: string): Promise<Conversation> {
        return await this.conversationModel.findById(id);
    }
    async create(createConversationDto: CreateConversationDto) {
        return await this.conversationModel.create(createConversationDto)
    }

    async updateById(id: string, updateConversationDto: UpdateConversationDto): Promise<Conversation> {
        return await this.conversationModel.findByIdAndUpdate(id, updateConversationDto, { new: true, runValidators: true })
    }

    async deleteById(id: string): Promise<{ deleted: boolean }> {
        const res = await this.conversationModel.findByIdAndDelete(id)
        if (!res) {
            return { deleted: false }
        }
        return { deleted: true }
    }

    async findByParticipants(senderId: User, receiverId: User) {
        return await this.conversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        });
    }

    async pushMessage(id: string, messageId: ChatMessage) {
        const conversation = await this.findById(id);
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        conversation.messages.push(messageId);
        return await this.conversationModel.updateOne(conversation);
    }
}