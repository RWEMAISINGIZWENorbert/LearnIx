import React from 'react';
import { TeacherSidebar } from '../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { TeacherAnnouncements } from '../../components/for_a_teacher/teacher_announcements/TeacherAnnouncements';

export const Teacher_Announcements_Page = () => {
  return (
    <div className='teacher_announcements_page'>
      <TeacherSidebar />
      <TeacherAnnouncements />
    </div>
  );
};
