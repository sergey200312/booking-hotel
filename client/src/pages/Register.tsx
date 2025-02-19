import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from 'dayjs'
import { useRegister } from '../hooks/useRegister'
import { useNavigate } from 'react-router-dom'

interface IFormData {
   firstName: string
   lastName: string
   gender: string 
   dateOfBirth: Dayjs | null
   email: string
   password: string
}

export const Register: React.FC = () => {

    const [formData, setFormData] = useState<IFormData>({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: null,
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const { mutate: register, isLoading, error } = useRegister();

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        register(formData);
        navigate('/login')

    }

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

    console.log(formData)

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate)
        setFormData(prevState => ({
            ...prevState, 
            dateOfBirth: newDate
        }))
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
                        Регистрация
                    </Typography>
                    <div className='mt-6'>
                        <TextField
                            id="firstName"
                            name="firstName"
                            label="Имя"
                            value={formData.firstName}
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
                            id="lastName"
                            name="lastName"
                            label="Фамилия"
                            value={formData.lastName}
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
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="gender-label"
                                name="gender"
                                row>
                                <FormControlLabel name='gender' value='Male' control={<Radio />} label='Мужчина' onChange={handleChange} />
                                <FormControlLabel name='gender' value='Female' control={<Radio />} label='Женщина' onChange={handleChange} />
                            </RadioGroup>

                        </FormControl>
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Дата рождения" sx={{ width: '100%' }} value={selectedDate} onChange={handleDateChange} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className='mt-2'>
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
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            label="Пароль"
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
                        <Button variant='contained' className='w-full' onClick={handleClick}>Зарегистрироваться</Button>
                    </div>
                    <div className='flex justify-between items-center mt-6'>
                        <p className='text-sm text-gray-500'>Уже есть аккаунт?</p>
                        <Button variant='outlined'>Войти</Button>
                    </div>
                </Box>
            </div>
        </Layout>
    )
}
