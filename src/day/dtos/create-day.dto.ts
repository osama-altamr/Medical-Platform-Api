import { IsArray, IsDate, IsObject, IsOptional, IsString, Matches, ValidateNested, isEnum, isString } from "class-validator";
import { Clinic } from "src/clinic/schemas/clinic.schema";
import { TimeSlotDto } from "../../shared/dtos/time-slot.dto";
import { Type } from "class-transformer";
import { TimeSlot } from "../schemas/day.schema";



export class CreateDayDto {
    @IsString({})
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in the format MM/DD/YYYY',
    })
    readonly date: string;
    @IsString()
    @Matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i)
    readonly startTime: string;
    @IsString()
    @Matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i)
    readonly endTime: string;
    @IsString()
    @IsOptional()
    readonly timezone: string;
    @IsArray()
    @Type(() => TimeSlotDto)
    @ValidateNested({ each: true })
    readonly timeSlots: TimeSlot[]
    @IsString()
    readonly clinic: Clinic

}