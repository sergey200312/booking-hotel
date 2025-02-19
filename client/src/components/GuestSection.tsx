import React, { useState } from 'react'
import { CountButton } from './CountButton'
import { useDispatch, useSelector } from 'react-redux'
import { setGuestCount } from '../store/features/filterSlice'
import { RootState } from '../store/store'


interface IGuest {
  type: 'adults' | 'children' | 'infants'
  delta: number
}

export const GuestSection:React.FC = () => {
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const dispatch = useDispatch();
  const guest = useSelector((state: RootState) => state.filter.guestCount)

  const handleChange = ({ type, delta }: IGuest) => {
    switch(type) {
      case 'adults':
        setAdults((prev) => Math.min(4, Math.max(0, prev + delta)))
        dispatch(setGuestCount({type: 'adults', value: adults}))
        break
      case 'children':
        setChildren((prev) => Math.min(4, Math.max(0, prev + delta)))
        dispatch(setGuestCount({type: 'children', value: children}))
        break
      case 'infants': 
        setInfants((prev) => Math.min(4, Math.max(0, prev + delta)))
        dispatch(setGuestCount({type: 'infants', value: infants}))
        break
    }
  }
  
  return (
    <div className='flex flex-col'>
            <ul>
              <li>
                <div className='flex items-center justify-between mb-4 gap-3'>
                  <p className='min-w-[80px] text-left'>Взрослые</p>
                  <div className='flex items-center gap-2'>
                    <CountButton label = "-" onClick={() => handleChange({ type: 'adults', delta: -1 })}/>
                    <p>{guest.adults}</p>
                    <CountButton label = "+" onClick={() => handleChange({ type: 'adults', delta: +1})}/>
                  </div>
                </div>
              </li>
              <li>
                <div className='flex items-center justify-between mb-4 gap-3'>
                  <p className='min-w-[80px] text-left'>Дети</p>
                  <div className='flex items-center gap-2'>
                  <CountButton label = "-" onClick={() => handleChange({ type: 'children', delta: -1 })}/>
                    <p>{guest.children}</p>
                    <CountButton label = "+" onClick={() => handleChange({ type: 'children', delta: +1 })}/>
                  </div>
                </div>
              </li>
              <li>
                <div className='flex items-center justify-between  mb-4 gap-3'>
                  <p className='min-w-[80px] text-left'>Младенцы</p>
                  <div className='flex items-center gap-2'>
                  <CountButton label = "-" onClick={() => handleChange({ type: 'infants', delta: -1 })}/>
                    <p>{guest.infants}</p>
                    <CountButton label = "+" onClick={() => handleChange({ type: 'infants', delta: +1 })}/>
                  </div>
                </div>
              </li>
            </ul>
          </div>
  )
}
