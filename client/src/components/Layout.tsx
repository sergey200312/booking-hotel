import React from 'react'
import { Header } from './Header'

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> =({ children }) => {
  return (
    <>
    <Header/>
    <hr/>
    <div className=''>
        {children}
    </div>
    </>
  )
}
