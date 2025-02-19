import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingDates } from '../store/features/filterSlice';
import { RootState } from '../store/store';
export const DateSelection: React.FC = () => {

  const dispatch = useDispatch()
  const { checkInDate, checkOutDate } = useSelector((state: RootState) => state.filter)

  const handleStartDateChange = (value: any) => {
    dispatch(setBookingDates({ startDate: value, endDate: checkOutDate}))
  }

  const handleEndDateChange = (value: any) => {
    dispatch(setBookingDates({ startDate: checkInDate, endDate: value}))
  }

  return (
    <div className='w-full min-w-[200px]'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex flex-col gap-4 w-full">
          <DatePicker label="Дата прибытия" value={checkInDate} onChange={handleStartDateChange} />
          <DatePicker label="Дата выезда" value={checkOutDate} onChange={handleEndDateChange}/>
        </div>
      </LocalizationProvider>
    </div>
  );
}