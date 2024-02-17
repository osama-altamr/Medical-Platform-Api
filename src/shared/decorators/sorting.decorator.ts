import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";


export interface Sorting {
    property: string;
    direction: string;
}

export const SortingParams = createParamDecorator(
    (validParams: any, context: ExecutionContext): Sorting[] => {
        const req: Request = context.switchToHttp().getRequest();
        const sort = req.query.sort as string;
        if (!sort) return null;
        const sortCriteria = sort.split(',');
        const sortPattern = /^([a-zA-z0-9])+:(asc|desc)$/;
        if (typeof validParams != 'object') {
            throw new BadRequestException("Invalid sort parameter")
        }
        return sortCriteria.map(criteria => {
            let [property, direction] = criteria.split(":");  
            if (!criteria.match(sortPattern)) throw new BadRequestException("Invalid sort parameter");
            if (!validParams.includes(property)) throw new BadRequestException(`Invalid sort property: ${property}`)
            return { property, direction }
        })
    }
);