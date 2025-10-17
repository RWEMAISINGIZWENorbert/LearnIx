import React from 'react';
import { LeftSideBar } from '../../../components/leftSideBar/LeftSideBar'
import { Students_management } from '../../../components/students_management/students_management';


export const Admin_student_management = () => {
  return (
    <div className='admin_student_management'>
        <LeftSideBar/>
        <Students_management/>
    </div>
  )
}
