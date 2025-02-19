import React, { FC, useRef, useState } from 'react';
import { Slider, Box, Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange } from '../store/features/filterSlice';
import { RootState } from '../store/store';

export const PriceRange: FC = () => {
    const [sliderValue, setSliderValue] = useState<number[]>([0, 15000]);
    const dispatch = useDispatch();
    const sliderRef = useRef<number[]>([0, 15000])

    const { minPrice, maxPrice } = useSelector((state: RootState) => state.filter)

    const handleSliderChange = (_e: Event, newValue: number | number[]) => {
        const [newMinPrice, newMaxPrice] = newValue as number[]
        setSliderValue([newMinPrice, newMaxPrice])
        sliderRef.current = [newMinPrice, newMaxPrice]
    }


    const handleSliderCommit = () => {
        const [newMinPrice, newMaxPrice] = sliderRef.current
        dispatch(setPriceRange({ minPrice: newMinPrice, maxPrice: newMaxPrice }))
    }

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Number(e.target.value)
        if (!isNaN(newMin) && newMin <= 15000 && newMin < maxPrice) {
            dispatch(setPriceRange({ minPrice: newMin, maxPrice }))
        }
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Number(e.target.value)
        if (!isNaN(newMax) && newMax <= 15000 && newMax > minPrice) {
            dispatch(setPriceRange({ minPrice, maxPrice: newMax }))
        }
    }

    return (
        <Box>
            <h2>Диапазон цен</h2>
            <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `₽${value}`}
                value={sliderValue}
                min={0}
                max={15000}
                step={10}
                onChange={handleSliderChange}
                onChangeCommitted={handleSliderCommit}
            />
            <Typography>
            </Typography>
            <div className='pt-2 flex items-center justify-between gap-2'>
                <TextField
                    label="От"
                    variant="outlined"
                    fullWidth
                    type='number'
                    value={minPrice}
                    onChange={handleMinPriceChange}
                />

                <TextField
                    label="До"
                    variant="outlined"
                    fullWidth
                    type='number'
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                />
            </div>
        </Box>
    );
};