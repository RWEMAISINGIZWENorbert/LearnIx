import React from 'react'
import { StudentSidebar } from '../../../components/for_a_student/student_sidebar/StudentSidebar'
import { StudentAttendance } from '../../../components/for_a_student/student_attendance/StudentAttendance'

export const Student_Attendance_Page = () => {
  return (
    <div className='student_attendance_page'>
        <StudentSidebar />
        <StudentAttendance />
    </div>
  )
}
