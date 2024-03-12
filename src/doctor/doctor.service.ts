import { Injectable } from '@nestjs/common';
import { Doctor } from './schemas/doctor.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateDoctorDto } from './dtos/update-doctor.dto';
import { CreateDoctorDto } from './dtos/create-doctor.dto';
import { Query } from 'express-serve-static-core';
import { Sorting } from 'src/shared/decorators/sorting.decorator';
import { Filtering } from 'src/shared/decorators/filtering.decorator';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { createFilteringObject, createSortingObject } from 'src/shared/helpers/mongoose-query-helpers';
import { UpdateDoctorRatingsDto } from './dtos/update-rating-doctor.dto';

@Injectable()
export class DoctorService {
    constructor(
        @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    ) {
    }
    async findAll(paginationParams: Pagination, sortingParams: Sorting[], filteringParams: Filtering[]): Promise<Doctor[]> {
        return this.doctorModel.find(createFilteringObject(filteringParams))
            .limit(paginationParams.size)
            .skip(paginationParams.offset).sort({ ...createSortingObject(sortingParams) });
    }
    async findById(id: string): Promise<Doctor> {
        return this.doctorModel.findById(id)
        .populate('clinics', 'name specialization')
        .populate('centers','manager name');
    }
    async updateById(id: string, updateDoctorDto: UpdateDoctorDto | UpdateDoctorRatingsDto) {
        return await this.doctorModel.findByIdAndUpdate(id, updateDoctorDto, {
            runValidators: true,
            new: true,
        })
    }
    async deleteById(id: string): Promise<{ deleted: boolean }> {
        const res = await this.doctorModel.findByIdAndDelete(id);
        if (!res) return { deleted: false };
        return { deleted: true };
    }
    async create(createDoctorDto: CreateDoctorDto) {
        const doctor = await this.doctorModel.create(createDoctorDto);
        return doctor;
    }


}
