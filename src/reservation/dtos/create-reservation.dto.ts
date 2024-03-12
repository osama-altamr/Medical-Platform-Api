import { Type } from "class-transformer"
import { IsEnum, IsMongoId, IsOptional, IsString } from "class-validator"
import { Clinic } from "src/clinic/schemas/clinic.schema"
import { Day } from "src/day/schemas/day.schema"
import { TimeSlotDto } from "src/shared/dtos/time-slot.dto"
import { User } from "src/user/schemas/user.schema"
import { ReservationStatus } from "../enums/reservation-status.enum"
import { ApiProperty } from "@nestjs/swagger"




export class CreateReservationDto {
    @ApiProperty({ description: 'The ID of the patient', type: 'mongoId' })
    @IsMongoId()
    patient: User
    @ApiProperty({ description: 'The ID of the clinic', type: 'mongoId' })
    @IsMongoId()
    clinic: Clinic

    @ApiProperty({ description: 'The ID of the day', type: 'mongoId' })
    @IsMongoId()
    day: Day

    @ApiProperty({ description: 'The time slot for the reservation', type: TimeSlotDto })
    @IsString()
    @Type(() => TimeSlotDto)
    timeSlot: string

    @ApiProperty({ description: 'The status of the reservation', enum: ReservationStatus })
    @IsEnum(ReservationStatus)
    @IsOptional()
    status: string

    @ApiProperty({ description: 'Additional notes for the reservation', type: String })
    @IsString()
    @IsOptional()
    notes: string
}