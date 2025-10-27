import React from 'react';
import { TeacherSidebar } from '../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { TeacherAssignments } from '../../components/for_a_teacher/teacher_assignments/TeacherAssignments';

export const Teacher_Assignments_Page = () => {
  return (
    <div className='teacher_assignments_page'>
      <TeacherSidebar />
      <TeacherAssignments />
    </div>
  );
};
