import { IsDate } from "class-validator";

export class CreateBookingDto {
    @IsDate()
    checkInDate: Date

    @IsDate()
    checkOutDate: Date
    
}
