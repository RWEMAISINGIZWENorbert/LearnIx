import React from 'react';
import { LeftSideBar } from '../../../components/for_an_admin/leftSideBar/LeftSideBar'
import { Students_management } from '../../../components/for_an_admin/students_management/students_management';


export const Admin_student_management = () => {
  return (
    <div className='admin_student_management'>
        <LeftSideBar/>
        <Students_management/>
    </div>
  )
}
