import React from 'react'
import { Navbar } from '../../../components/public_components/navbar/navbar'
import { Landing_page } from '../../../components/public_components/landing_page/landing_page'

export const Home = () => {
  return (
    <>
      <div className='home'>
        <Navbar/>
        <Landing_page/>
      </div>
    </>
  )
}
