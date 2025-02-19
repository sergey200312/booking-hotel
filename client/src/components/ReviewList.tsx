import React from 'react'
import { getReviews } from '../api/review';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { formatDateToReviews } from '../utils/formatDate';

interface Review {
    user: { firstName: string, lastName: string }
    content: string
    createdAt: Date
    _id: string
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    return (
        <div className='p-4 w-full'>
            <div className='flex justify-between items-start'>
                <div className='flex flex-col gap-3'>
                    <div>
                        <p className='font-bold'>{review?.user.firstName} {review?.user.lastName}</p>
                        <p className='text-gray-600'>{formatDateToReviews(String(review.createdAt))}</p>
                    </div>
                    <p>{review?.content}</p>
                </div>
            </div>
        </div>
    )
}
export const ReviewList: React.FC = () => {
    const { id } = useParams()
    const { data, isLoading, isError } = useQuery(['reviews'], () => getReviews(String(id)))
    console.log(data)

    if (isLoading) return <div>Загрузка</div>
    return (
        <>
            <p className='text-gray-600'>{data.reviewsCount} отзывов(а)</p>
            {
                data.reviews.map((review: Review) => (
                    <div key={review._id}>
                        <ReviewCard review={review} />
                        <div className="border-b-2 border-e-gray-800"></div>
                    </div>
                ))
            }
        </>
    )
}


