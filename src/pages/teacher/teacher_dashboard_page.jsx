import React from 'react';
import { TeacherSidebar } from '../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { TeacherDashboard } from '../../components/for_a_teacher/teacher_dashboard/TeacherDashboard';

export const Teacher_Dashboard_Page = () => {
  return (
    <div className='teacher_dashboard_page'>
      <TeacherSidebar />
      <TeacherDashboard />
    </div>
  );
};
