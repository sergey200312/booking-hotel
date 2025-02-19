import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FaUserAlt } from "react-icons/fa";

export const Header: React.FC = () => {
    const isAuth = useAuth()
    return (
        <div>
            <header className='p-5'>
                <div className='flex items-center'>
                    <h1 className='text-2xl'>Logo</h1>
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
                                <div className='flex items-center'>
                                    <Link to='/profile'>
                                        <FaUserAlt className='size-6' />
                                    </Link>
                                </div>


                            </>) :
                            (<><Button variant='outlined'>Войти</Button>
                                <Button variant='contained'>Зарегистрироваться</Button></>)
                        }

                    </div>
                </div >
            </header >
        </div >
    )
}