import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: "Имя должно содержать хотя бы 2 символа"})
    firstName: string;

    @IsString()
    @MinLength(2, { message: "Фамилия должна содержать хотя бы 2 символа"})
    lastName: string;

    @IsEmail({}, { message: "Неккоректный email-адрес"})
    email: string;


    gender: string

    @IsString()
    @MinLength(6, { message: "Пароль должен содержать не менее 6 символов"})
    password: string


    // role?: string; 
    // avatar?: string; 
    
}
