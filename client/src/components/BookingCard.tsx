import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { FC, FormEvent, useEffect, useState } from 'react';
import { GuestSection } from './GuestSection';
import Button from '@mui/material/Button';
import { calculateBookingCost } from '../service/room/calculateBookingCoast';
import { useBooking } from '../hooks/useBooking';
import { getOccupiedDates } from '../api/booking';
import { useQuery } from 'react-query';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface IProps {
    number: number
    type: string
    price: number
    roomId: string
}

export const BookingCard: FC<IProps> = ({ number, type, price, roomId }) => {
    const [checkInDate, setCheckInDate] = useState<Dayjs | null>(dayjs('2024-05-20'));
    const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(dayjs('2024-05-25'));
    const [cost, setCost] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [days, setDays] = useState<number | null>(null)
    const [total, setTotal] = useState<number>(0)
    const { mutate: booking, isLoading } = useBooking()
    const isAuth = useAuth()
    const navigate = useNavigate()

    const { data: occupiedDates = [], isLoading: loading } = useQuery(['occupiedDates', roomId], () => getOccupiedDates(roomId))

    useEffect(() => {
        if (checkInDate && checkOutDate) {
            try {
                setError(null)
                const { total, days } = calculateBookingCost(checkInDate.format('YYYY-MM-DD'), checkOutDate.format('YYYY-MM-DD'), price)
                setCost(cost)
                setDays(days)
                setTotal(total)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                }
            }
        }
    }, [checkInDate, checkOutDate, price])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        isAuth ? booking({ roomId, dataBooking: { checkInDate, checkOutDate }}): navigate('/login')
        
    }

    return (
        <div className="w-ful max-w-md mx-auto p-4 ">
            <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold">
                    № {number} <span className="font-normal text-purple-500">{type.toLowerCase()}</span>
                </p>
                <p className="text-slate-500 text-sm">{price}₽ в сутки</p>
            </div>
            <div className="flex flex-col gap-4 mb-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                        <DatePicker
                            className="w-full sm:w-1/2"
                            label="Дата прибытия"
                            value={checkInDate}
                            onChange={value => setCheckInDate(value)}
                            shouldDisableDate={(date) => occupiedDates.includes(date.format('YYYY-MM-DD'))}
                            disabled={loading}
                            minDate={dayjs()}
                        />
                        <DatePicker
                            className="w-full sm:w-1/2"
                            label="Дата выезда"
                            value={checkOutDate}
                            onChange={(value) => setCheckOutDate(value)}
                            shouldDisableDate={(date) => occupiedDates.includes(date.format('YYYY-MM-DD'))}
                            disabled={loading}
                            minDate={dayjs()}
                            
                        />
                    </div>
                </LocalizationProvider>
                {error && <p className='text-red-700'>{error}</p>}
            </div>
            <p className='font-bold text-sm mb-2'>1 гость</p>
            <div className='border-b border-gray-500 mb-3'></div>
            <GuestSection />
            <div className='flex flex-col gap-4 mt-4 mb-4'>
                <div className='flex justify-between items-center'>
                    <p>{price}₽ x {days} суток</p>
                    <p>{total}₽</p>
                </div>
            </div>
            <div className='flex justify-between mb-4'>
                <p className='text-xl font-bold'>Итого</p>
                <p className='text-xl font-bold'>{total}₽</p>
            </div>
            <div>
                <Button variant='contained' disabled={isLoading} onClick ={handleSubmit} className='w-full'>Забронировать</Button>
            </div>
        </div>
    );
};
