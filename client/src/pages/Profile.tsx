import { FC } from 'react'
import { ProfileLayout } from '../components/ProfileLayout'
import { ProfileCard } from '../components/ProfileCard'

export const Profile: FC = () => {
    return (
        <ProfileLayout>
            <div className='w-4/5 px-12 py-6'>
                <ProfileCard />
            </div>
        </ProfileLayout>
    )
}
