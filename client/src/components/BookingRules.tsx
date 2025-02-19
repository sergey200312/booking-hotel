import React from 'react'

export const BookingRules: React.FC = () => {
    return (
        <div className='flex flex-col-2 gap-4'>
            <div>
                <h1 className='text-xl font-semibold mb-4'>Правила</h1>
                <p className='text-sm font-sans text-gray-600'>
                    Нельзя с питомцами.
                    Без вечеринок и мероприятий
                    Время прибытия - после 13:00, а выезд до 12:00
                </p>
            </div>
            <div>
                <h1 className='text-xl font-semibold mb-4'>Отмена</h1>
                <p className='text-sm font-sans text-gray-600'>
                    Бесплатная отмена в течение 48 ч. После
                    этого при отмене не позднее чем за 5 дн. до
                    прибытия вы получите полный возврат за вычетом сбора за услуги.
                </p>
            </div>
        </div>
    )
}
