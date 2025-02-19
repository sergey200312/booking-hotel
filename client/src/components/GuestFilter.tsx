
import React from 'react';
import { GuestSection } from './GuestSection';


export const GuestFilter: React.FC = () => {
  return (
    <div className='w-full'>
      <h1 className='mb-3 text-lg font-bold'>Гость</h1>
      <GuestSection />
    </div>
  );
};
