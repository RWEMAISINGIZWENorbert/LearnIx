import React from 'react'
import './settings.css'
import { BsInfoCircle } from "react-icons/bs";
import { FaLongArrowAltRight, FaRegCalendar,FaRegQuestionCircle   } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { MdOutlineManageAccounts, MdMailOutline,MdOutlineStarRate   } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";
import { BiMedal } from "react-icons/bi";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoLockOpenOutline } from "react-icons/io5";
export const Settings = () => {
  return (
    <div className='settings_page'>
      <div className='settings'>
        <div className="upper">
          <h2>Settings overview</h2>
          <p>Configure your school platform preferences, manage user roles, and adjust system features to ensure smooth operations.</p>
        </div>
        <div className="down">
          <div className="divs">
            <div className="div1 all">
              <div className="i"><div className="icon"><BsInfoCircle /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>School information</h3>
                    </div>
                    <div className="mid">
                      <p>Manage school details, contact info, and branding.</p>
                    </div>
                    <div className="down">
                      <button><span>Configure</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div2 all">
              <div className="i"><div className="icon"><LuUsers /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Admin & roles</h3>
                    </div>
                    <div className="mid">
                      <p>Manage user roles, permissions, and access levels.</p>
                    </div>
                    <div className="down">
                      <button><span>Manage</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div3 all">
              <div className="i"><div className="icon"><MdOutlineManageAccounts /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Academic configuration</h3>
                    </div>
                    <div className="mid">
                      <p>Manage academic years, terms, promotion rules and grading systems.</p>
                    </div>
                    <div className="down">
                      <button><span>Setup</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div4 all">
              <div className="i"><div className="icon"><FaDollarSign /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Finance & fees</h3>
                    </div>
                    <div className="mid">
                      <p>Manage financial settings, fee structures, and payment methods.</p>
                    </div>
                    <div className="down">
                      <button><span>Configure</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div5 all">
              <div className="i"><div className="icon"><FaRegCalendar /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Attendance</h3>
                    </div>
                    <div className="mid">
                      <p>Manage attendance records, tracking, and reporting.</p>
                    </div>
                    <div className="down">
                      <button><span>Manage</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div6 all">
              <div className="i"><div className="icon"><BiMedal /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Exam & results</h3>
                    </div>
                    <div className="mid">
                      <p>Manage exam schedules, results, and grading.</p>
                    </div>
                    <div className="down">
                      <button><span>Setup</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div7 all">
              <div className="i"><div className="icon"><MdMailOutline /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Communication</h3>
                    </div>
                    <div className="mid">
                      <p>Manage Email, SMS, notifications, and messaging.</p>
                    </div>
                    <div className="down">
                      <button><span>Configure</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div8 all">
              <div className="i"><div className="icon"><HiOutlinePaintBrush /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Customization & UI</h3>
                    </div>
                    <div className="mid">
                      <p>Customize the look and feel of the application.</p>
                    </div>
                    <div className="down">
                      <button><span>Customize</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div9 all">
              <div className="i"><div className="icon"><IoLockOpenOutline /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Security</h3>
                    </div>
                    <div className="mid">
                      <p>Two Factor Authentication(2FA), password policies and data protection.</p>
                    </div>
                    <div className="down">
                      <button><span>Secure</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div10 all">
              <div className="i"><div className="icon"><FaRegQuestionCircle  /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Feedback & Support</h3>
                    </div>
                    <div className="mid">
                      <p>Get help and support for using the application.</p>
                    </div>
                    <div className="down">
                      <button><span>Support</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div11 all">
              <div className="i"><div className="icon"><MdOutlineStarRate  /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Ratings</h3>
                    </div>
                    <div className="mid">
                      <p>Provide feedback and rate your experience.</p>
                    </div>
                    <div className="down">
                      <button><span>Rate us</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
