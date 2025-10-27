import React from 'react';
import { TeacherSidebar } from '../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { TeacherClasses } from '../../components/for_a_teacher/teacher_classes/TeacherClasses';

export const Teacher_Classes_Page = () => {
  return (
    <div className='teacher_classes_page'>
      <TeacherSidebar />
      <TeacherClasses />
    </div>
  );
};
