import { IsArray, IsString } from "class-validator";
import { ChatMessage } from "src/chat-message/schemas/chat-message.schema";
import { User } from "src/user/schemas/user.schema";



export class CreateConversationDto {

    @IsArray()
    @IsString({ each: true })
    participants: User[]

    @IsArray()
    @IsString({ each: true })
    messages?: ChatMessage[]
}