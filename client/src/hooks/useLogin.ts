import { useMutation } from "react-query"
import { useDispatch } from "react-redux"
import { loginUser} from "../api/auth"
import { login } from '../store/features/authSlice'

export const useLogin = () => {
    const dispatch = useDispatch()

    return useMutation(
        async (formData: { email: string, password: string }) => {
            const data = await loginUser(formData)
            console.log(data)
            return data
        },
        {
            onSuccess: (data) => {
                dispatch(login({ token: data.token }))
                console.log(data)
            },
            onError: (error) => {
                console.error('Ошибка: ', error)
            }
        }
     )
}