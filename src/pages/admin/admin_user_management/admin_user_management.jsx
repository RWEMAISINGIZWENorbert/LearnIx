import React from 'react'
import { LeftSideBar } from '../../../components/leftSideBar/LeftSideBar'
import { User_management } from '../../../components/user_management/user_management'

export const Admin_user_management = () => {
  return (
    <div className='admin_user_management'>
        <LeftSideBar/>
        <User_management/>
    </div>
  )
}
