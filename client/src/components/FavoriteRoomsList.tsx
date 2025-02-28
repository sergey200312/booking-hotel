import { FC } from 'react'
import { getFavoriteRooms } from '../api/favorite-rooms'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { RoomItem } from './RoomItem'

export const FavoriteRoomsList: FC = () => {
  const { data, isLoading } = useQuery(['favorite-rooms'], getFavoriteRooms)

  if (isLoading) {
    return <div className="flex justify-center items-center">Загрузка...</div> 
  }

  return (
    <div className='p-10'>
      <div className='grid grid-cols-2 flex-wrap flex-grow gap-4'>
        {data?.favoriteRooms && data.favoriteRooms.length > 0 ? (
          data.favoriteRooms.map((favoriteRoom: any) => (
            <Link to={`/room/${favoriteRoom.room._id}`} key={favoriteRoom.room._id}>
              <RoomItem
                roomId={favoriteRoom.room._id}
                number={favoriteRoom.room.number}
                price={favoriteRoom.room.price}
                images={favoriteRoom.room.images}
              />
            </Link>
          ))
        ) : (
          <div>Список понравившихся номеров пуст</div>
        )}
      </div>
    </div>
  )
}
