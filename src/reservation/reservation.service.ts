import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from './schemas/reservation.schema';
import mongoose, { Model } from 'mongoose';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { MedicalRecordService } from 'src/medical-record/medical-record.service';
import { MedicalRecord } from 'src/medical-record/schemas/medical-record.schema';
import { DayService } from 'src/day/day.service';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { DelayReservationDto } from './dtos/delay-reservation.dto';
import { Filtering } from 'src/shared/decorators/filtering.decorator';
import { createFilteringObject } from 'src/shared/helpers/mongoose-query-helpers';

@Injectable()
export class ReservationService {
    constructor(
        @InjectModel(Reservation.name)
        private readonly reservationModel: Model<Reservation>,
        private readonly medicalService: MedicalRecordService,
        private readonly dayService: DayService
    ) { }



    async reservationOrder(createReservationDto: CreateReservationDto) {
        const { patient, day, timeSlot } = createReservationDto;
        console.log(patient)
        const medicalRecord = await this.medicalService.findByPatient(patient.toString());
        if (!medicalRecord) {
            throw new BadRequestException("Cannot create a reservation for this patient. Please provide a medical record if you don't have one.");
        }
        const dayObj = await this.dayService.findById(day.toString());
        if (!dayObj) {
            throw new BadRequestException("The day you're looking for does not exist.");
        }

        const index = dayObj.timeSlots.findIndex(slot => (slot.hour === timeSlot && slot.isAvailable == true));
        if (index !== -1) {
            dayObj.timeSlots.push({ hour: timeSlot, isAvailable: false });
        } else {
            dayObj.timeSlots[index].isAvailable = false;
        }
        await this.dayService.updateById(dayObj._id, dayObj);

        return this.reservationModel.create(createReservationDto);
    }

    async findAll(filteringParams: Filtering[]): Promise<Reservation[]> {
        return this.reservationModel.find(createFilteringObject(filteringParams));
    }

    async findById(id: string): Promise<Reservation> {
        return await this.reservationModel.findById(id);
    }
    async updateById(id: string, updateDto: UpdateReservationDto | DelayReservationDto) {
        return await this.reservationModel.findByIdAndUpdate(id, updateDto, {
            runValidators: true,
            new: true,
        });
    }

    async delayReservation(id: string, delayReservationDto: DelayReservationDto): Promise<Reservation> {
        const reservation = await this.reservationModel.findById(id);
        await this.dayService.adjustTimeSlot(reservation.day, reservation.timeSlot);
        const { day, timeSlot } = delayReservationDto;
        const dayObj = await this.dayService.findById(day.toString());
        if (dayObj.timeSlots.length == 0) {
            dayObj.timeSlots.push({ hour: timeSlot, isAvailable: false });
        } else {
            const index = dayObj.timeSlots.findIndex(slot => (slot.hour === timeSlot && slot.isAvailable == true));
            if (index !== -1) {
                dayObj.timeSlots.push({ hour: timeSlot, isAvailable: false });
            } else {
                dayObj.timeSlots[index].isAvailable = false;
            }
        }
        await this.dayService.updateById(dayObj._id, dayObj);
        return await this.updateById(id, delayReservationDto);
    }

    async cancelReservation(id: string): Promise<{ cancelled: boolean }> {
        let res = await this.updateById(id, { status: 'cancelled' });
        if (!res) return { cancelled: false };
        return { cancelled: true };
    }
    async deleteReservation(id: string): Promise<{ deleted: boolean }> {
        const reservation = await this.reservationModel.findById(id);
        await this.dayService.adjustTimeSlot(reservation.day, reservation.timeSlot);
        const res = await this.reservationModel.findByIdAndDelete(id)
        if (!res) return { deleted: false };
        return { deleted: true };
    }

    async findOne(patient: string): Promise<Reservation> {
        return await this.reservationModel.findOne({ patient })
    }
}
