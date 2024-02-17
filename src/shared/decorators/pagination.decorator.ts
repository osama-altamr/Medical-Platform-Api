import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";



export interface Pagination {
    page: number;
    limit: number;
    size: number;
    offset: number;
}

export const PaginationParams =createParamDecorator(
    (data:any,context:ExecutionContext): Pagination =>{

        const req:Request = context.switchToHttp().getRequest();
        const page = parseInt(req.query.page as string)||1;
        const size = parseInt(req.query.size as string)||100;
  
        if(isNaN(page) || page<0|| isNaN(size) || size< 0){
            throw new BadRequestException("Invalid pagination params");
        }
        if(size>100){
            throw new BadRequestException("Invalid pagination params:Max size is 100") 
        }
        const limit = size;
        const offset = (page-1)*limit;
        return {page,limit,size,offset};
    }
);