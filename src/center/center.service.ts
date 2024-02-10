import { Injectable } from '@nestjs/common';
import { Center } from './schemas/center.schema';
import { CreateCenterDto } from './dtos/create-center.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCenterDto } from './dtos/update-center.dto';

@Injectable()
export class CenterService {
  constructor(@InjectModel(Center.name) private centerModel: Model<Center>) {}

  async createCenter(createCenterDto: CreateCenterDto): Promise<Center> {
    return await this.centerModel.create(createCenterDto);
  }
  async updateCenter(
    id: string,
    updateCenterDto: UpdateCenterDto,
  ): Promise<Center> {
    return await this.centerModel.findByIdAndUpdate(id, updateCenterDto, {
      runValidators: true,
      new: true,
    });
  }
  async deleteCenter(id: string){
    return await this.centerModel.findByIdAndDelete(id);
  }
  async findAll(){
    return await this.centerModel.find();
  }
  async findOne(id: string): Promise<Center>{
    return await this.centerModel.findById(id);
  }
}
