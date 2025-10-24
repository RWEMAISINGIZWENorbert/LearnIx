import React from 'react'
import { LeftSideBar } from '../../../components/for_an_admin/leftSideBar/LeftSideBar'
import { Settings } from '../../../components/for_an_admin/settings_page/settings'

export const Admin_settings = () => {
  return (
    <div className='admin_settings'>
        <LeftSideBar/>
        <Settings/>
    </div>
  )
}
