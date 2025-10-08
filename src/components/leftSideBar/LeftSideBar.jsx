import React from 'react';
import './LeftSideBar.css';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineManageAccounts,MdLogout , MdOutlineLocalPhone  } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { GrAnnounce , GrResources } from "react-icons/gr";
import { LuChartColumnIncreasing } from "react-icons/lu";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { LuNotebookPen } from "react-icons/lu";
import { FaRegBell , FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { CiGlobe } from "react-icons/ci";

export const LeftSideBar = () => {
  return (
    <div className='leftSideBar'>
        <div className="box">
            <div className="upperSection">
                <div className="upper">
                    <img src='src/assets/LearnIx.png' alt="LearnIx logo" />
                    <h1 className="logo">LearnIx</h1>
                </div>
                <div className="lower">
                    <div className="links">
                        <div className="link active"><RxDashboard  className="icon" /><span>Dashboard</span></div>
                        <div className="link"><MdOutlineManageAccounts className="icon" /><span>User Management</span></div>
                        <div className="link"><LuNotebookPen className="icon" /><span>Admissions & Registration</span></div>
                        <div className="link"><HiOutlineAcademicCap className="icon" /><span>Academic Setup</span></div>
                        <div className="link"><LuChartColumnIncreasing className="icon" /><span>Performance & Attendance</span></div>
                        <div className="link"><GrResources className="icon" /><span>Resources</span></div>
                        <div className="link"><GrAnnounce className="icon" /><span>Announce</span></div>
                        <div className="link"><FaRegBell className="icon" /><span>Notifications</span></div>
                        <div className="link"><IoSettingsOutline className="icon" /><span>Settings</span></div>
                    </div>
                </div>
            </div>
            <div className="lowerSection">
                <div className="profile">
                    <div className="img">
                        <img src="src/assets/download.png" alt="profile" />
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
                    <div className="prof"><button><FaRegUser className="icon" /><span>Profile</span></button></div>
                    <div className="separator"></div>
                    <div className="logout"><button><span>Sign Out</span><MdLogout className="icon" /></button></div>
                </div>
            </div>
        </div>
    </div>
  )
}
