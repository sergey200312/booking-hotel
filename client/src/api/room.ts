import { axiosInstance } from "./axiosInstance"

export const getAllRooms = async (
    page?: number,
    limit?: number,
    sort?: string,
    minPrice?: number,
    maxPrice?: number,
    filters?: string[],
    startDate?: Date,
    endDate?: Date
  ) => {
    const params: Record<string, any> = {
      page,
      limit,
      sort: sort?.trim(),
      minPrice,
      maxPrice,
      filters: filters?.length ? filters.join(",") : undefined,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
    };
  
    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) delete params[key];
    });
  
    const response = await axiosInstance.get("/room", { params });
  
    return response.data;
  };

export const getDetailRoom = async (id: string) => {
    const { data } = await axiosInstance.get(`/room/${id}`)

    return data;
}

export const createBooking = async (roomId: string, dataBooking: any) => {
    const { data } = await axiosInstance.post(`/booking/${roomId}`, dataBooking )

    return data;
}