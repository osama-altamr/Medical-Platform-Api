import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import {  MongoExceptionFilter } from './filters/mongo-exception.filter';
import { ConfigService } from '@nestjs/config';
import { CastErrorFilter } from './filters/cast-error.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  app.use(
    session({
      secret: configService.get<string>('SECRET_SESSION'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe({whitelist:true ,forbidNonWhitelisted:false}));
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalFilters(new CastErrorFilter());
  await app.listen(3000);
}
bootstrap();
