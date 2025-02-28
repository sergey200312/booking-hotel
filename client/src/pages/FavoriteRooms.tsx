import { FC } from 'react'
import { ProfileLayout } from '../components/ProfileLayout'
import { FavoriteRoomsList } from '../components/FavoriteRoomsList'

export const FavoriteRooms: FC = () => {
    return (
        <ProfileLayout>
            <div className='px-12 py-6'>
                <p className='text-xl font-bold'>Понравившиеся номера</p>
                <div className='flex flex-col gap-4 w-[700px]'>
                    <FavoriteRoomsList />
                </div>
            </div>
        </ProfileLayout >
    )
}
