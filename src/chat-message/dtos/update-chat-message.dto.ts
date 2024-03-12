
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";



export class UpdateChatMessageDto {

    @ApiProperty({
        description: 'The updated message content.',
        type: String,
        example: 'Hello, how are you?',
    })
    @IsString()
    message: string
}