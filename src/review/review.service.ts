import { Injectable } from '@nestjs/common';
import { Review } from './schemas/review.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { DoctorService } from 'src/doctor/doctor.service';
import { race } from 'rxjs';
import { Type } from 'class-transformer';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<Review>,
        private doctorService: DoctorService
    ) { }

    async findAll(): Promise<Review[]> {
        return await this.reviewModel.find();
    }
    async findById(id: string): Promise<Review> {
        return await this.reviewModel.findById(id);
    }
    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        const review = await this.reviewModel.create(createReviewDto)
        if (review) {
            await this.calcAverageRatings(createReviewDto.doctor);
            await this.getLikesAndDislikes(createReviewDto.doctor);
        }
        return review;
    }
    async updateById(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
        const { rating, like, dislike } = updateReviewDto;
        const review = await this.reviewModel.findByIdAndUpdate(id, updateReviewDto, { runValidators: true, new: true });


        if (review) {
            const promises = [];
            if (rating !== undefined) {
                promises.push(this.calcAverageRatings(review.doctor));
            }
            if (like !== undefined || dislike !== undefined) {
                promises.push(this.getLikesAndDislikes(review.doctor));
            }
            await Promise.all(promises);
        }
        return review;
    }
    async deleteById(id: string): Promise<{ deleted: boolean }> {
        const res = await this.reviewModel.findByIdAndDelete(id);
        if (!res) {
            return { deleted: false }
        }
        return { deleted: true };
    }
    async calcAverageRatings(doctorId) {
        const stats = await this.reviewModel.aggregate([
            {
                $match: { doctor: new mongoose.Types.ObjectId(doctorId) }
            },
            {
                $group: {
                    _id: '$doctor',
                    nRating: { $sum: 1 },
                    avgRating: { $avg: '$rating' },
                },
            },
        ]);
        if (stats.length > 0) {
            await this.doctorService.updateById(doctorId, {
                ratingsQuantity: stats[0].nRating,
                ratingsAverage: stats[0].avgRating,
            });
        }
        return;
    }
    async getLikesAndDislikes(doctorId) {
        const stats = await this.reviewModel.aggregate([
            {
                $match: { doctor: new mongoose.Types.ObjectId(doctorId) }
            },
            {
                $group: {
                    _id: '$doctor',
                    count: { $sum: 1 },
                    totalLikes: { $sum: '$like' },
                    totalDislikes: { $sum: '$dislike' },
                },
            },


        ]);
        if (stats.length > 0) {
            await this.doctorService.updateById(doctorId, {
                likes: stats[0].totalLikes,
                dislikes: stats[0].totalDislikes,
            });
        }
        return;
    }
}
