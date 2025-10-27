import React from 'react'
import { StudentSidebar } from '../../../components/for_a_student/student_sidebar/StudentSidebar'
import { StudentAssignments } from '../../../components/for_a_student/student_assignments/StudentAssignments'

export const Student_Assignments_Page = () => {
  return (
    <div className='student_assignments_page'>
        <StudentSidebar />
        <StudentAssignments />
    </div>
  )
}
