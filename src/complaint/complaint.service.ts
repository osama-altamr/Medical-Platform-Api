import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint } from './schemas/complaint.schema';
import { Model } from 'mongoose';
import { UpdateComplaintDto } from './dtos/update-complaint.dto';
import { CreateComplaintDto } from './dtos/create-complaint.dto';
import { Filtering } from 'src/shared/decorators/filtering.decorator';
import { createFilteringObject } from 'src/shared/helpers/mongoose-query-helpers';

@Injectable()
export class ComplaintService {
    constructor(
        @InjectModel(Complaint.name) private complaintModel: Model<Complaint>
    ) {
    }
    async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
        return await this.complaintModel.create(createComplaintDto)
    }
    async findAll(
        filteringParams: Filtering[]
    ): Promise<Complaint[]> {
        return await this.complaintModel.find(createFilteringObject(filteringParams));
    }
    async findById(id: string): Promise<Complaint> {
        return await this.complaintModel.findById(id);
    }
    async updateById(id: string, updateComplaintDto: UpdateComplaintDto) {
        return await this.complaintModel.findByIdAndUpdate(id, updateComplaintDto, { runValidators: true, new: true });
    }
    async deleteById(id: string): Promise<{ deleted: boolean }> {
        const res = await this.complaintModel.findByIdAndDelete(id);
        if (!res) {
            return { deleted: false };
        }
        return { deleted: true };
    }
}