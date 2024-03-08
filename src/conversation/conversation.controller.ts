import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Conversation } from './schemas/conversation.schema';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { UpdateConversationDto } from './dtos/update-conversation.dto';

@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) { }

    @Get()
    async getConversations(): Promise<Conversation[]> {
        return await this.conversationService.findAll()
    }

    @Get(":id")
    async getConversation(@Param("id") id: string): Promise<Conversation> {
        return await this.conversationService.findById(id)
    }

    @Post()
    async createConversation(@Body() createConversationDto: CreateConversationDto): Promise<Conversation> {
        return await this.conversationService.create(createConversationDto);
    }
    @Patch(":id")
    async updateConversation(
        @Param("id") id: string,
        @Body() updateConversationDto: UpdateConversationDto): Promise<Conversation> {
        return await this.conversationService.updateById(id, updateConversationDto);
    }

    @Delete(":id")
    async deleteConversation(@Param("id") id: string): Promise<{ deleted: boolean }> {
        return await this.conversationService.deleteById(id);
    }

}
