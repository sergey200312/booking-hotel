import { axiosInstance } from "./axiosInstance"

export const getMyBoogkins = async () => {
    const { data } = await axiosInstance.get('booking')

    return data
}

export const getOccupiedDates = async (roomId: string) => {
    const { data } = await axiosInstance.get(`booking/${roomId}/occupied-dates`)

    return data
}