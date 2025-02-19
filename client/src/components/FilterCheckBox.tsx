import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { setOption } from '../store/features/filterSlice'
import { RootState } from '../store/store'

interface IFilterCheckBox {
  label: string
  checked: boolean
  onChange: (label: string, checked: boolean) => void
}

export const FilterCheckBox: React.FC<IFilterCheckBox> = ({ label, checked, onChange }) =>  {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    onChange(label, checked)
  }
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={label}
    />
  )
}
