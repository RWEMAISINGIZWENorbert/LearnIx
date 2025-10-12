import React from 'react'
import { LeftSideBar } from '../../../components/leftSideBar/LeftSideBar'
import { Dashboard } from '../../../components/dashboard_page/dashboard'

export const Admin_dashboard = () => {
  return (
    <div className='admin_dashboard'>
        <LeftSideBar/>
        <Dashboard/>
    </div>
  )
}
