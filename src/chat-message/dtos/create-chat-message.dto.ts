import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";
import { User } from "src/user/schemas/user.schema";



export class CreateChatMessageDto {
    @ApiProperty({
        description: 'The ID of the sender user.',
        type: String,
        example: '60d5ecb4b4850b1f8c7e8a34',
    })

    @IsMongoId()
    senderId: User;

    @ApiProperty({
        description: 'The ID of the receiver user.',
        type: String,
        example: '60d5ecb4b4850b1f8c7e8a35',
    })
    @IsMongoId()
    receiverId: User

    @ApiProperty({
        description: 'The message content.',
        type: String,
        example: 'Hello, how are you?',
    })
    @IsString()
    message: string;
}