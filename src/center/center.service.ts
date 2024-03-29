import { Injectable } from '@nestjs/common';
import { Center } from './schemas/center.schema';
import { CreateCenterDto } from './dtos/create-center.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCenterDto } from './dtos/update-center.dto';
import { createFilteringObject, createSortingObject } from 'src/shared/helpers/mongoose-query-helpers';
import { Sorting } from 'src/shared/decorators/sorting.decorator';
import { Filtering } from 'src/shared/decorators/filtering.decorator';
import { Pagination } from 'src/shared/decorators/pagination.decorator';

@Injectable()
export class CenterService {
  constructor(@InjectModel(Center.name) private centerModel: Model<Center>) { }

  async create(createCenterDto: CreateCenterDto): Promise<Center> {
    return await this.centerModel.create(createCenterDto);
  }
  async updateById(
    id: string,
    updateCenterDto: UpdateCenterDto,
  ): Promise<Center> {
    return await this.centerModel.findByIdAndUpdate(id, updateCenterDto, {
      runValidators: true,
      new: true,
    });
  }
  async deleteById(id: string) {
    return await this.centerModel.findByIdAndDelete(id);
  }
  async findAll(
    paginationParams: Pagination, sortingParams: Sorting[], filteringParams: Filtering[]
  ) {
    return await this.centerModel.find(createFilteringObject(filteringParams))
      .limit(paginationParams.size)
      .skip(paginationParams.offset).sort({ ...createSortingObject(sortingParams) });
  }
  async findById(id: string): Promise<Center> {
    return await this.centerModel.findById(id).populate('manager','name age bio phoneNumber ');
  }

  async getDistance(latlng: any, unit: string) {
    const [lat, lng] = latlng.split(',');
    const multiplier = unit === 'mi' ? 0.00062137 : 0.001;
    const distance = await this.centerModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lat * 1, lng * 1],
          },
          distanceField: 'distance',
          distanceMultiplier: multiplier
        }
      }
      , {
        $project: {
          distance: 1,
          name: 1,
        }
      }

    ])
    return distance;


  }
  async getCentersWithin(distance, latlng, unit) {
    const [lat, lng] = latlng.split(',');
    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
    const centers = await this.centerModel.find({
      location: {
        $geoWithin: { $centerSphere: [[lat, lng], radius] }
      }
    })
    return centers;
  }

  async updateClinicsInCenter(id: string, clinicId: string) {
    return await this.centerModel.findByIdAndUpdate(id, {
      $push: { clinics: clinicId }
    });
  }
}
