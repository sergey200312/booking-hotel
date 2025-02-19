import { FC, useState } from 'react'
import { RoomItem } from './RoomItem'
import { BookingInfoTable } from './BookingInfoTable'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { ReviewModal } from './ReviewModal'

interface IRoom {
  _id: string
  number: number,
  price: number,
  images: string[]
}

interface IBooking {
  room: IRoom
  startDate: Date
  endDate: Date
  totalPrice: number
}

interface IBookings {
  bookings: IBooking[]
}

export interface IFormData {
  rating: number | null
  content: string
}

export const MyBookingCard: FC<IBookings> = ({ bookings }) => {
  const [openIsModal, setIsOpenModal] = useState(false)
  const [formData, setFormData] = useState<IFormData>({
    rating: null,
    content: ''
  })

  const handleOpenModal = () => {
    setIsOpenModal(prev => !prev)
  }

  const handleChangeReview = (data: { rating: number | null, content: string }) => {
    setFormData(data)
  }

  return (
    <div className='p-4 flex flex-col gap-8 pb-6'>
      {bookings && bookings.length > 0 ?
        (bookings.map(booking => (
          <>
            <div className='grid p-4 grid-cols-3 gap-3 shadow-md '>
              <div className='col-span-2'>
                <BookingInfoTable booking={booking} />
                <div className='p-4 flex gap-2'>
                  <Button variant='outlined' style={{ fontSize: '14px' }} onClick={handleOpenModal}>Написать отзыв</Button>
                  <Link to={`/room/${booking.room._id}`}>
                    <Button variant='contained' style={{ backgroundColor: 'purple' }}>Перейти к странице номера</Button>
                  </Link>
                </div>
              </div>
              <div className='col-span-1'>
                <RoomItem key={booking.room._id} roomId = {booking.room._id} number={booking.room.number} price={booking.room.price} images={booking.room.images} />
              </div>
              {openIsModal && <ReviewModal
                handleOpenModal={handleOpenModal}
                handleChangeReview={handleChangeReview}
                roomId={booking.room._id}
                formData={formData} />}
            </div>
          </>
        ))

        ) :
        (<div>Номера не найдены</div>)}
    </div>
  )
}
