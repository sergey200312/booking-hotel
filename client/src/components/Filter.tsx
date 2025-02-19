import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'


export const Filter: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const currentSort = searchParams.get('sort') || 'asc'

    const handleSortChange = (e: any) => {
        const { value } = e.target

        searchParams.set('sort', value)
        setSearchParams(searchParams)
    }


    return (
        <div className='grid grid-cols-10 gap-2'>
            <div className='col-span-3'>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Сортировать</InputLabel>
                    <Select
                        value={currentSort}
                        onChange={handleSortChange}
                        label="Сортировать"
                    >
                        <MenuItem value="asc">по возрастанию</MenuItem>
                        <MenuItem value="desc">по убыванию</MenuItem>
                    </Select>
                </FormControl>
            </div>
            
        </div>
    )
}
