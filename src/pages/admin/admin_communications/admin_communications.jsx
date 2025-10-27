import React from 'react';
import { LeftSideBar } from '../../../components/for_an_admin/leftSideBar/LeftSideBar';
import { Communications_management } from '../../../components/for_an_admin/communications_management/communications_management';

export const Admin_communications = () => {
  return (
    <div className='admin_communications'>
      <LeftSideBar />
      <Communications_management />
    </div>
  );
};
