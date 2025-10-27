import React from 'react'
import { StudentSidebar } from '../../../components/for_a_student/student_sidebar/StudentSidebar'
import { StudentAnnouncements } from '../../../components/for_a_student/student_announcements/StudentAnnouncements'

export const Student_Announcements_Page = () => {
  return (
    <div className='student_announcements_page'>
        <StudentSidebar />
        <StudentAnnouncements />
    </div>
  )
}
