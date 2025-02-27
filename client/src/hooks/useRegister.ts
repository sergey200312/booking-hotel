import { useMutation } from "react-query"
import { IRegisterFormData } from "../types/types"
import { register } from "../api/auth"

export const useRegister = () => {


      return useMutation(async (formData: IRegisterFormData) => {
        const data = await register(formData); 
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