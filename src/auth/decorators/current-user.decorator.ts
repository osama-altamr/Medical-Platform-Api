import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
