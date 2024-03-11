import {
  Request,
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';

import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { GoogleAuthGuard } from './guards/google-auth.guard';

import { FacebookAuthGuard } from './guards/facebook-auth.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SetNewPasswordDto } from './dtos/set-new-password.dto';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }


  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: "string", description: "Access token for the user" },
        refreshToken: { type: "string", description: "Refresh token for the user" },
        user: { type: 'object' }
      }
    }
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: "string", description: "Email for login" },
        password: { type: 'string', description: "Password for login" }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid email address or password',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', description: 'HTTP status code' },
        message: { type: 'string', description: 'Error message' },
        timestamp: { type: 'string', format: 'date-time', description: 'Timestamp of the error' },
        path: { type: 'string', description: 'API path where the error occurred' },
      },
    },
  })
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }


  @Post('signup')
  @ApiBody({
    type: CreateUserDto,
    description: 'Payload to create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User
  })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }



  @UseGuards(RefreshJwtGuard)

  @Get('refresh')
  @ApiOperation({ summary: 'Refresh user token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEwMjc0' }
      }
    },
    description: 'Payload to refresh the user token',
  })
  async refreshToken(@Request() req) {
    console.log(req.user);
    return await this.authService.refreshToken(req.user);
  }

  @Patch('reset-password')
  // @UseGuards(JwtGuard)
  @ApiBody({
    type: ResetPasswordDto,
    description: 'Payload to reset the user password',
  })
  @ApiResponse({
    status: 200,
    description: 'The password has been successfully reset.',
    type: User,
  })
  async resetPassword(
    @CurrentUser() user: User,
    @Body() resetePasswordDto: ResetPasswordDto,
  ) {
    // console.log(user)
    return this.authService.resetPassword(
      resetePasswordDto.email,
      resetePasswordDto.password,
      resetePasswordDto.newPassword,
    );
  }


  @Get('forgot-password/:email')
  @ApiOperation({ summary: 'Send forgot password email' })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email address of the user who wants to reset their password',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Email sent successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Success message' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Email not sent',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Error message' },
      },
    },
  })
  async sendEmailForgotPassword(@Param() params) {
    try {
      const isEmailSent = await this.authService.sendEmailForgotPassword(
        params.email,
      );
      if (isEmailSent) {
        return { message: 'Email sent successfully' };
      } else {
      }
    } catch (err) { }
  }


  @Patch(':email/reset-password/:passwordResetToken')
  @ApiOperation({ summary: 'Set new password for user' })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email address of the user',
    type: String,
  })
  @ApiParam({
    name: 'passwordResetToken',
    required: true,
    description: 'Password reset token for the user',
    type: String,
  })
  @ApiBody({
    type: SetNewPasswordDto,
    description: 'Payload to set the new password',
  })
  @ApiResponse({
    status: 200,
    description: 'The password has been successfully set.',
    type: User
  })
  @ApiResponse({
    status: 400,
    description: 'Password reset token is invalid or expired',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Error message' },
      },
    },
  })
  async setNewPassword(
    @Body() setNewPassowrdDto: SetNewPasswordDto,
    @Param() params,
  ) {
    return this.authService.setNewPassword(params, setNewPassowrdDto.newPassword);
  }


  @Get(':email/verify/:verifyToken')
  @ApiOperation({ summary: 'Verify user email' })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email address of the user to be verified',
    type: String,
  })
  @ApiParam({
    name: 'verifyToken',
    required: true,
    description: 'Verification token for the user',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Email verified successfully',
    schema: {
      type: 'string',
      example: 'Email verified Successfully',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Verification token is invalid or expired',
    schema: {
      type: 'string',
      example: 'Verification token is invalid or expired',
    },
  })
  async verifyEmail(@Param() params) {
    console.log(params);
    const isEmailVerified = await this.authService.verifyEmail(
      params.verifyToken,
      params.email,
    );
    if (isEmailVerified) {
      return 'Email verified Successfully';
    }
  }
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication!' };
  }
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect() {
    return { msg: 'OK' };
  }

  @UseGuards(FacebookAuthGuard)
  @Get('facebook/login')
  async handleLoginFacebook(@Req() req) {
    console.log(req.user);
  }
  @Get('facebook/redirect')
  async handlewLogin(@Req() req) {
    console.log(req.user);
  }
}
