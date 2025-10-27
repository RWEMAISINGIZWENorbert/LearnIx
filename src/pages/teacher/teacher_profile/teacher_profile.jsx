import React from 'react';
import { TeacherSidebar } from '../../../components/for_a_teacher/teacher_sidebar/TeacherSidebar';
import { TeacherProfile } from '../../../components/for_a_teacher/teacher_profile/TeacherProfile';

export const Teacher_profile = () => {
  return (
    <div className='teacher_profile'>
      <TeacherSidebar />
      <TeacherProfile />
    </div>
  );
};
