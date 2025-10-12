import React from 'react'
import { LeftSideBar } from '../../../components/leftSideBar/LeftSideBar'
import { Settings } from '../../../components/settings_page/settings'

export const Admin_settings = () => {
  return (
    <div className='admin_settings'>
        <LeftSideBar/>
        <Settings/>
    </div>
  )
}
