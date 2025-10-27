import React from 'react'
import { StudentSidebar } from '../../../components/for_a_student/student_sidebar/StudentSidebar'
import { StudentTimetable } from '../../../components/for_a_student/student_timetable/StudentTimetable'

export const Student_Timetable_Page = () => {
  return (
    <div className='student_timetable_page'>
        <StudentSidebar />
        <StudentTimetable />
    </div>
  )
}
