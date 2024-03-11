import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Clinic } from './schemas/clinic.schema';
import { UpdateClinicDto } from './dtos/update-clinic.dto';
import { CreateClinicDto } from './dtos/create-clinic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { createFilteringObject, createSortingObject } from 'src/shared/helpers/mongoose-query-helpers';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Sorting } from 'src/shared/decorators/sorting.decorator';
import { Filtering } from 'src/shared/decorators/filtering.decorator';
import { CenterService } from 'src/center/center.service';

@Injectable()
export class ClinicService {
    constructor(
        @InjectModel(Clinic.name) private clinicModel: Model<Clinic>,
        private readonly centerService: CenterService
    ) { }


    async findAll(paginationParams: Pagination, sortingParams: Sorting[], filteringParams: Filtering[]): Promise<Clinic[]> {
        return this.clinicModel.find(createFilteringObject(filteringParams))
            .limit(paginationParams.size)
            .skip(paginationParams.offset).sort({ ...createSortingObject(sortingParams) });
    }
    async findById(id: string): Promise<Clinic> {
        return await this.clinicModel.findById(id).populate('center', 'name openingHours');
    }
    async updateById(id: string, updateClinicDto: UpdateClinicDto) {
        return await this.clinicModel.findByIdAndUpdate(id, updateClinicDto, {
            runValidators: true,
            new: true,
        })
    }
    async deleteById(id: string): Promise<{ deleted: boolean }> {
        const res = await this.clinicModel.findByIdAndDelete(id);
        if (!res) return { deleted: false };
        return { deleted: true };
    }
    async create(createClinicDto: CreateClinicDto) {
        const clinic = await this.clinicModel.create(createClinicDto);
        this.centerService.updateClinicsInCenter(clinic.center.toString(), clinic._id)
        return clinic;
    }
}
