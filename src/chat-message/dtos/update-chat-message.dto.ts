import { PartialType } from "@nestjs/mapped-types";
import { CreateChatMessageDto } from "./create-chat-message.dto";
import { IsString } from "class-validator";



export class UpdateChatMessageDto {
    @IsString()
    message: string
}