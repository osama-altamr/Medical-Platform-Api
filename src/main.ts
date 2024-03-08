import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';
import { ConfigService } from '@nestjs/config';
import { CastErrorFilter } from './filters/cast-error.filter';
import { WebSocketExceptionFilter } from './filters/ws-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);


  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);


  app.setGlobalPrefix('api/v1');
  SwaggerModule.setup('api', app, document);
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
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));

  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalFilters(new CastErrorFilter());
  app.useGlobalFilters(new WebSocketExceptionFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  await app.listen(3000);
}
bootstrap();
