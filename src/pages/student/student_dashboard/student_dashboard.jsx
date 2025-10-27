import React from 'react'
import { StudentSidebar } from '../../../components/for_a_student/student_sidebar/StudentSidebar'
import { StudentDashboard } from '../../../components/for_a_student/student_dashboard/StudentDashboard'

export const Student_Dashboard_Page = () => {
  return (
    <div className='student_dashboard_page'>
        <StudentSidebar />
        <StudentDashboard />
    </div>
  )
}
