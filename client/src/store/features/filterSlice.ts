

import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface IRoom {
    id: string;
    number: number;
    price: number;
    images: string[];
}

export interface IFilterState {
    minPrice: number
    maxPrice: number
    amenities: string[]
    guestCount: Record<string, number>
    checkInDate: Date | null
    checkOutDate: Date | null
}

const initialState: IFilterState = {
    minPrice: 0,
    maxPrice: 15000,
    amenities: [],
    guestCount: {
        'adults': 0,
        'children': 0,
        'infants': 0
    },
    checkInDate: null,
    checkOutDate: null

}

const filterSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        setGuestCount(state, action: PayloadAction<{type: string, value: number}>) {
            const { type, value } = action.payload
            state.guestCount[type] = value
        },
        setPriceRange(state, action: PayloadAction<{minPrice: number, maxPrice: number}>) {
            const { minPrice, maxPrice } = action.payload
            state.minPrice = minPrice
            state.maxPrice = maxPrice
        }, 
        setAmenities(state, action: PayloadAction<string[]>) {
            state.amenities = action.payload
        },
        setBookingDates(state, action: PayloadAction<{startDate: Date | null, endDate: Date | null}>) {
            const { startDate, endDate } = action.payload
            state.checkInDate = startDate
            state.checkOutDate = endDate
        }
    }
})

export const { setGuestCount, setPriceRange, setAmenities, setBookingDates } = filterSlice.actions;
export default filterSlice.reducer;
