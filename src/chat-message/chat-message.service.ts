import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatMessage } from './schemas/chat-message.schema';
import { Model } from 'mongoose';
import { CreateChatMessageDto } from './dtos/create-chat-message.dto';
import { UpdateChatMessageDto } from './dtos/update-chat-message.dto';
import { Sorting } from 'src/shared/decorators/sorting.decorator';
import { Filtering } from 'src/shared/decorators/filtering.decorator';
import { createFilteringObject, createSortingObject } from 'src/shared/helpers/mongoose-query-helpers';

@Injectable()
export class ChatMessageService {
    constructor(
        @InjectModel(ChatMessage.name) private chatMessageModel: Model<ChatMessage>,
    ) { }

    async createChatMessage(
        createChatMessage: CreateChatMessageDto
    ) {
        return await this.chatMessageModel.create(createChatMessage)
    }
    async findById(id: string): Promise<ChatMessage> {
        return await this.chatMessageModel.findById(id);
    }
    async findAll(
        sortingParams: Sorting[], filteringParams: Filtering[]
    ): Promise<ChatMessage[]> {
        return await this.chatMessageModel.find(createFilteringObject(filteringParams))
            .sort({ ...createSortingObject(sortingParams) })
            ;
    }
    async updateById(id: string, updateChatMessageDto: UpdateChatMessageDto): Promise<ChatMessage> {
        return await this.chatMessageModel.findByIdAndUpdate(id, updateChatMessageDto, { new: true, runValidators: true })
    }
    async findBySenderId(senderId: string): Promise<ChatMessage[]> {
        return this.chatMessageModel.find({ senderId })
    }
    async deleteById(id: string): Promise<{ deleted: boolean }> {
        const res = await this.chatMessageModel.findByIdAndDelete(id);
        if (!res) return { deleted: false }
        return { deleted: true }

    }


    async sendMessage(message: string, receiverId: string, senderId: string) {

    }
}
