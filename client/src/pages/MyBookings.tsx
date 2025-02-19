import { FC } from 'react'
import { ProfileLayout } from '../components/ProfileLayout'
import { useQuery } from 'react-query'
import { getMyBoogkins } from '../api/booking'
import { MyBookingCard } from '../components/MyBookingCard'

export const MyBookings: FC = () => {
    const { data, isError, isLoading } = useQuery(['myBooking'], getMyBoogkins)
    console.log(data)

    if (isLoading) return <div>Загрузка...</div>
    return (
        <ProfileLayout>
            <div className='px-12 py-6'>
                <p className='text-xl font-bold'>Мои бронирования</p>
                <div className='flex fle-col gap-4 w-[700px]'>
                    <MyBookingCard bookings = {data.myBookings} />
                </div>
                
            </div>
        </ProfileLayout>
    )
}
