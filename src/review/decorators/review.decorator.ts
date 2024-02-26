import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";


export const SetLikeAndDislike = createParamDecorator((data, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    let reviewData = req.body;
    if (reviewData.like === undefined && reviewData.dislike === undefined) {
        return reviewData;
    }
    if (reviewData.like === 1 && reviewData.dislike === undefined) {
        reviewData.dislike = 0;
    } else if (reviewData.dislike === 1 && reviewData.like === undefined) {
        reviewData.like = 0;
    }
    return reviewData;
})
