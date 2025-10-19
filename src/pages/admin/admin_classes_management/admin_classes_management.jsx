import React from 'react'
import { LeftSideBar } from '../../../components/leftSideBar/LeftSideBar'
import { Classes_management } from '../../../components/classes_management/classes_management'

export const Admin_classes_management = () => {
  return (
    <div className='admin_classes_management'>
        <LeftSideBar/>
        <Classes_management/>
    </div>
  )
}
