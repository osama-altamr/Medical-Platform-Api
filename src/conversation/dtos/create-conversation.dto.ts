import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { ChatMessage } from "src/chat-message/schemas/chat-message.schema";
import { User } from "src/user/schemas/user.schema";



export class CreateConversationDto {
    @ApiProperty({
        description: 'Array of participant user IDs.',
        type: [String],
        example: ['60d5ecb4b4850b1f8c7e8a34', '60d5ecb4b4850b1f8c7e8a35'],
    })
    @IsArray()
    @IsString({ each: true })
    participants: User[]

    
    @ApiProperty({
        description: 'Array of chat message IDs (optional).',
        type: [String],
        example: ['60d5ecb4b4850b1f8c7e8a36', '60d5ecb4b4850b1f8c7e8a37'],
        required: false,
    })
    @IsArray()
    @IsString({ each: true })
    messages?: ChatMessage[]
}