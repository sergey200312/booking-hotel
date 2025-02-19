import { useMutation } from "react-query"
import { IRegisterFormData } from "../types/types"
import { register } from "../api/auth"
import dayjs, { Dayjs } from "dayjs";

export const useRegister = () => {

    const transformFormData = (formData: IRegisterFormData) => {
        return {
          ...formData,
          dateOfBirth:
            dayjs.isDayjs(formData.dateOfBirth) 
              ? (formData.dateOfBirth as Dayjs).toDate() 
              : new Date(formData.dateOfBirth), 
        };
      };
      
      return useMutation(async (formData: IRegisterFormData) => {
        const newFormData = transformFormData(formData);
        const data = await register(newFormData); 
        return data;
      },
      {
        onSuccess: (data) => {
            console.log(data, 'Регистрация прошла успешно')
        },
        onError: (error) => {
            console.error(error)
        }
      }
    );
}