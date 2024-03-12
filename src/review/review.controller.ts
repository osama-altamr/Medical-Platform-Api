import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Review } from './schemas/review.schema';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { SetLikeAndDislike } from './decorators/review.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
    constructor(
        private readonly reviewService: ReviewService
    ) { }

    @Get()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get all reviews' })
    @ApiResponse({ status: 200, description: 'The list of reviews has been successfully retrieved.', type: [CreateReviewDto] })
    @ApiBearerAuth()
    async getReviews(): Promise<Review[]> {
        return await this.reviewService.findAll()
    }


    @Get(":id")
    @UseGuards(JwtGuard)
    @Roles('employee', 'patient')

    @ApiOperation({ summary: 'Get a specific review by ID' })
    @ApiResponse({ status: 200, description: 'The review has been successfully retrieved.', type: CreateReviewDto })
    @ApiParam({ name: 'id', description: 'ID of the review to retrieve', required: true })
    @ApiBearerAuth()

    async getReview(@Param("id") id: string): Promise<Review> {
        return await this.reviewService.findById(id)
    }


    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new review' })
    @ApiResponse({ status: 201, description: 'The review has been successfully created.', type: CreateReviewDto })
    @ApiBody({ type: CreateReviewDto })
    async createReview(
        @Body()
        createReviewDto: CreateReviewDto,
    ): Promise<Review> {
        return await this.reviewService.create(createReviewDto)
    }



    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('patient')
    @ApiOperation({ summary: 'Update a specific review by ID' })
    @ApiResponse({ status: 200, description: 'The review has been successfully updated.', type: CreateReviewDto })
    @ApiParam({ name: 'id', description: 'ID of the review to update', required: true })
    @ApiBearerAuth()
    @ApiBody({ type: UpdateReviewDto })
    async updateReview(
        @Param("id") id: string,
        @Body() @SetLikeAndDislike() updateReviewDto: UpdateReviewDto): Promise<Review> {
        return await this.reviewService.updateById(id, updateReviewDto);
    }


    @Delete(":id")

    @UseGuards(JwtGuard, RolesGuard)
    @Roles('patient', 'employee', 'admin')

    @ApiOperation({ summary: 'Delete a specific review by ID' })
    @ApiResponse({
        status: 200, description: 'The review has been successfully deleted.', schema: {
            type: 'object', properties: {
                deleted: { type: 'boolean', example: "true" }
            }
        }
    })
    @ApiParam({ name: 'id', description: 'ID of the review to delete', required: true })
    @ApiBearerAuth()
    async deleteReview(
        @Param("id") id: string
    ): Promise<{ deleted: boolean }> {
        return this.reviewService.deleteById(id);
    }

}
