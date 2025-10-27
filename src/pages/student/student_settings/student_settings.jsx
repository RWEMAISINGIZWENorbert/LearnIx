import React from 'react'
import { StudentSidebar } from '../../../components/for_a_student/student_sidebar/StudentSidebar'
import { StudentSettings } from '../../../components/for_a_student/student_settings/StudentSettings'

export const Student_Settings_Page = () => {
  return (
    <div className='student_settings_page'>
        <StudentSidebar />
        <StudentSettings />
    </div>
  )
}
