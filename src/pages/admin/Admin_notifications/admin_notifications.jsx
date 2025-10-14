import React from 'react'
import { LeftSideBar } from '../../../components/leftSideBar/LeftSideBar'
import { Notifications } from '../../../components/notifications/Notifications'

export const Admin_notifications = () => {
  return (
    <div className='admin_notifications'>
        <LeftSideBar/>
        <Notifications/>
    </div>
  )
}
