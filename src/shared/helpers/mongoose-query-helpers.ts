import { FilterRule, Filtering } from "../decorators/filtering.decorator";
import { Sorting } from "../decorators/sorting.decorator"
import { FilterQuery } from "mongoose";


export const createSortingObject = (sort: Sorting[]) => {
    if (!sort || sort.length == 0) return {};
    return sort.reduce((accumulator, criteria) => {
        accumulator[criteria.property] = criteria.direction === 'asc' ? 1 : -1
        return accumulator;
    }, {})
}
export const createFilteringObject = (filters: Filtering[])
    : FilterQuery<any> => {
    if (!filters || filters.length == 0) return {};
    const filterQueries = filters.map(filter => applyFilterRule(filter));
    return { $and: filterQueries };
}



const applyFilterRule = (filter: Filtering): FilterQuery<any> => {
    switch (filter.rule) {
        case FilterRule.EQUALS:
            return { [filter.property]: filter.value }
        case FilterRule.NOT_EQUALS:
            return { [filter.property]: { '$ne': filter.value } };
        case FilterRule.GREATER_THAN:
            return { [filter.property]: { '$gt': filter.value } }
        case FilterRule.GREATER_THAN_OR_EQUALS:
            return { [filter.property]: { '$gte': filter.value } }
        case FilterRule.LESS_THAN:
            return { [filter.property]: { '$lt': filter.value } }
        case FilterRule.LESS_THAN_OR_EQUALS:
            return { [filter.property]: { '$lte': filter.value } }
        case FilterRule.LIKE:
            return { [filter.property]: { '$regex': filter.value, '$options': 'i' } }
        case FilterRule.NOT_LIKE:
            return { [filter.property]: { '$not': { '$regex': filter.value, '$options': 'i' } } }
        case FilterRule.IN:
            return { [filter.property]: { '$in': filter.value.split(',') } }
        case FilterRule.NOT_IN:
            return { [filter.property]: { '$nin': filter.value } }
        default:
            return {};
    }
}


