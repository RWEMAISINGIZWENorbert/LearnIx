import React from 'react';
import { TeacherSidebar } from '../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { TeacherSchedule } from '../../components/for_a_teacher/teacher_schedule/TeacherSchedule';

export const Teacher_Schedule_Page = () => {
  return (
    <div className='teacher_schedule_page'>
      <TeacherSidebar />
      <TeacherSchedule />
    </div>
  );
};
