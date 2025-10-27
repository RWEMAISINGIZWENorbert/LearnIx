import React from 'react'
import './Developers.css'
import { Navbar } from '../../../components/public_components/navbar/navbar'
import { DevTeam } from '../../../components/public_components/dev_team/DevTeam'

export const Developers = () => {
  return (
    <div className='Developers'>
        <Navbar />
        <DevTeam />
    </div>
  )
}
