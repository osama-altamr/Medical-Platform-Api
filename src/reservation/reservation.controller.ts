import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { ReservationService } from './reservation.service';
import { MedicalRecordService } from 'src/medical-record/medical-record.service';
import { Reservation } from './schemas/reservation.schema';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { DelayReservationDto } from './dtos/delay-reservation.dto';
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';



@ApiTags('Reservation')
@Controller('reservations')
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService,
    ) { }
    @Post("reservation-order")
    @UseGuards(JwtGuard)

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new reservation order' })
    @ApiBody({ type: CreateReservationDto })
    @ApiResponse({ status: 201, description: 'The reservation has been successfully created.', type: CreateReservationDto })

    async reservationOrder(
        @Body() createReservationDto: CreateReservationDto
    ): Promise<Reservation> {
        return await this.reservationService.reservationOrder(createReservationDto);
    }

    @Put("/delay-reservation/:id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'patient')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delay a reservation' })
    @ApiParam({ name: 'id', description: 'The ID of the reservation to delay', required: true, type: String })
    @ApiBody({ type: DelayReservationDto })
    @ApiResponse({ status: 200, description: 'The reservation has been successfully delayed.', type: CreateReservationDto })
    async delayReservation(@Param("id") id: string,
        @Body() delayReservationDto: DelayReservationDto
    ): Promise<Reservation> {
        return await this.reservationService.delayReservation(id, delayReservationDto);
    }


    @Get("/cancel-reservation/:id")
    @UseGuards(JwtGuard)
    @Roles('admin', 'patient', 'subadmin')
    @ApiOperation({ summary: 'Cancel a reservation' })
    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'The ID of the reservation to cancel', required: true, type: String })
    @ApiResponse({
        status: 200, description: 'The reservation has been successfully cancelled.', schema: {
            type: 'object',
            properties: {
                cancelled: { type: 'boolean' }
            }
        }
    })
    async cancelReservation(@Param("id") id: string): Promise<{ cancelled: boolean }> {
        return await this.reservationService.cancelReservation(id);
    }


    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin')


    @ApiOperation({ summary: 'Get all reservations' })
    @ApiBearerAuth()

    @ApiQuery({ name: 'status', required: false, type: String, description: 'Filter reservations by status' })
    @ApiResponse({ status: 200, description: 'Return all reservations.', type: [CreateReservationDto] })
    async getReservations(
        @FilteringParams(["status"]) filteringParams?: Filtering[],
    ): Promise<Reservation[]> {
        return await this.reservationService.findAll(filteringParams);
    }


    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'subadmin', 'patient')

    @ApiOperation({ summary: 'Get a specific reservation by ID' })
    @ApiBearerAuth()

    @ApiParam({ name: 'id', description: 'The ID of the reservation to retrieve', required: true, type: String })
    @ApiResponse({ status: 200, description: 'Return the reservation.', type: CreateReservationDto })

    async getReservation(
        @Param("id") id: string
    ): Promise<Reservation> {
        return await this.reservationService.findById(id);
    }

    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'subadmin', 'employee')


    @ApiOperation({ summary: 'Update a specific reservation by ID' })
    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'The ID of the reservation to update', required: true, type: String })
    @ApiBody({ type: UpdateReservationDto })
    @ApiResponse({ status: 200, description: 'The reservation has been successfully updated.', type: CreateReservationDto })
    async updateReservation(@Param("id") id: string
        , updateReservationDto: UpdateReservationDto
    ): Promise<Reservation> {
        return await this.reservationService.updateById(id, updateReservationDto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'subadmin')
    @ApiOperation({ summary: 'Delete a specific reservation by ID' })
    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'The ID of the reservation to delete', required: true, type: String })
    @ApiResponse({
        status: 200, description: 'The reservation has been successfully deleted.', schema: {
            type: 'object',
            properties: {
                deleted: { type: "boolean" }
            }
        }
    })
    async deleteReservation(@Param("id") id: string): Promise<{ deleted: boolean }> {
        return await this.reservationService.deleteReservation(id);
    }
}

