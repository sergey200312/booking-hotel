import { useMutation } from "react-query"
import { useDispatch } from "react-redux"
import { loginUser } from "../api/auth"
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
                localStorage.setItem('firstName', data.firstName)
                localStorage.setItem('lastName', data.lastName)
            },
            onError: (error) => {
                console.error('Ошибка: ', error)
            }
        }
    )
}