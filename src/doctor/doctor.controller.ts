import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Doctor } from './schemas/doctor.schema';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dtos/update-doctor.dto';
import { CreateDoctorDto } from './dtos/create-doctor.dto';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/sorting.decorator';
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';

@Controller('doctors')
export class DoctorController {
    constructor(private doctorService:DoctorService){
    }   

   @Get()
   async getDoctors(
    @PaginationParams() paginationParams? : Pagination ,
    @SortingParams(['name','yearsOfExperience']) sortingParams?: Sorting[],
    @FilteringParams(["name"]) filteringParams?: Filtering[],
   ): Promise<Doctor[]>{
    return this.doctorService.findAll(
    paginationParams,sortingParams,filteringParams
    ) ;
   }

   @Post()
   async createDoctor(
    @Body() createDoctorDto:CreateDoctorDto
    ): Promise<Doctor>{
    return this.doctorService.create(createDoctorDto)
   }
   @Get(':id')
   async getDoctor(
    @Param('id') id :string 
   ) :Promise<Doctor>{
    return this.doctorService.findById(id);
   }
   @Put(':id')
   async updateDoctor(
    @Param('id') id :string,
     @Body() updateDoctorDto :UpdateDoctorDto
   ):Promise<Doctor>{
    return this.doctorService.updateById(id, updateDoctorDto);
   }

   @Delete(':id')
   async deleteDoctor(
    @Param('id') id :string
   ):Promise<{deleted:boolean}>{
    return this.doctorService.deleteById(id);
   }

}
