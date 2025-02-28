import { FC } from 'react'
import { Link } from 'react-router-dom'

export const ProfileSidebarMenu: FC = () => {
  return (
    <div>
      <nav>
        <ul className='flex flex-col gap-2'>
          <Link to='/profile'><li>Мой профиль</li></Link>
          <Link to='/my-bookings'><li>Мои бронирования</li></Link>
          <Link to='/favorite-rooms'><li>Понравилось</li></Link>
        </ul>
      </nav>
    </div>
  )
}
