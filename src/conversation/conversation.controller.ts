import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Conversation } from './schemas/conversation.schema';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { UpdateConversationDto } from './dtos/update-conversation.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Conversations')
@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) { }

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Get all conversations' })
    @ApiResponse({ status: 200, description: 'The list of conversations has been successfully retrieved.', type: [CreateConversationDto] })
    @ApiBearerAuth()
    async getConversations(): Promise<Conversation[]> {
        return await this.conversationService.findAll()
    }

    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'patient', 'subadmin')
    @ApiOperation({ summary: 'Get a specific conversation by ID' })
    @ApiResponse({ status: 200, description: 'The conversation has been successfully retrieved.', type: CreateConversationDto })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the conversation to retrieve.' })
    @ApiBearerAuth()
    async getConversation(@Param("id") id: string): Promise<Conversation> {
        return await this.conversationService.findById(id)
    }


    @Post()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Create a new conversation' })
    @ApiResponse({ status: 201, description: 'The conversation has been successfully created.', type: CreateConversationDto })
    @ApiBody({ type: CreateConversationDto })
    @ApiBearerAuth()
    async createConversation(@Body() createConversationDto: CreateConversationDto): Promise<Conversation> {
        return await this.conversationService.create(createConversationDto);
    }


    @Patch(":id")
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Update a specific conversation by ID' })
    @ApiResponse({ status: 200, description: 'The conversation has been successfully updated.', type: CreateConversationDto })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the conversation to update.' })
    @ApiBody({ type: UpdateConversationDto })
    @ApiBearerAuth()
    async updateConversation(
        @Param("id") id: string,
        @Body() updateConversationDto: UpdateConversationDto): Promise<Conversation> {
        return await this.conversationService.updateById(id, updateConversationDto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Delete a specific conversation by ID' })
    @ApiResponse({
        status: 200,
        description: 'The conversation has been successfully deleted.',
        schema: {
            type: 'object',
            properties: {
                deleted: {
                    type: 'boolean',
                    example: true,
                },
            },
        },
    })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the conversation to delete.' })
    @ApiBearerAuth()
    async deleteConversation(@Param("id") id: string): Promise<{ deleted: boolean }> {
        return await this.conversationService.deleteById(id);
    }

}
