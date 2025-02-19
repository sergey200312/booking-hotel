
import React from 'react'
import { DateSelection } from './DateSelection'
import { GuestFilter } from './GuestFilter'
import { PriceRange } from './PriceRange'
import { OptionsSelector } from './OptionsSelector'

export const FilterPanel: React.FC = () => {
  return (
    <>
      <div className='flex flex-col space-y-6 w-full min-w-[150px]'>
        <DateSelection />
        <GuestFilter/>
        <PriceRange />
        <OptionsSelector />
      </div>
    </>
  )
}
