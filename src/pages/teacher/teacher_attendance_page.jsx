import React from 'react';
import { TeacherSidebar } from '../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { TeacherAttendance } from '../../components/for_a_teacher/teacher_attendance/TeacherAttendance';

export const Teacher_Attendance_Page = () => {
  return (
    <div className='teacher_attendance_page'>
      <TeacherSidebar />
      <TeacherAttendance />
    </div>
  );
};
