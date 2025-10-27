import React from 'react';
import './TeacherSidebar.css';
import { RxDashboard } from "react-icons/rx";
import { MdLogout, MdOutlineAssignment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaChalkboardTeacher, FaRegUser } from "react-icons/fa";
import { HiOutlineMail, HiOutlineAcademicCap } from "react-icons/hi";
import { LuCalendarDays, LuClipboardList } from "react-icons/lu";
import { GrResources, GrAnnounce } from "react-icons/gr";
import { PiStudentBold } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { BiBarChart } from "react-icons/bi";

export const TeacherSidebar = () => {
  return (
    <div className='teacherSidebar'>
        <div className="box">
            <div className="upperSection">
                <div className="upper">
                    <img src={`${import.meta.env.BASE_URL}assets/LearnIx.png`} alt="LearnIX logo" />
                    <h1 className="logo">LearnIx</h1>
                </div>
                <div className="lower">
                    <div className="links">
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/dashboard'>
                            <div className="link"><RxDashboard className="icon" /><span>Dashboard</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/classes'>
                            <div className="link"><FaChalkboardTeacher className="icon" /><span>My Classes</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/students'>
                            <div className="link"><PiStudentBold className="icon" /><span>Students</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/assignments'>
                            <div className="link"><MdOutlineAssignment className="icon" /><span>Assignments</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/grades'>
                            <div className="link"><BiBarChart className="icon" /><span>Grade Management</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/attendance'>
                            <div className="link"><LuClipboardList className="icon" /><span>Attendance</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/schedule'>
                            <div className="link"><LuCalendarDays className="icon" /><span>My Schedule</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/resources'>
                            <div className="link"><GrResources className="icon" /><span>Resources</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/announcements'>
                            <div className="link"><GrAnnounce className="icon" /><span>Announcements</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/settings'>
                            <div className="link"><IoSettingsOutline className="icon" /><span>Settings</span></div>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="lowerSection">
                <div className="profile">
                    <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/profile_pic_blank.png`} alt="Teacher profile" />
                    </div>
                    <div className="info">
                        <h3 className="name">Dr. Sarah Johnson</h3>
                        <p className="role">Senior Lecturer</p>
                        <p className="id">ID: TCHR042</p>
                        <p className="school">🏫 Green Hills Academy</p>
                    </div>
                </div>
                <div className="contact">
                    <div className="email all"><HiOutlineMail className="icon" /><span>sarah.johnson@learnix.edu</span></div>
                    <div className="dept all"><HiOutlineAcademicCap className="icon" /><span>Software Development Dept.</span></div>
                </div>
                <div className="lower">
                    <div className="prof">
                        <NavLink to='/teacher/profile'>
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
