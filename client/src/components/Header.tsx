import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/getFromLocalStorage';
import { useDispatch } from 'react-redux';
import { logout } from '../store/features/authSlice';

export const Header: React.FC = () => {
    const isAuth = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div>
            <header className='p-5'>
                <div className='flex items-center'>
                    <Link to='/'><h1 className='text-2xl'>Logo</h1></Link>
                    <nav className='pl-56'>
                        <ul className='flex space-x-2'>
                            <li><Link to='/test' />Доступные номера</li>
                            <li><Link to='/test' />Услуги</li>
                            <li><Link to='/test' />Вакансии</li>
                            <li><Link to='/test' />Новости</li>
                            <li><Link to='/test' />Соглашения</li>
                        </ul>
                    </nav>
                    <div className='flex justify-center items-center gap-6 pl-[460px] '>
                        {isAuth ? (
                            <>
                                <div className='flex items-center gap-10'>
                                    <Link to='/profile' className='flex items-center'>
                                        <FaUserAlt size={30} />
                                        <div className='ml-2'>
                                            <p className='font-medium text-xl'>{getFromLocalStorage('firstName')} {getFromLocalStorage('lastName')}</p>
                                        </div>
                                    </Link>
                                    <div>
                                        <Button onClick={() => dispatch(logout())} variant='outlined'>Выйти</Button>
                                    </div>
                                </div>


                            </>) :
                            (<><Button variant='outlined' onClick={() => navigate('/login')}>Войти</Button>
                                <Button variant='contained' onClick={() => navigate('/register')}>Зарегистрироваться</Button></>)
                        }

                    </div>
                </div >
            </header >
        </div >
    )
}