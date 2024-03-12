import { IsArray, IsDate, IsObject, IsOptional, IsString, Matches, ValidateNested, isEnum, isString } from "class-validator";
import { Clinic } from "src/clinic/schemas/clinic.schema";
import { TimeSlotDto } from "../../shared/dtos/time-slot.dto";
import { Type } from "class-transformer";
import { TimeSlot } from "../schemas/day.schema";
import { ApiProperty } from "@nestjs/swagger";



export class CreateDayDto {


    @ApiProperty({
        description: 'Date in the format MM/DD/YYYY',
        example: '2023-04-01',
    })

    @IsString({})
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in the format MM/DD/YYYY',
    })
    readonly date: string;

    @ApiProperty({
        description: 'Start time in the format HH:MM AM/PM',
        example: '09:00 AM',
    })
    @IsString()
    @Matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i)
    readonly startTime: string;


    @ApiProperty({
        description: 'End time in the format HH:MM AM/PM',
        example: '05:00 PM',
    })
    @IsString()
    @Matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i)
    readonly endTime: string;

    @ApiProperty({
        description: 'Timezone',
        example: 'America/New_York',
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly timezone: string;

    @ApiProperty({
        description: 'Array of time slots',
        type: [TimeSlotDto],
    })
    @IsArray()
    @Type(() => TimeSlotDto)
    @ValidateNested({ each: true })
    readonly timeSlots: TimeSlot[]

    @ApiProperty({
        description: 'Clinic',
        example: 'mongoId',
    })
    @IsString()
    readonly clinic: Clinic

}