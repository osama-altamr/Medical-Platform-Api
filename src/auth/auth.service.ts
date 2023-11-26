import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private userService: UserService,
    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  async validateOAuth(profile) {
    const user = await this.userModel.findOne({ email: profile.email });
    if (user) {
      return user;
    }
    console.log(profile);
    console.log('User not found Create a new user');
    const newUser = await this.userModel.create({
      email: profile.email,
      name: profile.name,
      avatar: profile.avatar,
      verified: profile.verified,
    });
    return newUser || null;
  }
  async validate(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).select('+password');
    console.log(await bcrypt.compare(password, user.password));
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(user);
      // delete user.password;
      return user;
    }
    return null;
  }

  async login(
    user,
  ): Promise<{ user; accessToken: string; refreshToken: string }> {
    const payload = {
      _id: user._id,
    };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user): Promise<{ accessToken: string }> {
    const payload = {
      _id: user._id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  async resetPassword(
    email: string,
    password: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) throw new NotFoundException('User does not exist');
    const match = await bcrypt.compare(password, user.password);
    console.log(password, user.password);
    if (!match) throw new NotFoundException('Invalid password');
    const hashedPassword = await bcrypt.hash(newPassword, 10); // You can adjust this value based on your security requirements
    user.password = hashedPassword;
    user.passwordChangedAt = new Date();
    await user.save();
    return user;
  }

  async sendEmailForgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('Not found user');
    const tokenModel = await this.createForgottenPasswordToken(email);
    if (tokenModel && tokenModel.passowrdResetToken) {
      const sended = await this.mailerService.sendMail({
        to: tokenModel.email,
        from: 'oaltamr18@gmail.com',
        subject: 'Forgotten Password',
        text: 'Forgot Password',
        html:
          'Hi! <br><br> if you requested to reset your password <br><br>' +
          '<a href=' +
          'http://localhost:3000/auth/' +
          `${tokenModel.email}` +
          '/reset-password/' +
          tokenModel.passowrdResetToken +
          '>Click here </a>',
      });
      if (sended) {
        return true;
      }
    }
  }

  async createForgottenPasswordToken(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user.passowrdResetToken) {
      throw new InternalServerErrorException('An error occurred on the server');
    } else {
      user.passowrdResetToken = (
        Math.floor(Math.random() * 9000000) + 1000000
      ).toString(); //Generate  7 digits number
      user.passowrdResetExpires = new Date();
      await user.save();
      return user;
    }
  }

  async setNewPassword({ email, passwordResetToken }, currentPassword) {
    const currentUser = await this.userModel.findOne({ email });
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    const currentDate = new Date();
    const diffInMilliseconds =
      currentDate.getTime() - currentUser.passowrdResetExpires.getTime();
    const diffInMinutes = diffInMilliseconds / 60000;
    if (
      diffInMinutes < 10 &&
      currentUser.passowrdResetToken == passwordResetToken
    ) {
      currentUser.password = await bcrypt.hash(currentPassword, 10);
      currentUser.passowrdResetToken = null;
      currentUser.passowrdResetExpires = null;
      await currentUser.save();
      return currentUser;
    } else {
      throw new BadRequestException(' Token is invalid or has expired');
    }
  }
  createEmailToken() {
    return (Math.floor(Math.random() * 9000000) + 1000000).toString();
  }
  async sendEmailVerification(email: string, verifyToken) {
    console.log(verifyToken);
    const sended = await this.mailerService.sendMail({
      to: email,
      from: 'oaltamr18@gmail.com',
      subject: 'Email Verification',
      html:
        'Hi! <br><br> Verify  <br><br>' +
        '<a href=' +
        'http://localhost:3000/auth/' +
        `${email}` +
        '/verify/' +
        verifyToken +
        '>Click here </a>',
    });
    if (sended) {
      return verifyToken;
    }
  }
  async signUp(user): Promise<User> {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      const verifyToken = this.createEmailToken();
      user.verifyToken = verifyToken;
      const userRepo = await this.userModel.create(user);
      await this.sendEmailVerification(userRepo.email, verifyToken);
      return userRepo;
    } catch (err) {
      // Handle Duplicate Email
      if (err.code == 11000) {
        throw new ConflictException('Email already exists');
      }
    }
  }
  async verifyEmail(verifyToken, email) {
    const user = await this.userModel.findOne({ email });
    console.log(user);
    if (user && verifyToken == user.verifyToken) {
      user.verified = true;
      user.verifyToken = null;
      await user.save();
      return user;
    }
    throw new ForbiddenException();
  }
  
  async findUser(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }
}
