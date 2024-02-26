import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Review } from './schemas/review.schema';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { SetLikeAndDislike } from './decorators/review.decorator';

@Controller('reviews')
export class ReviewController {
    constructor(
        private readonly reviewService: ReviewService
    ) { }

    @Get()
    async getReviews(): Promise<Review[]> {
        return await this.reviewService.findAll()
    }
    @Get(":id")
    async getReview(@Param("id") id: string): Promise<Review> {
        return await this.reviewService.findById(id)
    }
    @Post()
    async createReview(
        @Body() 
        createReviewDto: CreateReviewDto,
    ): Promise<Review> {
        return await this.reviewService.create(createReviewDto)
    }
    @Patch(":id")
    async updateReview(
        @Param("id") id: string,
        @Body() @SetLikeAndDislike() updateReviewDto: UpdateReviewDto): Promise<Review> {
        return await this.reviewService.updateById(id, updateReviewDto);
    }
    @Delete(":id")
    async deleteReview(
        @Param("id") id: string
    ): Promise<{ deleted: boolean }> {
        return this.reviewService.deleteById(id);
    }
}
