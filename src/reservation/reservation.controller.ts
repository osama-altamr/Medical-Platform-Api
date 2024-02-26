import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { ReservationService } from './reservation.service';
import { MedicalRecordService } from 'src/medical-record/medical-record.service';
import { Reservation } from './schemas/reservation.schema';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { DelayReservationDto } from './dtos/delay-reservation.dto';
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';

@Controller('reservations')
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService,
    ) { }
    @Post("reservation-order")
    async reservationOrder(
        @Body() createReservationDto: CreateReservationDto
    ): Promise<Reservation> {
        return await this.reservationService.reservationOrder(createReservationDto);
    }
    @Put("/delay-reservation/:id")
    async delayReservation(@Param("id") id: string,

        @Body() delayReservationDto: DelayReservationDto
    ): Promise<Reservation> {
        return await this.reservationService.delayReservation(id, delayReservationDto);
    }
    @Get("/cancel-reservation/:id")
    async cancelReservation(@Param("id") id: string): Promise<{ cancelled: boolean }> {
        return await this.reservationService.cancelReservation(id);
    }
    @Get()
    async getReservations(
        @FilteringParams(["status"]) filteringParams?: Filtering[],
    ): Promise<Reservation[]> {
        return await this.reservationService.findAll(filteringParams);
    }
    @Get(":id")
    async getReservation(
        @Param("id") id: string
    ): Promise<Reservation> {
        return await this.reservationService.findById(id);
    }

    @Patch(":id")
    async updateReservation(@Param("id") id: string
        , updateReservationDto: UpdateReservationDto
    ): Promise<Reservation> {
        return await this.reservationService.updateById(id, updateReservationDto);
    }

    @Delete(":id")
    async deleteReservation(@Param("id") id: string): Promise<{ deleted: boolean }> {
        return await this.reservationService.deleteReservation(id);
    }
}

