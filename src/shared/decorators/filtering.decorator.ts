import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";


export interface Filtering {
    property: string;
    rule: string;
    value: string;
}


export enum FilterRule {
    EQUALS = 'eq',
    NOT_EQUALS = 'neq',
    GREATER_THAN = 'gt',
    GREATER_THAN_OR_EQUALS = 'gte',
    LESS_THAN = 'lt',
    LESS_THAN_OR_EQUALS = 'lte',
    LIKE = 'like',
    NOT_LIKE = 'nlike',
    IN = 'in',
    NOT_IN = 'nin',
    IS_NULL = 'isnull',
    IS_NOT_NULL = 'isnotnull',
}


export const FilteringParams = createParamDecorator((validParams: any, context: ExecutionContext): Filtering[] => {

    const req: Request = context.switchToHttp().getRequest();
    let filterStr = req.query.filter as string;
    if (!filterStr) return null;
    if (typeof validParams != 'object') throw new BadRequestException("Invalid filter parameter");
    const filterPattern = /^[a-zA-Z0-9_]+:(gt|gte|lt|lte|eq|neq|like|nlike|in|nin):[a-zA-Z0-9_,]+$/;
    const filterPattern2 = /^[a-zA-Z0-9_]+:(isnull|isnotnull)$/;
    let filters = filterStr.split(',');
    return filters.map(filter => {
        if (!filter.match(filterPattern) && !filter.match(filterPattern2)) {
            throw new BadRequestException('Invalid filter parameter');
        }
        const [property, rule, value] = filter.split(':');
        if (!validParams.includes(property)) throw new BadRequestException(`Invalid filter property: ${property}`);
        if (!Object.values(FilterRule).includes(rule as FilterRule)) throw new BadRequestException(`Invalid filter rule: ${rule}`);
        return { property, rule, value };
    })




}
);