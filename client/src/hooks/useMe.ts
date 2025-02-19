import { useMutation } from "react-query"
import { getProfile } from '../api/auth'

export const useMe = () => {

    return useMutation(
        async () => {
            const data = await getProfile();
            return data
        },
        {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                console.error(error)
            }
        }
    )
}