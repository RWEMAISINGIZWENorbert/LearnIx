import React from 'react'
import { LeftSideBar } from '../../../components/leftSideBar/LeftSideBar'
import { Teachers_management } from '../../../components/teachers_management/teachers_management'

export const Admin_teachers_management = () => {
  return (
    <div className='admin_teachers_management'>
        <LeftSideBar/>
        <Teachers_management/>
    </div>
  )
}
