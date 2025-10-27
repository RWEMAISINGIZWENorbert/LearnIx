import React from 'react';
import { TeacherSidebar } from '../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { TeacherStudents } from '../../components/for_a_teacher/teacher_students/TeacherStudents';

export const Teacher_Students_Page = () => {
  return (
    <div className='teacher_students_page'>
      <TeacherSidebar />
      <TeacherStudents />
    </div>
  );
};
