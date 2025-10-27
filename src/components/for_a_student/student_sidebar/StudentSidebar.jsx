import React from 'react';
import './StudentSidebar.css';
import { RxDashboard } from "react-icons/rx";
import { MdLogout, MdOutlineAssignment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { HiOutlineMail, HiOutlineAcademicCap, HiOutlineBookOpen } from "react-icons/hi";
import { LuCalendarDays, LuClipboardList } from "react-icons/lu";
import { GrResources, GrAnnounce } from "react-icons/gr";
import { NavLink } from 'react-router-dom';
import { BiBarChart } from "react-icons/bi";

export const StudentSidebar = () => {
  return (
    <div className='studentSidebar'>
        <div className="box">
            <div className="upperSection">
                <div className="upper">
                    <img src={`${import.meta.env.BASE_URL}assets/LearnIx.png`} alt="LearnIX logo" />
                    <h1 className="logo">LearnIx</h1>
                </div>
                <div className="lower">
                    <div className="links">
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/student/dashboard'>
                            <div className="link"><RxDashboard className="icon" /><span>Dashboard</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/student/courses'>
                            <div className="link"><HiOutlineBookOpen className="icon" /><span>My Courses</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/student/assignments'>
                            <div className="link"><MdOutlineAssignment className="icon" /><span>Assignments</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/student/grades'>
                            <div className="link"><BiBarChart className="icon" /><span>Grades & Results</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/student/timetable'>
                            <div className="link"><LuCalendarDays className="icon" /><span>Timetable</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/student/attendance'>
                            <div className="link"><LuClipboardList className="icon" /><span>Attendance</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/student/resources'>
                            <div className="link"><GrResources className="icon" /><span>Resources & Library</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/student/announcements'>
                            <div className="link"><GrAnnounce className="icon" /><span>Announcements</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/student/notifications'>
                            <div className="link"><FaRegBell className="icon" /><span>Notifications</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/student/settings'>
                            <div className="link"><IoSettingsOutline className="icon" /><span>Settings</span></div>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="lowerSection">
                <div className="profile">
                    <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/profile_pic_blank.png`} alt="Student profile" />
                    </div>
                    <div className="info">
                        <h3 className="name">John Doe</h3>
                        <p className="role">Student - L5 SOD A</p>
                        <p className="id">ID: STU001</p>
                        <p className="school">🏫 Green Hills Academy</p>
                    </div>
                </div>
                <div className="contact">
                    <div className="email all"><HiOutlineMail className="icon" /><span>john.doe@student.com</span></div>
                    <div className="class all"><HiOutlineAcademicCap className="icon" /><span>Level 5 Software Development A</span></div>
                </div>
                <div className="lower">
                    <div className="prof">
                        <NavLink to='/student/profile'>
                            <button><FaRegUser className="icon" /><span>Profile</span></button>
                        </NavLink>
                    </div>
                    <div className="separator"></div>
                    <div className="logout"><button><span>Sign Out</span><MdLogout className="icon" /></button></div>
                </div>
            </div>
        </div>
    </div>
  )
}
