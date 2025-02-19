import { Dayjs } from "dayjs"

export interface IRegisterFormData {
    firstName: string
    lastName: string
    gender: string
    dateOfBirth: Dayjs | Date | string | null
    email: string
    password: string
}