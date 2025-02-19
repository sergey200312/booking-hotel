import { FC, useState } from 'react';
import { FilterCheckBox } from './FilterCheckBox';
import { amenities, conditions, accessibility } from '../constants/optionsData'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setAmenities } from '../store/features/filterSlice';
interface ISectionProps {
  title: string
  options: string[]
}

const Section: FC<ISectionProps> = ({ title, options }) => {


  const selectedOptions = useSelector((state: RootState) => state.filter.amenities)
  const dispatch = useDispatch()


  const handleFilterCheckBoxChange = (label: string, checked: boolean) => {
    dispatch(setAmenities(
      checked ? [...selectedOptions, label] 
      : selectedOptions.filter(option => option !== label)
    ))
  }

  
  return (
    <div className='flex flex-col mt-2'>
      <p className='mb-1 text-lg font-bold'>{title}</p>
      {options.map((option, index) => (
        <FilterCheckBox key={index} label={option} checked={selectedOptions.includes(option)} onChange={handleFilterCheckBoxChange}/>
      ))}
    </div>
  );
};

export const OptionsSelector: React.FC = () => {

  return (
    <div className='flex flex-col items-start gap-2'>
      <Section title="Удобства" options={amenities} />
      <Section title="Условия размещения" options={conditions} />
      <Section title="Доступность" options={accessibility} />
    </div>
  );
};
