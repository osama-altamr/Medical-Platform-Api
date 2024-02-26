import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { Day } from './schemas/day.schema';
import { DayService } from './day.service';
import { CreateDayDto } from './dtos/create-day.dto';
import { UpdateDayDto } from './dtos/update-day.dto';

@Controller('days')
export class DayController {

    constructor(private dayService: DayService) {
    }
    @Get()
    async getDays(): Promise<Day[]> {
        return await this.dayService.findAll()
    }
    @Get(":id")
    async getDay(
        @Param("id") id: string
    ): Promise<Day> {
        return await this.dayService.findById(id)
    }
    @Post()
    async createDay(
        @Body() createDayDto: CreateDayDto
    ): Promise<Day> {
        return await this.dayService.create(createDayDto);
    }

    @Patch(":id")
    async updateDay(
        @Param("id") id: string,
        @Body() updateDayDto: UpdateDayDto
    ): Promise<Day> {
        return await this.dayService.updateById(id, updateDayDto);
    }

    @Delete(":id")
    async deleteDay(
        @Param("id") id: string

    ): Promise<{ deleted: boolean }> {
        return await this.dayService.deleteById(id);
    }


    @Get("available-hours/:id")
    async getAvailableHours(
        @Param("id") id: string
    ) {
        return await this.dayService.getAvailableHours(id);
    }
}
