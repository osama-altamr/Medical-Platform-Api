import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";


export class ResetPasswordDto{
    @ApiProperty({ description: 'Current user email' })
    @IsEmail()
    readonly email: string;
    @ApiProperty({ description: 'Current password' })
    @IsString()
    readonly password: string;
    @ApiProperty({ description: 'New password' })
    @IsString()
    @IsStrongPassword()
    readonly newPassword: string;
}