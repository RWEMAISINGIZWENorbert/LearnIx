import React from 'react';
import { LeftSideBar } from '../../../components/for_an_admin/leftSideBar/LeftSideBar';
import { Performance_management } from '../../../components/for_an_admin/performance_management/performance_management';

export const Admin_performance = () => {
  return (
    <div className='admin_performance'>
      <LeftSideBar />
      <Performance_management />
    </div>
  );
};
