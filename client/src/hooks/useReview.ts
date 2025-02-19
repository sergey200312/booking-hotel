import { useMutation } from "react-query"
import { IFormData } from "../components/MyBookingCard"
import { createReview } from "../api/review"

export const useReview = () => {

    return useMutation(async ({ roomId, formData }: { roomId: string; formData: IFormData }) => {
        console.log(roomId, formData)
        const data = await createReview(roomId, formData)
        return data
    },
        {
            onSuccess: (data) => {
                console.log('Отзыв создан: ', data)
            },
            onError: (err) => {
                console.error('Ошибка при создании отзыва: ', err)
            }
        })
}