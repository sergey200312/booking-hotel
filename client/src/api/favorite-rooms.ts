import { isFavorite } from './favorite-rooms';
import { axiosInstance } from "./axiosInstance"

export const toggleFavoriteRoom = async (roomId: string) => {
    const { data } = await axiosInstance.post('/favorite-rooms', { roomId })

    return data
}

export const getFavoriteRooms = async () => {
    const { data } = await axiosInstance.get('/favorite-rooms')

    return data
}

export const checkFavorite = async (roomId: string) => {
    const { data } = await axiosInstance.get(`/favorite-rooms/${roomId}`)

    return data.isFavorite
}