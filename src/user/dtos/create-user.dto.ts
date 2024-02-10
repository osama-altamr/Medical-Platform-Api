import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  IsStrongPassword,
  Min,
} from 'class-validator';
import { UserRoles } from '../schemas/user.schema';

export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsEmail({}, { message: 'Please enter correct email address' })
  readonly email: string;
  @IsStrongPassword()
  readonly password: string;
  @IsString()
  readonly bio: string;
  @IsString()
  readonly phoneNumber: string;
  @IsNumber()
  @Min(24)
  readonly age: number;
  @IsString()
  readonly avatar: string;
  @IsEnum(UserRoles)
  readonly role: UserRoles;
}
