import React from 'react';
import Button from '@mui/material/Button';


const buttonStyle = {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    minWidth: '30px',
    minHeight: '30px',
    padding: 0,
  };

interface IProps {
  onClick: () => void
  label: string
}

export const CountButton: React.FC<IProps>= ({ label, onClick }) => (

      <Button variant="contained" sx={buttonStyle} className='rounded-full bg-black' onClick={onClick}>
        { label }
      </Button>
  );