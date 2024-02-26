import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Clinic } from './schemas/clinic.schema';
import { UpdateClinicDto } from './dtos/update-clinic.dto';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dtos/create-clinic.dto';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/sorting.decorator';
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';

@Controller('clinics')
export class ClinicController {
    constructor(
        private clinicService :ClinicService
    ){
    }
    @Post()
    async createClinic(
     @Body() createClinicDto:CreateClinicDto
     ): Promise<Clinic>{
     return this.clinicService.create(createClinicDto)
    }

    @Get()
    async getClinics(
        @PaginationParams() paginationParams? : Pagination ,
        @SortingParams(['name']) sortingParams?: Sorting[],
        @FilteringParams(["name"]) filteringParams?: Filtering[],
    ):Promise<Clinic []>{
        return  this.clinicService.findAll(
            paginationParams,sortingParams,filteringParams
        ) ;
    }
    @Get(":id")
    async getClinic(
    @Param("id") id:string,
    ):Promise<Clinic>{
        return this.clinicService.findById(id);
    }
    @Put(":id")
    async updateClinic(
        @Param("id") id :string,
        @Body() updateClinicDto:UpdateClinicDto
    ):Promise<Clinic>{
        return this.clinicService.updateById(id,updateClinicDto);
    }

    @Delete(":id")
    async deleteClinic(
        @Param("id") id:string
    ):Promise<{deleted:boolean}>{
        return this.clinicService.deleteById(id)
    }
}
