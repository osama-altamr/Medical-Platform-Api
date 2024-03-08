import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  IsStrongPassword,
  Min,
} from 'class-validator';
import { UserRoles } from '../enums/user-roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the entity',
    example: 'John Doe',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The email address of the entity',
    example: 'john.doe@example.com',
  })

  @IsEmail({}, { message: 'Please enter correct email address' })
  readonly email: string;


  @ApiProperty({
    description: 'The password of the entity',
    example: 'StrongPassword123!',
  })

  @IsStrongPassword()
  readonly password: string;

  @ApiProperty({
    description: 'A brief bio of the entity',
    example: 'Software Developer with a passion for coding',
  })
  @IsString()
  readonly bio: string;

  @ApiProperty({
    description: 'The phone number of the entity',
    example: '+1234567890',
  })

  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({
    description: 'The age of the entity',
    example: 30,
    minimum: 24
  })

  @IsNumber()
  @Min(24)
  readonly age: number;


  @ApiProperty({
    description: 'The avatar URL of the entity',
    example: 'https://example.com/avatar.jpg',
 })
  @IsString()
  readonly avatar: string;

  @ApiProperty({
    description: 'The role of the entity',
    example: 'ADMIN',
    enum: UserRoles,
 })
  @IsEnum(UserRoles)
  readonly role: UserRoles;
}
