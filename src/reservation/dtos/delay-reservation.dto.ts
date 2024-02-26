import { IsMongoId, IsOptional, IsString } from "class-validator";
import { Day } from "src/day/schemas/day.schema";


export class DelayReservationDto {


    @IsString()
    timeSlot: string
    @IsMongoId()
    day: Day
    @IsString()
    @IsOptional()
    note: string
}