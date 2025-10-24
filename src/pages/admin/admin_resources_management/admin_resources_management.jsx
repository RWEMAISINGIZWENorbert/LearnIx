import React from 'react'
import { Resources_management } from '../../../components/for_an_admin/resources_management/resources_management'
import { LeftSideBar } from '../../../components/for_an_admin/leftSideBar/LeftSideBar'

export const Admin_resources_management = () => {
  return (
    <div className='admin_classes_management'>
        <LeftSideBar/>
        <Resources_management/>
    </div>
  )
}
