import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getAllRooms } from '../api/room'
import { RoomItem } from './RoomItem'
import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { RootState } from '../store/store'
import { CircularProgress } from '@mui/material'
import { RootState } from '../store/store'
import { PaginationRooms } from './Pagination'


export const Rooms: React.FC = () => {
    const [page, setPage] = useState(1)
    const limit = 1
    const [searchParams] = useSearchParams()
    const { minPrice, maxPrice, amenities, checkInDate, checkOutDate } = useSelector((state: RootState) => state.filter)
    const sort = searchParams.get("sort") || "asc"
    console.log(amenities)

    const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
    const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);
    const { data, isLoading } = useQuery(['rooms', page, sort, debouncedMinPrice, debouncedMaxPrice, amenities, checkInDate, checkOutDate], () =>
         getAllRooms(page, limit, sort, debouncedMinPrice, debouncedMaxPrice, amenities, checkInDate ?? undefined, checkOutDate ?? undefined), {
        keepPreviousData: true
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedMinPrice(minPrice);
            setDebouncedMaxPrice(maxPrice);
        }, 500); 

        return () => clearTimeout(timer); 
    }, [minPrice, maxPrice]);

    console.log('render')

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className='mx-auto flex flex-col min-h-screen'>
            <div className='grid grid-cols-3 gap-4 flex-wrap flex-grow'>
                {data.rooms && data.rooms.length > 0 ?
                    (data.rooms.map((room: any) => (
                        <Link to={`/room/${room._id}`} key={room._id}>
                            <RoomItem
                                roomId={room._id}
                                number={room.number}
                                price={room.price}
                                images={room.images}
                            />
                        </Link>
                    ))) : (<div className='flex justify-center items-center '>
                        <p className='text-bold text-2xl '>Номера не найдены</p>
                    </div>)}
            </div>
            <div className='mx-auto'>
                <PaginationRooms data={data} page={page} limit={limit} setPage={setPage} />
            </div>
        </div>
    );
}
