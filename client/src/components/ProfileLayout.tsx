import { FC } from 'react'
import { Layout } from './Layout'
import { ProfileSidebarMenu } from './ProfileSidebarMenu'

interface ProfileLayoutProps {
    children: React.ReactNode;
}


export const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
    return (
        <Layout>
            <div className='flex w-full h-dvh bg-white'>
                <div className='w-1/5 p-6 h-full border-r border-s-gray-900'>
                    <ProfileSidebarMenu />
                </div>
                {children}
            </div>
        </Layout>
    )
}
