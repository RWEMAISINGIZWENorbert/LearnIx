import React from 'react';
import { TeacherSidebar } from '../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { TeacherSettings } from '../../components/for_a_teacher/teacher_settings/TeacherSettings';

export const Teacher_Settings_Page = () => {
  return (
    <div className='teacher_settings_page'>
      <TeacherSidebar />
      <TeacherSettings />
    </div>
  );
};
