import { TextField } from '@mui/material'
import React, { FC, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { IFormData } from './MyBookingCard';
import { useReview } from '../hooks/useReview';

interface ReviewModalProps {
    handleOpenModal: () => void
    handleChangeReview: (data: { rating: number | null; content: string }) => void;
    roomId: string
    formData: IFormData
}

export const ReviewModal: FC<ReviewModalProps> = ({ handleOpenModal, handleChangeReview, roomId, formData }) => {

    const { mutate: createReview, isLoading } = useReview()

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleOpenModal()
        }
    }

    const handleChangeRating = (rating: number) => {
        handleChangeReview({ ...formData, rating })
    }

    const handleChangeTextReview = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeReview({ ...formData, content: e.target.value })
    }

    const handleCreateReview = (e: React.FormEvent) => {
        e.preventDefault()
        createReview({ roomId, formData })
        handleOpenModal()
    }

    return (
        <div className='inset-0 fixed flex justify-center items-center bg-opacity-50 bg-black'
            onClick={handleBackdropClick}>
            <div className='bg-white p-6 w-96 gap-2 rounded-md '>
                <div className='flex justify-start items-center'>
                    {[1, 2, 3, 4, 5].map(star => (
                        <CiStar className={`cursor-pointer transition-colors duration-300 ${star > (formData.rating ?? 0) ? "text-gray-950" : "text-yellow-400"}`}
                            size={32}
                            onClick={() => handleChangeRating(star)} />
                    )
                    )}
                </div>
                <TextField
                    label='Отзыв'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    multiline
                    rows={5}
                    value={formData.content}
                    onChange={handleChangeTextReview}
                />
                <div className='mt-2 flex justify-end'>
                    <button onClick={handleCreateReview} disabled={isLoading}>
                        <IoIosSend
                            size={32}
                            className='cursor-pointer transition-transform duration-300 hover:scale-110'
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
