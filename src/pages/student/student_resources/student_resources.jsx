import React from 'react'
import { StudentSidebar } from '../../../components/for_a_student/student_sidebar/StudentSidebar'
import { StudentResources } from '../../../components/for_a_student/student_resources/StudentResources'

export const Student_Resources_Page = () => {
  return (
    <div className='student_resources_page'>
        <StudentSidebar />
        <StudentResources />
    </div>
  )
}
