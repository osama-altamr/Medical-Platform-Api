import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: process.env.CLIENT_CALLBACK_URL_GOOGLE,
      scope: ['profile', 'email'],
    });
  }
  async validate(accessToken, refreshToken, profile: Profile) {
    return await this.authService.validateOAuth({
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos[0].value,
      verified: profile.emails[0].verified,
    });
  }
}
