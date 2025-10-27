import React from 'react'
import { StudentSidebar } from '../../../components/for_a_student/student_sidebar/StudentSidebar'
import { StudentGrades } from '../../../components/for_a_student/student_grades/StudentGrades'

export const Student_Grades_Page = () => {
  return (
    <div className='student_grades_page'>
        <StudentSidebar />
        <StudentGrades />
    </div>
  )
}
