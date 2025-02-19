import { useMutation } from "react-query"
import { createBooking } from "../api/room"

export const useBooking = () => {

    return useMutation(
        async ({roomId, dataBooking} : { roomId: string, dataBooking: any}) => {
            const response = await createBooking(roomId, dataBooking)
            return response
        },
        {onSuccess:(data) => {
            console.log('Успешно')
        }, onError: (err: any) => {
            console.error(err.response?.data?.message)
        }

        }
    )

}