import { IsMongoId, IsString } from "class-validator";
import { User } from "src/user/schemas/user.schema";



export class CreateChatMessageDto {
    @IsMongoId()
    senderId: User;
    @IsMongoId()
    receiverId: User
    @IsString()
    message: string;
}