import { Type } from "class-transformer"
import { IsMongoId, IsNumber, IsObject, IsString, Max, Min } from "class-validator"
import { ObjectId } from "mongodb"
export class CreateReviewDto {
    @Type(() => Number)
    @IsNumber()
    @Min(1, {message: "Оценка должна быть от 1 до 5"})
    @Max(5, {message: "Оценка должна быть от 1 до 5"})
    rating: number

    @IsString()
    content: string
}
