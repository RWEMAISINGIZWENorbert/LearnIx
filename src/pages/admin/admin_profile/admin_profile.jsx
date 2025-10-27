import React from 'react';
import { LeftSideBar } from '../../../components/for_an_admin/leftSideBar/LeftSideBar';
import { AdminProfile } from '../../../components/for_an_admin/admin_profile/AdminProfile';

export const Admin_profile = () => {
  return (
    <div className='admin_profile'>
      <LeftSideBar />
      <AdminProfile />
    </div>
  );
};
