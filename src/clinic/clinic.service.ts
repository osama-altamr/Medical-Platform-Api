import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Clinic } from './schemas/clinic.schema';
import { UpdateClinicDto } from './dtos/update-clinic.dto';
import { CreateClinicDto } from './dtos/create-clinic.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClinicService {
       constructor(
        @InjectModel(Clinic.name)  private clinicModel: Model<Clinic>
       ){}


   async findAll():Promise<Clinic[]>{
        return this.clinicModel.find();
    }
    async findById(id:string): Promise<Clinic>{
        return this.clinicModel.findById(id);   
    }
    async updateById(id:string, updateClinicDto : UpdateClinicDto){
        return await this.clinicModel.findByIdAndUpdate(id,updateClinicDto,{
            runValidators:true,
            new:true,
    })
    }
    async deleteById(id:string): Promise<{deleted:boolean}>{
        const res =  await this.clinicModel.findByIdAndDelete(id);
        if(!res) return {deleted : false};
        return { deleted:true} ;
    }

    async create(createClinicDto:CreateClinicDto) {
          const clinic = await this.clinicModel.create(createClinicDto);
          return clinic;
    }
      }
