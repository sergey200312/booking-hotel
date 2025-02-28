import { useMutation, useQueryClient } from "react-query"
import { toggleFavoriteRoom } from "../api/favorite-rooms"

export const useFavoriteRoom = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async(roomId: string) => {
            const response = await toggleFavoriteRoom(roomId)
            return response
        },
        {
            onSuccess: (data) => {
                console.log(data.message)
                queryClient.invalidateQueries('favorite-rooms')
            },
            onError: (error) => {
                console.error('Произошла ошибка: ', error)
            }
        }

    )
}