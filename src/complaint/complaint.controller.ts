import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { Complaint } from './schemas/complaint.schema';
import { CreateComplaintDto } from './dtos/create-complaint.dto';
import { UpdateComplaintDto } from './dtos/update-complaint.dto';
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';

@Controller('complaints')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService) { }

    @Get()
    async getComplaints(
        @FilteringParams(["assigneeId"]) filteringParams?: Filtering[],

    ): Promise<Complaint[]> {
        return this.complaintService.findAll(filteringParams);
    }
    @Get(":id")
    async getComplaint(@Param("id") id: string): Promise<Complaint> {
        return await this.complaintService.findById(id);
    }

    @Post()
    async createComplaint(@Body() createComplaintDto: CreateComplaintDto): Promise<Complaint> {
        return await this.complaintService.create(createComplaintDto);
    }

    @Delete(":id")
    async deleteComplaint(@Param("id") id: string): Promise<{ deleted: boolean }> {
        return this.complaintService.deleteById(id);
    }

    @Patch(":id")
    async updateComplaint(@Param("id") id: string,
        @Body() updateComplaintDto: UpdateComplaintDto
    ): Promise<Complaint> {
        return this.complaintService.updateById(id, updateComplaintDto)
    }
}
