import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';


@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError , host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    switch (exception.code) {
        case 11000:
          response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Duplicate key error ',
            error: 'Bad request',
          });
          break;
        default:
          response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            error: 'Internal Server Error',
          });
          break;
      }
    }
  }  

