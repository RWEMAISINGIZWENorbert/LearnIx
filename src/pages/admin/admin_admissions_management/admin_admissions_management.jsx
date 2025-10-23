import React from 'react'
import { LeftSideBar } from '../../../components/leftSideBar/LeftSideBar'
import { Aadmissions } from '../../../components/admissions/admissions'

export const Admin_admissions_management = () => {
  return (
    <div className='admin_admissions_management'>
        <LeftSideBar/>
        <Aadmissions/>
    </div>
  )
}
