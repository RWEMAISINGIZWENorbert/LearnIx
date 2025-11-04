import React, { useState } from 'react';
import './TeacherStudents.css';
import { CiSearch } from 'react-icons/ci';
import { LuUser } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import { MdOutlinePhone, MdOutlineEmail } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";

export const TeacherStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@student.com",
      guardian_name: "John Doe Sr.",
      guardian_phone: "+250 795 123 456",
      whatsapp: "+250 795 123 456",
      studentId: "STU001",
      class: "L5 SOD A",
      status: "active",
      enrollmentDate: "Mon, August 12, 2024 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@student.com",
      guardian_name: "Jane Smith Sr.",
      guardian_phone: "+250 795 234 567",
      whatsapp: "+250 795 234 567",
      studentId: "STU002",
      class: "L5 SOD B",
      status: "active",
      enrollmentDate: "Mon, August 12, 2024 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@student.com",
      guardian_name: "Mike Johnson Sr.",
      guardian_phone: "+250 795 345 678",
      whatsapp: "+250 795 345 678",
      studentId: "STU003",
      class: "L6 SOD A",
      status: "inactive",
      enrollmentDate: "Mon, August 12, 2024 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@student.com",
      guardian_name: "Sarah Wilson Sr.",
      guardian_phone: "+250 795 456 789",
      whatsapp: "+250 795 456 789",
      studentId: "STU004",
      class: "L5 SOD A",
      status: "active",
      enrollmentDate: "Mon, August 12, 2024 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@student.com",
      guardian_name: "David Brown Sr.",
      guardian_phone: "+250 795 567 890",
      whatsapp: "+250 795 567 890",
      studentId: "STU005",
      class: "L6 SOD B",
      status: "active",
      enrollmentDate: "Mon, August 12, 2024 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily.davis@student.com",
      guardian_name: "Emily Davis Sr.",
      guardian_phone: "+250 795 678 901",
      whatsapp: "+250 795 678 901",
      studentId: "STU006",
      class: "L5 SOD A",
      status: "active",
      enrollmentDate: "Mon, August 12, 2024 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    }
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className='teacherStudents students_management'>
      <div className="box">
        <div className="whole_up">
          <div className="upper">
            <h4>My Students</h4>
            <p>View and manage all students in your classes. Access contact information and track enrollment records.</p>
          </div>
          <div className="mini_up">
            <div className="search_box">
              <div className="search">
                <div className="icon"><CiSearch /></div>
                <input 
                  type="text" 
                  placeholder='Search for students...' 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="button">
                <button>Search</button>
              </div>
            </div>
            <div className="stats">
              <div className="left"><div className="icon"><LuUser/></div></div>
              <div className="right">
                <span>Total Students</span>
                <p>{students.length} students</p>
              </div>
            </div>
          </div>
        </div>
        <div className="middle">
          {filteredStudents.map(student => (
            <div key={student.id} className="student">
              <div className="up">
                <div className="profile">
                  <div className="img">
                    <img src={`${import.meta.env.BASE_URL}assets/${student.profilePic}`} alt="Student profile pic" />
                  </div>
                  <div className="data">
                    <p className='name'>{student.name}</p>
                    <p className='email'>{student.email}</p>
                    <p className='studentId'>ID: {student.studentId}</p>
                  </div>
                </div>
                <p className={`active_status ${student.status}`}>{student.status}</p>
              </div>
              <div className="details">
                <p><div className="icon"><MdOutlineEmail /></div><span>{student.email}</span></p>
                <p><div className="icon"><MdOutlinePhone /></div><span>{student.guardian_phone}</span></p>
                <p><div className="icon"><FaWhatsapp /></div><span>{student.whatsapp}</span></p>
                <p><div className="icon"><IoTimeOutline/></div><span>enrolled <span>{student.enrollmentDate}</span></span></p>
                <p><div className="icon"><HiOutlineAcademicCap /></div><span>Class: {student.class}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
