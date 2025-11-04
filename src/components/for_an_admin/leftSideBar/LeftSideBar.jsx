import React, { useState, useEffect } from 'react';
import './LeftSideBar.css';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineManageAccounts,MdLogout , MdOutlineLocalPhone  } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { GrAnnounce , GrResources } from "react-icons/gr";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { LuNotebookPen } from "react-icons/lu";
import { FaRegBell , FaRegUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { CiGlobe } from "react-icons/ci";
import { NavLink, useLocation } from 'react-router-dom';

export const LeftSideBar = () => {
  const location = useLocation();
  const [userManagementOpen, setUserManagementOpen] = useState(false);

  // Check if current path is any user management route
  const isUserManagementRoute = location.pathname.includes('/admin/students') || 
                                  location.pathname.includes('/admin/teachers') || 
                                  location.pathname.includes('/admin/classes');

  // Keep dropdown open if on any user management page
  useEffect(() => {
    if (isUserManagementRoute) {
      setUserManagementOpen(true);
    }
  }, [isUserManagementRoute]);
  return (
    <div className='leftSideBar'>
        <div className="box">
            <div className="upperSection">
                <div className="upper">
                    <img src={`${import.meta.env.BASE_URL}assets/LearnIx.png`} alt="LearnIX logo" />
                    <h1 className="logo">LearnIx</h1>
                </div>
                <div className="lower">
                    <div className="links">
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/admin/dashboard'><div className="link active"><RxDashboard  className="icon" /><span>Dashboard</span></div></NavLink>
                        
                        {/* User Management Dropdown */}
                        <div className="dropdown-container">
                          <div className="link dropdown-trigger" onClick={() => setUserManagementOpen(!userManagementOpen)}>
                            <MdOutlineManageAccounts className="icon" />
                            <span>User Management</span>
                            {(userManagementOpen || isUserManagementRoute) ? <FaChevronUp className="dropdown-icon" /> : <FaChevronDown className="dropdown-icon" />}
                          </div>
                          {(userManagementOpen || isUserManagementRoute) && (
                            <div className="dropdown-menu">
                              <NavLink className={({ isActive }) => isActive ? 'dropdown-item when_active' : 'dropdown-item'} to='/admin/students'>
                                <span>Manage Students</span>
                              </NavLink>
                              <NavLink className={({ isActive }) => isActive ? 'dropdown-item when_active' : 'dropdown-item'} to='/admin/teachers'>
                                <span>Manage Teachers</span>
                              </NavLink>
                              <NavLink className={({ isActive }) => isActive ? 'dropdown-item when_active' : 'dropdown-item'} to='/admin/classes'>
                                <span>Manage Classes</span>
                              </NavLink>
                            </div>
                          )}
                        </div>

                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/admin/admissions'><div className="link"><LuNotebookPen className="icon" /><span>Admissions & Registration</span></div></NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/admin/academic_setup'><div className="link"><HiOutlineAcademicCap className="icon" /><span>Academic Setup</span></div></NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/admin/resources'><div className="link"><GrResources className="icon" /><span>Resources</span></div></NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/admin/communications'><div className="link"><GrAnnounce className="icon" /><span>Communications</span></div></NavLink>
                       <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/admin/notifications'> <div className="link"><FaRegBell className="icon" /><span>Notifications</span></div></NavLink>
                       <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/admin/settings'> <div className="link"><IoSettingsOutline className="icon" /><span>Settings</span></div></NavLink>
                    </div>
                </div>
            </div>
            <div className="lowerSection">
                <div className="profile">
                    <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/greenhills.png`} alt="LearnIX logo" />
                    </div>
                    <div className="info">
                        <h3 className="name">Green Hills Academy</h3>
                        <p className="role">Administrator</p>
                    </div>
                </div>
                <div className="contact">
                    <div className="phone all"><MdOutlineLocalPhone className="icon" /><span>+1 234 567 890</span></div>
                    <div className="email all"><HiOutlineMail className="icon" /><span>info@greenhillsacademy.edu</span></div>
                    <div className="website all"><CiGlobe className="icon" /><span><a href="https://www.greenhillsacademy.rw" target='_blank'>www.greenhillsacademy.rw</a></span></div>
                </div>
                <div className="lower">
                    <div className="prof">
                        <NavLink to='/admin/profile' style={{textDecoration:'none'}}>
                            <button><FaRegUser className="icon" /><span>Profile</span></button>
                        </NavLink>
                    </div>
                    <div className="separator"></div>
                    <div className="logout">
                        <NavLink to='/' style={{textDecoration:'none'}}>
                            <button><span>Sign out</span><MdLogout className="icon" /></button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
