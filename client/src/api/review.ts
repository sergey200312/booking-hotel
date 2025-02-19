import axios from "axios"
import { IFormData } from "../components/MyBookingCard"
import { axiosInstance } from "./axiosInstance"

export const getReviews = async (roomId: string) => {
    const { data } = await axios.get(`http://localhost:3000/api/review/${roomId}`)

    return data
}

export const createReview = async (roomId: string, formData: IFormData) => {
    const { data } = await axiosInstance.post(`/review/${roomId}`, formData)

    return data
}

export const getReviewInfo = async (roomId: string) => {
    const { data } = await axiosInstance.get(`review/${roomId}/reviewCount`)

    return data
}