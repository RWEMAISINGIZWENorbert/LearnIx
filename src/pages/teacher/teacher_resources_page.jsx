import React from 'react';
import { TeacherSidebar } from '../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { TeacherResources } from '../../components/for_a_teacher/teacher_resources/TeacherResources';

export const Teacher_Resources_Page = () => {
  return (
    <div className='teacher_resources_page'>
      <TeacherSidebar />
      <TeacherResources />
    </div>
  );
};
