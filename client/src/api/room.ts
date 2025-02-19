import { axiosInstance } from "./axiosInstance"

export const getAllRooms = async (page?: number, limit?: number, sort?: string, minPrice?: number, 
    maxPrice?: number, filters?: string[], startDate?: Date, endDate?: Date) => {
    const response = await axiosInstance.get(`/room?page=${page}&limit=${limit}&sort=${sort}
        &minPrice=${minPrice}&maxPrice=${maxPrice}&filters=${filters?.join(',')} 
        &startDate=${startDate}&endDate=${endDate}`) 

    return response.data
}

export const getDetailRoom = async (id: string) => {
    const { data } = await axiosInstance.get(`/room/${id}`)

    return data;
}

export const createBooking = async (roomId: string, dataBooking: any) => {
    const { data } = await axiosInstance.post(`/booking/${roomId}`, dataBooking )

    return data;
}