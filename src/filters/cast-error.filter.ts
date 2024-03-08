import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { CastError, Error as MongooseError } from 'mongoose';
const { CastError } = MongooseError;

@Catch(CastError)
export class CastErrorFilter implements ExceptionFilter {
  catch(exception: CastError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse()
    console.log("Cast Error")
    if (exception.kind === 'ObjectId') {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid ObjectId provided',
        error: 'Bad request',
      });
    } else
      response.status(400).json({
        message: 'Invalid data format',
        error: exception.message,
      });
  }
}
