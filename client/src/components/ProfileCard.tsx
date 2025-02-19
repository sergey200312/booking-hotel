import { FC } from 'react'
import { getProfile } from '../api/auth'
import { useQuery } from 'react-query'

export const ProfileCard: FC = () => {
    const { data, isLoading, isError } = useQuery(['profile'], getProfile)
    console.log(data)
    const currentUser = data?.currentUser

    if (isLoading) return <div>Загрузка...</div>
    return (
        <div>
            <p className='font-bold text-xl'>Страница пользователя {currentUser.firstName} {currentUser.lastName}</p>

            <div className='mt-12 w-3/5 p-4 shadow-md'>
                <ul className='flex flex-col gap-2'>
                    <li>Имя: {currentUser.firstName} </li>
                    <li>Фамилия: {currentUser.lastName} </li>
                    <li>Пол: {currentUser.gender} </li>
                </ul>
            </div >
        </div>
    )
}
