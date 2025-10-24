import React from 'react'
import { Navbar } from '../../../components/public_components/navbar/navbar'
import { Features_component } from '../../../components/public_components/Features/features'

export const Features = () => {
  return (
    <div className='features'>
        <Navbar/>
        <Features_component/>
    </div>
  )
}
