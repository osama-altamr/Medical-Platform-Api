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
import { UserService } from 'src/user/user.service';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { authenticator } from 'otplib';
import { AuthGuard } from '@nestjs/passport';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }
  @UseGuards(RefreshJwtGuard)
  @Get('refresh')
  async refreshToken(@Request() req) {
    console.log(req.user);
    return await this.authService.refreshToken(req.user);
  }

  @Patch('reset-password')
  // @UseGuards(JwtGuard)
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
  async sendEmailForgotPassword(@Param() params) {
    try {
      const isEmailSent = await this.authService.sendEmailForgotPassword(
        params.email,
      );
      if (isEmailSent) {
        console.log(isEmailSent);
      } else {
      }
    } catch (err) {}
  }
  @Patch(':email/reset-password/:passwordResetToken')
  async setNewPassword(
    @Body() body: { currentPassword: string },
    @Param() params,
  ) {
    return this.authService.setNewPassword(params, body.currentPassword);
  }
  @Get(':email/verify/:verifyToken')
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
