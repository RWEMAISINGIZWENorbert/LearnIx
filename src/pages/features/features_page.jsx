import React from 'react'
import { Navbar } from '../../components/navbar/navbar'
import { Features_component } from '../../components/Features/features'

export const Features = () => {
  return (
    <div className='features'>
        <Navbar/>
        <Features_component/>
    </div>
  )
}
