import React from 'react'
import { StudentSidebar } from '../../../components/for_a_student/student_sidebar/StudentSidebar'
import { StudentCourses } from '../../../components/for_a_student/student_courses/StudentCourses'

export const Student_Courses_Page = () => {
  return (
    <div className='student_courses_page'>
        <StudentSidebar />
        <StudentCourses />
    </div>
  )
}
