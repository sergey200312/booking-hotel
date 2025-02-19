import React from 'react'


interface SectionProps {
    title: string;
    text: string;
};

const Section: React.FC<SectionProps> = ({ title, text }) => {
    return (
        <div className='flex justify-start items-center gap-3 mb-2'>
            <div className='h-7 w-7 rounded-full bg-black'></div>
            <div className=''>
                <h1 className='font-bold'>{title}</h1>
                <p className=''>{text}</p>
            </div>
        </div>
    )
}


export const AmenitiesSection: React.FC = () => {
  return (
    <div>
        <Section title = "Комфорт" text = "Шумопоглощающие стены" />
        <Section title = "Удобство" text = "Окно в каждой из спален" />
        <Section title = "Уют" text = "Номер оснащен камином" />
        
    </div>
  )
}
