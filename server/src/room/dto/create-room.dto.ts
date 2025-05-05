import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateRoomDto {
    @IsNumber()
    @Min(1, { message: 'Номер должен быть положительным числом'})
    number: number

    @IsString()
    type: string

    @IsOptional()
    @IsArray()
    images?: string[]

    @IsNumber()
    @Min(0, { message: 'Цена должна быть положительным числом'})
    price: number

    @IsArray()
    selectedFeatures: string[]

}
