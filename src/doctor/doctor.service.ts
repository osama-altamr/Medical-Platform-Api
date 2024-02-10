import { Injectable } from '@nestjs/common';
import { Doctor } from './schemas/doctor.schema';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateDoctorDto } from './dtos/update-doctor.dto';
import { CreateDoctorDto } from './dtos/create-doctor.dto';

@Injectable()
export class DoctorService {
    constructor(
        @InjectModel(Doctor.name)   private doctorModel:Model<Doctor>,
    ){  
    }
    async findAll():Promise<Doctor[]>{
        return this.doctorModel.find();
    }
    async findById(id:string): Promise<Doctor>{
        return this.doctorModel.findById(id);   
    }
    async updateById(id:string, updateDoctorDto : UpdateDoctorDto){
        return await this.doctorModel.findByIdAndUpdate(id,updateDoctorDto,{
            runValidators:true,
            new:true,
        })
    }
    async deleteById(id:string): Promise<{deleted:boolean}>{
        const res =  await this.doctorModel.findByIdAndDelete(id);
        if(!res) return {deleted : false};
        return { deleted:true} ;
    }
    async create(createDoctorDto:CreateDoctorDto) {
        const doctor = await this.doctorModel.create(createDoctorDto);
        return doctor;
    }
}
