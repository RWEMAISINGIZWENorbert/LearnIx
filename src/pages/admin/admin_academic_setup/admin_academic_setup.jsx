import React from 'react'
import { LeftSideBar } from '../../../components/for_an_admin/leftSideBar/LeftSideBar'
import { Academic_setup } from '../../../components/for_an_admin/academic_setup/academic_setup'

export const Admin_academic_setup = () => {
  return (
    <div className='admin_academic_setup'>
        <LeftSideBar/>
        <Academic_setup/>
    </div>
  )
}
