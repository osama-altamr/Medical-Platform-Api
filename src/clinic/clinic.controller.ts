import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Clinic } from './schemas/clinic.schema';
import { UpdateClinicDto } from './dtos/update-clinic.dto';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dtos/create-clinic.dto';

@Controller('clinic')
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
    async getClinics():Promise<Clinic []>{
        return  this.clinicService.findAll() ;
    }
    @Get(":id")
    async getClinic(
    @Param("id") id : string 
    ):Promise<Clinic>{
        return this.clinicService.findById(id);
    }
    @Put(":id")
    async updateClinic(
        @Param("id") id : string ,
        @Body() updateClinicDto:UpdateClinicDto
    ):Promise<Clinic>{
        return this.clinicService.updateById(id,updateClinicDto);
    }

    @Delete(":id")
    async deleteClinic(
        @Param("id")  id :string
    ):Promise<{deleted:boolean}>{
        return this.clinicService.deleteById(id)
    }
}
