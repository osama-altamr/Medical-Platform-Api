import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { Day } from './schemas/day.schema';
import { DayService } from './day.service';
import { CreateDayDto } from './dtos/create-day.dto';
import { UpdateDayDto } from './dtos/update-day.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@ApiTags("Days")
@Controller('days')
export class DayController {
    constructor(private dayService: DayService) {
    }
    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee', 'admin', 'patient')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all days' })
    @ApiResponse({ status: 200, description: 'The list of days has been successfully retrieved.', type: [CreateDayDto] })
    @ApiBearerAuth()
    async getDays(): Promise<Day[]> {
        return await this.dayService.findAll()
    }


    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee', 'patient', 'subadmin')
    @ApiBearerAuth()

    @ApiOperation({ summary: 'Get a specific day by ID' })
    @ApiResponse({ status: 200, description: 'The day has been successfully retrieved.', type: CreateDayDto })
    @ApiParam({ name: 'id', description: 'ID of the day to retrieve', required: true })
    async getDay(
        @Param("id") id: string
    ): Promise<Day> {
        return await this.dayService.findById(id)
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee', 'subadmin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new day' })
    @ApiResponse({ status: 201, description: 'The day has been successfully created.', type: CreateDayDto })
    @ApiBody({ type: CreateDayDto })
    async createDay(
        @Body() createDayDto: CreateDayDto
    ): Promise<Day> {
        return await this.dayService.create(createDayDto);
    }

    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee', 'subadmin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a specific day by ID' })
    @ApiResponse({ status: 200, description: 'The day has been successfully updated.', type: CreateDayDto })
    @ApiParam({ name: 'id', description: 'ID of the day to update', required: true })
    @ApiBody({ type: UpdateDayDto })
    async updateDay(
        @Param("id") id: string,
        @Body() updateDayDto: UpdateDayDto
    ): Promise<Day> {
        return await this.dayService.updateById(id, updateDayDto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'subadmin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a specific day by ID' })
    @ApiResponse({
        status: 200, description: 'The day has been successfully deleted.', schema: {
            type: "object",
            properties: {
                deleted: { type: "boolean" }
            }
        }
    })
    @ApiParam({ name: 'id', description: 'ID of the day to delete', required: true })
    async deleteDay(
        @Param("id") id: string
    ): Promise<{ deleted: boolean }> {
        return await this.dayService.deleteById(id);
    }


    @Get("available-hours/:id")
    @UseGuards(JwtGuard)

    @ApiOperation({ summary: 'Get available hours for a specific day by ID' })
    @ApiResponse({ status: 200, description: 'The available hours have been successfully retrieved.', type: [String] }) // Adjust the type as necessary
    @ApiParam({ name: 'id', description: 'ID of the day to get available hours for', required: true })
    @ApiBearerAuth()
    @Roles('employee', 'admin', 'subadmin')
    async getAvailableHours(
        @Param("id") id: string
    ) {
        return await this.dayService.getAvailableHours(id);
    }
}
