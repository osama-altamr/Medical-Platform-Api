import { Type } from "class-transformer"
import { IsEnum, IsMongoId, IsOptional, IsString } from "class-validator"
import { Clinic } from "src/clinic/schemas/clinic.schema"
import { Day } from "src/day/schemas/day.schema"
import { TimeSlotDto } from "src/shared/dtos/time-slot.dto"
import { User } from "src/user/schemas/user.schema"
import { ReservationStatus } from "../enums/reservation-status.enum"




export class CreateReservationDto {
    @IsMongoId()
    patient: User
    @IsMongoId()
    clinic: Clinic
    @IsMongoId()
    day: Day
    @IsString()
    @Type(() => TimeSlotDto)
    timeSlot: string
    @IsEnum(ReservationStatus)
    @IsOptional()
    status: string
    @IsString()
    @IsOptional()
    notes: string
}