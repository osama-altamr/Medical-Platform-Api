import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { Sorting, SortingParams } from 'src/shared/decorators/sorting.decorator';
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';
import { UpdateChatMessageDto } from './dtos/update-chat-message.dto';
import { ChatMessage } from './schemas/chat-message.schema';
import { CreateChatMessageDto } from './dtos/create-chat-message.dto';

@Controller('chat-messages')
export class ChatMessageController {
    constructor(
        private chatService: ChatMessageService
    ) { }

    @Post()
    async createChatMessage(@Body() chatMessage: CreateChatMessageDto): Promise<ChatMessage> {
        return await this.chatService.createChatMessage(chatMessage);
    }
    @Get()
    async getChatMessages(
        @SortingParams(['timestamp']) sortingParams?: Sorting[],
        @FilteringParams(["senderId", "receiverId", "message"]) filteringParams?: Filtering[],
    ): Promise<ChatMessage[]> {
        return await this.chatService.findAll(sortingParams, filteringParams);
    }

    @Get(":id")
    async getChatMessage(
        @Param("id") id: string
    ): Promise<ChatMessage> {
        return await this.chatService.findById(id);
    }
    @Patch(":id")
    async updateChatMessage(
        @Param("id") id: string,
        @Body() updateChatMessageDto: UpdateChatMessageDto
    ): Promise<ChatMessage> {
        return await this.chatService.updateById(id, updateChatMessageDto);
    }

    @Delete(":id")
    async deleteChatMessage(
        @Param("id") id: string,
    ): Promise<{ deleted: boolean }> {
        return await this.chatService.deleteById(id);
    }
}
