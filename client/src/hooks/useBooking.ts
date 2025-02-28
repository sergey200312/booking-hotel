import { useMutation } from "react-query"
import { createBooking } from "../api/room"
import { notifyError, notifySuccess } from "../utils/toastConfig";

export const useBooking = () => {

  const handleSuccess = () => notifySuccess('Номер успешно забронирован');
  const handleError = () => notifyError('Произошла ошибка при бонировании номера')

    return useMutation(
        async ({roomId, dataBooking} : { roomId: string, dataBooking: any}) => {
            const data = await createBooking(roomId, dataBooking)
            return data
        },
        {onSuccess:(data) => {
            console.log('Успешно')
            handleSuccess()
        }, onError: (err: any) => {
            handleError()
            console.error(err.response?.data?.message)
        }

        }
    )

}