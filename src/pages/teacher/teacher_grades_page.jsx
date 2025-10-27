import React from 'react';
import { TeacherSidebar } from '../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { TeacherGrades } from '../../components/for_a_teacher/teacher_grades/TeacherGrades';

export const Teacher_Grades_Page = () => {
  return (
    <div className='teacher_grades_page'>
      <TeacherSidebar />
      <TeacherGrades />
    </div>
  );
};
