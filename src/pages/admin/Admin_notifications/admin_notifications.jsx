import React from 'react'
import { LeftSideBar } from '../../../components/for_an_admin/leftSideBar/LeftSideBar'
import { Notifications } from '../../../components/for_an_admin/notifications/Notifications'

export const Admin_notifications = () => {
  return (
    <div className='admin_notifications'>
        <LeftSideBar/>
        <Notifications/>
    </div>
  )
}
