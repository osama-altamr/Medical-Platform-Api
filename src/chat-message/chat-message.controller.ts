import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { Sorting, SortingParams } from 'src/shared/decorators/sorting.decorator';
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';
import { UpdateChatMessageDto } from './dtos/update-chat-message.dto';
import { ChatMessage } from './schemas/chat-message.schema';
import { CreateChatMessageDto } from './dtos/create-chat-message.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@ApiTags("Chat Messages")
@Controller('chat-messages')
export class ChatMessageController {
    constructor(
        private chatService: ChatMessageService
    ) { }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'patient')
    @ApiOperation({ summary: 'Create a new chat message' })
    @ApiResponse({ status: 201, description: 'The chat message has been successfully created.', type: CreateChatMessageDto })
    @ApiBody({ type: CreateChatMessageDto })
    @ApiBearerAuth()
    @Post()
    async createChatMessage(@Body() chatMessage: CreateChatMessageDto): Promise<ChatMessage> {
        return await this.chatService.createChatMessage(chatMessage);
    }


    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'patient')
    @ApiOperation({ summary: 'Get all chat messages with optional sorting and filtering' })
    @ApiResponse({ status: 200, description: 'The list of chat messages has been successfully retrieved.', type: [CreateChatMessageDto] })
    @ApiQuery({ name: 'sort', required: false, description: 'Sorting parameters. Example: timestamp:desc', type: String, isArray: true })
    @ApiQuery({ name: 'filter', required: false, description: 'Filtering parameters. Example: senderId:123', type: String, isArray: true })
    @ApiBearerAuth()

    async getChatMessages(
        @SortingParams(['timestamp']) sortingParams?: Sorting[],
        @FilteringParams(["senderId", "receiverId", "message"]) filteringParams?: Filtering[],
    ): Promise<ChatMessage[]> {
        return await this.chatService.findAll(sortingParams, filteringParams);
    }

    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'subadmin')

    @ApiOperation({ summary: 'Get a specific chat message by ID' })
    @ApiResponse({ status: 200, description: 'The chat message has been successfully retrieved.', type: CreateChatMessageDto })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the chat message to retrieve.' })
    @ApiBearerAuth()
    async getChatMessage(
        @Param("id") id: string
    ): Promise<ChatMessage> {
        return await this.chatService.findById(id);
    }



    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('no one ')
    @ApiOperation({ summary: 'Update a specific chat message by ID' })
    @ApiResponse({ status: 200, description: 'The chat message has been successfully updated.', type: CreateChatMessageDto })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the chat message to update.' })
    @ApiBody({ type: UpdateChatMessageDto })
    @ApiBearerAuth()
    async updateChatMessage(
        @Param("id") id: string,
        @Body() updateChatMessageDto: UpdateChatMessageDto
    ): Promise<ChatMessage> {
        return await this.chatService.updateById(id, updateChatMessageDto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'subadmin', 'patient')
    @ApiOperation({ summary: 'Delete a specific chat message by ID' })
    @ApiResponse({
        status: 200, description: 'The chat message has been successfully deleted.', schema: {
            type: 'object',
            properties: {
                deleted: { type: "boolean" }
            }
        }
    })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the chat message to delete.' })
    @ApiBearerAuth()
    async deleteChatMessage(
        @Param("id") id: string,
    ): Promise<{ deleted: boolean }> {
        return await this.chatService.deleteById(id);
    }
}
