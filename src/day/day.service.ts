import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Day } from './schemas/day.schema';
import { Model } from 'mongoose';
import { UpdateDayDto } from './dtos/update-day.dto';
import { CreateDayDto } from './dtos/create-day.dto';

@Injectable()
export class DayService {
    constructor(@InjectModel(Day.name) private dayModel: Model<Day>) {
    }
    async findAll(): Promise<Day[]> {
        return this.dayModel.find();
    }
    async findById(id: string): Promise<Day> {
        return this.dayModel.findById(id);
    }
    async updateById(id: string, updateDayDto: UpdateDayDto) {
        return await this.dayModel.findByIdAndUpdate(id, updateDayDto, {
            runValidators: true,
            new: true,
        })
    }
    async deleteById(id: string): Promise<{ deleted: boolean }> {
        const res = await this.dayModel.findByIdAndDelete(id);
        if (!res) return { deleted: false };
        return { deleted: true };
    }
    async create(createDayDto: CreateDayDto) {
        const Day = await this.dayModel.create(createDayDto);
        return Day;
    }
    async getAvailableHours(id: string) {
        let day = await this.dayModel.findById(id);
        let unavailableHours: string[] = [];
        let availableHours: string[] = [];


        if (day.timeSlots.length === 0) return { timeSlot: day.startTime, hasAvailableHours: true };
        day.timeSlots.forEach((slot: { hour: string, isAvailable: boolean }) => {
            if (!slot.isAvailable) {
                unavailableHours.push(slot.hour);
            }
            if (slot.isAvailable) {
                availableHours.push(slot.hour);
            }
        });
        if (availableHours.length > 0) {
            return { timeSlot: availableHours[0], hasAvailableHours: true };
        }
        let latest = this.latestTime(unavailableHours);
        latest.setHours(latest.getHours() + 1);
        const endDate = this.getParseTime(day.endTime);
        if (latest.getTime() >= endDate.getTime()) {
            return { message: "No more hours available for today", hasAvailableHours: false };
        }
        const formattedLatestDate = this.getFormattedTime(latest);
        return { timeSlot: formattedLatestDate, hasAvailableHours: true }
    }
    getFormattedTime(date) {
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes} ${amPm}`;
    }
    latestTime(times: string[]) {
        const dates = times.map((time) => this.getParseTime(time));
        const latest = new Date(Math.max(...dates.map(date => date.getTime())))
        return latest;
    }

    getParseTime(time: string) {
        const [timePart, amPm] = time.split(' ');
        const [hours, minutes] = timePart.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        if (amPm.toLowerCase() == "pm" && parseInt(hours, 10) !== 12) {
            date.setHours(date.getHours() + 12);
        }
        else if (amPm.toLowerCase() === 'am' && parseInt(hours, 10) === 12) {
            date.setHours(0);
        }
        return date;
    }
    async adjustTimeSlot(dayId, timeSlot) {
        let day = await this.dayModel.findById(dayId);
        if (!day) throw new NotFoundException("day not found");
        const timeSlotIndex = day.timeSlots.findIndex(slot => slot.hour === timeSlot);
        day.timeSlots[timeSlotIndex].isAvailable = true;
        return await day.save();
    }

    // async adjustAllTimeSlots(dayId, timeSlot) {
    //     let day = await this.dayModel.findById(dayId);
    //     if (!day) throw new NotFoundException("day not found");
    //     const timeSlotIndex = day.timeSlots.findIndex(slot => slot.hour === timeSlot);
    //     if (timeSlotIndex === -1) {
    //         throw new NotFoundException('Time slot not found');
    //     }
    //     let timeSlotDate = this.getParseTime(timeSlot);
    //     day.timeSlots.forEach((slot) => {
    //         let tmd = this.getParseTime(slot.hour);
    //         if (tmd.getTime() > timeSlotDate.getTime()) {
    //             let newTime = tmd.setHours(tmd.getHours() - 1);
    //             let date = new Date(newTime);
    //            slot.hour = this.getFormattedTime(date);
    //         }
    //     })
    //     day.timeSlots.splice(timeSlotIndex,1);
    //     return await day.save();
    // }
}
