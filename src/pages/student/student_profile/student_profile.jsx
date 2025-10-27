import React from 'react';
import { StudentSidebar } from '../../../components/for_a_student/student_sidebar/StudentSidebar';
import { StudentProfile } from '../../../components/for_a_student/student_profile/StudentProfile';

export const Student_profile = () => {
  return (
    <div className='student_profile'>
      <StudentSidebar />
      <StudentProfile />
    </div>
  );
};
