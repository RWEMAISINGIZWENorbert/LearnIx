import React, {useEffect} from 'react';
import './TeacherSidebar.css';
import { RxDashboard } from "react-icons/rx";
import { MdLogout, MdOutlineAssignment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail, HiOutlineAcademicCap } from "react-icons/hi";
import { GrResources, GrAnnounce } from "react-icons/gr";
import { PiStudentBold } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import { getSchoolProfile } from '../../../features/school/schoolSlice';
import { fetchUserProfile } from '../../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

export const TeacherSidebar = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { school, loading, error } = useSelector((state) => state.school);
   const { userProfile, profileLoading, profileError } = useSelector((state) => state.auth);
    useEffect(() => {
      dispatch(getSchoolProfile());
      dispatch(fetchUserProfile(navigate));
    }, [dispatch, navigate]); 
    
    // if (profileLoading) {
    //       return <div>Loading profile...</div>;
    //     }
      
    //     if (profileError) {
    //       return <div>Error: {profileError}</div>;
    //     }

    const handleLogout = async (e) => {
      e.preventDefault();
      try {
        await dispatch(logout()).unwrap();
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };  
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
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/students'>
                            <div className="link"><PiStudentBold className="icon" /><span>Students</span></div>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'left-item when_active' : 'left-item'} to='/teacher/assignments'>
                            <div className="link"><MdOutlineAssignment className="icon" /><span>Assignments</span></div>
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
                    {userProfile &&
                    <div className="info">
                        <h3 className="name">{userProfile?.name || userProfile?.firstName + ' ' + userProfile?.lastName}</h3>
                        <p className="role">Teacher</p>
                        {/* <p className="id">ID: TCHR042</p> */}
                        <p className="school">{school?.name}</p>
                    </div>
                    }
                </div>
                <div className="contact">
                    {userProfile &&  <div className="email all"><HiOutlineMail className="icon" /><span>{userProfile?.email}</span></div>}
                    {/* <div className="dept all"><HiOutlineAcademicCap className="icon" /><span>Software Development Dept.</span></div> */}
                </div>
                <div className="lower">
                    <div className="prof">
                        <NavLink to='/teacher/profile' style={{textDecoration:'none'}}>
                            <button><FaRegUser className="icon" /><span>Profile</span></button>
                        </NavLink>
                    </div>
                    <div className="separator"></div>
                    {/* <div className="logout">
                        <NavLink to='/' style={{textDecoration:'none'}}>
                            <button><span>Sign out</span><MdLogout className="icon" /></button>
                        </NavLink>
                    </div> */}
                    <div className="logout">
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <span>Sign out</span><MdLogout className="icon" />
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}
