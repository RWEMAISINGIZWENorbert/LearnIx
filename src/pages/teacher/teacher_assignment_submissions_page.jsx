import React from 'react';
import { TeacherSidebar } from '../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { AssignmentSubmissions } from '../../components/for_a_teacher/teacher_assignments/AssignmentSubmissions';

export const Teacher_Assignment_Submissions_Page = () => {
  return (
    <>
      <TeacherSidebar />
      <AssignmentSubmissions />
    </>
  );
};
