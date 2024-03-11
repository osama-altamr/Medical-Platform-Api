import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword } from "class-validator";


export class SetNewPasswordDto {
    @ApiProperty({ description: 'New password' })
    @IsString()
    @IsStrongPassword()
    readonly newPassword: string;
}