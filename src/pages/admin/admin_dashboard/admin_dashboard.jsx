import React from 'react'
import { LeftSideBar } from '../../../components/for_an_admin/leftSideBar/LeftSideBar'
import { Dashboard } from '../../../components/for_an_admin/dashboard_page/dashboard'

export const Admin_dashboard = () => {
  return (
    <div className='admin_dashboard'>
        <LeftSideBar/>
        <Dashboard/>
    </div>
  )
}
