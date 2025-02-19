import { FC } from 'react'
import { formatDate } from '../utils/formatDate'

interface IBooking {
    startDate: Date,
    endDate: Date,
    totalPrice: number
}

interface IBookingProps{
    booking: IBooking
}

export const BookingInfoTable: FC<IBookingProps> = ({ booking }) => {
  return (
    <table className='border-2 border-collapse border-gray-400 w-full'>
        <tr className='border'>
            <td className='border px-2 font-bold'>Дата прибытия</td>
            <td className='border px-2 text-gray-600'>{formatDate(new Date(booking.startDate))}</td>
        </tr>
        <tr className='border'>
            <td className='border px-2 font-bold'>Дата выезда</td>
            <td className='border px-2 text-gray-600'>{formatDate(new Date(booking.endDate))}</td>
        </tr>
        <tr className='border'>
            <td className='border px-2 font-bold'>Стоимость бронирования</td>
            <td className='border px-2 text-gray-600'>{booking.totalPrice}₽</td>
        </tr>
    </table>
  )
}
