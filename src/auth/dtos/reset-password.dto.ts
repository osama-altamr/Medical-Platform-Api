import { IsEmail, IsString, IsStrongPassword } from "class-validator";


export class ResetPasswordDto{
    @IsEmail()
    readonly email: string;
    @IsString()
    readonly password: string;
    @IsString()
    @IsStrongPassword()
    readonly newPassword: string;
}