import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional, IsString } from "class-validator";
import { Day } from "src/day/schemas/day.schema";


export class DelayReservationDto {

    @ApiProperty({ description: 'The time slot for the reservation', type: String })
    @IsString()
    timeSlot: string

    @ApiProperty({ description: 'The ID of the day', type: 'mongoId' })
    @IsMongoId()
    day: Day
    
    @ApiProperty({ description: 'Additional notes for the reservation', type: String, required: false })
    @IsString()
    @IsOptional()
    note: string
}