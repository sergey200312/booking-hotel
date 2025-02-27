import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { useLogin } from '../hooks/useLogin'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface IFormData {
    email: string
    password: string
}

export const Login: React.FC = () => {
    const [formData, setFormData] = useState<IFormData>({
        email: '',
        password: ''
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    })
    
    const { mutate: login, isLoading } = useLogin();

    const navigate = useNavigate();

    const { token, isAuthenticated } = useSelector((state: RootState) => state.auth)
    console.log(token, isAuthenticated)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        login(formData)
        navigate('/')

    }


    return (
        <Layout>
            <div className='flex justify-center items-center min-h-screen'>
                <Box
                    className='w-full max-w-sm bg-white rounded-lg p-6'
                    component='form'
                >
                    <Typography
                        variant='h6'
                        className='text-base'
                    >
                        Войти
                    </Typography>
                    <div className='mt-6'>
                        <TextField
                            id="email"
                            name="email"
                            label="Почта"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            slotProps={{
                                inputLabel: {
                                    required: false,
                                },
                            }}
                            fullWidth
                        />
                    </div>
                    <div className='mt-2'>
                        <TextField
                            id="password"
                            name="password"
                            label="Пароль"
                            type='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            slotProps={{
                                inputLabel: {
                                    required: false,
                                },
                            }}
                            fullWidth
                        />
                    </div>
                    <div className='mt-6'>
                        <Button variant='contained' className='w-full'  disabled={isLoading} onClick={handleSubmit}>Войти</Button>
                    </div>
                    <div className='flex justify-between items-center mt-6'>
                        <p className='text-sm text-gray-500'>Уже есть аккаунт?</p>
                        <Button variant='outlined'>Зарегистрироваться</Button>
                    </div>
                </Box>
            </div>
        </Layout>
    )
}
