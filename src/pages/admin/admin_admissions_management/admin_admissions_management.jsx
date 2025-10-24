import React from 'react'
import { LeftSideBar } from '../../../components/for_an_admin/leftSideBar/LeftSideBar'
import { Aadmissions } from '../../../components/for_an_admin/admissions/admissions'

export const Admin_admissions_management = () => {
  return (
    <div className='admin_admissions_management'>
        <LeftSideBar/>
        <Aadmissions/>
    </div>
  )
}
