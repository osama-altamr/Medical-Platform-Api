import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { Complaint } from './schemas/complaint.schema';
import { CreateComplaintDto } from './dtos/create-complaint.dto';
import { UpdateComplaintDto } from './dtos/update-complaint.dto';
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags("Complaints")
@Controller('complaints')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService) { }

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('subadmin', 'admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all complaints with optional filtering' })
    @ApiResponse({ status: 200, description: 'The list of complaints has been successfully retrieved.', type: [CreateComplaintDto] })
    @ApiQuery({
        name: 'subadmin',
        required: false,
        description: 'Filter complaints by subadmin ID',
        type: String,
        isArray: true,
    })
    async getComplaints(
        @FilteringParams(["subadmin"]) filteringParams?: Filtering[],
    ): Promise<Complaint[]> {
        return this.complaintService.findAll(filteringParams);
    }


    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('subadmin', 'admin')
    @ApiOperation({ summary: 'Get a specific complaint by ID' })
    @ApiResponse({ status: 200, description: 'The complaint has been successfully retrieved.', type: CreateComplaintDto })
    @ApiParam({ name: 'id', description: 'ID of the complaint to retrieve', required: true })
    @ApiBearerAuth()
    async getComplaint(@Param("id") id: string): Promise<Complaint> {
        return await this.complaintService.findById(id);
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('patient')

    @ApiOperation({ summary: 'Create a new complaint' })
    @ApiResponse({ status: 201, description: 'The complaint has been successfully created.', type: CreateComplaintDto })
    @ApiBody({ type: CreateComplaintDto })
    @ApiBearerAuth()

    async createComplaint(@Body() createComplaintDto: CreateComplaintDto): Promise<Complaint> {
        return await this.complaintService.create(createComplaintDto);
    }

    @Delete(":id")

    @ApiOperation({ summary: 'Delete a specific complaint by ID' })
    @ApiResponse({
        status: 200, description: 'The complaint has been successfully deleted.', schema: {
            type: 'object',
            properties: {
                deleted: { type: "boolean" }
            }
        }
    })
    @ApiParam({ name: 'id', description: 'ID of the complaint to delete', required: true })
    @ApiBearerAuth()

    @UseGuards(JwtGuard, RolesGuard)
    @Roles('subadmin', 'admin')
    async deleteComplaint(@Param("id") id: string): Promise<{ deleted: boolean }> {
        return this.complaintService.deleteById(id);
    }


    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('subadmin', 'admin')

    @ApiOperation({ summary: 'Update a specific complaint by ID' })
    @ApiResponse({ status: 200, description: 'The complaint has been successfully updated.', type: CreateComplaintDto })
    @ApiParam({ name: 'id', description: 'ID of the complaint to update', required: true })
    @ApiBody({ type: UpdateComplaintDto })
    @ApiBearerAuth()

    async updateComplaint(@Param("id") id: string,
        @Body() updateComplaintDto: UpdateComplaintDto
    ): Promise<Complaint> {
        return this.complaintService.updateById(id, updateComplaintDto)
    }
}
