import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Doctor } from './schemas/doctor.schema';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dtos/update-doctor.dto';
import { CreateDoctorDto } from './dtos/create-doctor.dto';

@Controller('doctors')
export class DoctorController {
    constructor(private doctorService:DoctorService){
    }   

   @Get()
   async getDoctors(): Promise<Doctor[]>{
    return this.doctorService.findAll() ;
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
