import React from 'react'
import { StudentSidebar } from '../../../components/for_a_student/student_sidebar/StudentSidebar'
import { StudentNotifications } from '../../../components/for_a_student/student_notifications/StudentNotifications'

export const Student_Notifications_Page = () => {
  return (
    <div className='student_notifications_page'>
        <StudentSidebar />
        <StudentNotifications />
    </div>
  )
}
