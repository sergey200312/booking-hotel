import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../store/store'

export const PrivateRouter: FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
