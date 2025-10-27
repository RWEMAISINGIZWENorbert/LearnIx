import React, { useState } from 'react';
import './TeacherStudents.css';
import { FaSearch, FaEnvelope, FaPhone } from 'react-icons/fa';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import { HiOutlineAcademicCap } from 'react-icons/hi';

export const TeacherStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const students = [
    { id: 'STU001', name: 'John Doe', email: 'john.doe@student.com', phone: '+1 234 567 8901', class: 'L5 SOD A', courses: 'Web Dev, Database', attendance: 95, avgGrade: 85, trend: 'up' },
    { id: 'STU002', name: 'Emma Wilson', email: 'emma.wilson@student.com', phone: '+1 234 567 8902', class: 'L5 SOD A', courses: 'Web Dev, Software Eng', attendance: 92, avgGrade: 88, trend: 'up' },
    { id: 'STU003', name: 'Michael Brown', email: 'michael.brown@student.com', phone: '+1 234 567 8903', class: 'L5 SOD B', courses: 'Database, Cloud', attendance: 78, avgGrade: 72, trend: 'down' },
    { id: 'STU004', name: 'Sarah Davis', email: 'sarah.davis@student.com', phone: '+1 234 567 8904', class: 'L6 SOD A', courses: 'Software Eng, AI', attendance: 98, avgGrade: 92, trend: 'up' },
    { id: 'STU005', name: 'James Johnson', email: 'james.johnson@student.com', phone: '+1 234 567 8905', class: 'L5 SOD C', courses: 'Mobile Dev, Web', attendance: 88, avgGrade: 80, trend: 'up' },
    { id: 'STU006', name: 'Lisa Martinez', email: 'lisa.martinez@student.com', phone: '+1 234 567 8906', class: 'L6 SOD B', courses: 'Cloud, AI', attendance: 85, avgGrade: 78, trend: 'down' }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className='teacherStudents'>
      <div className="box">
        <div className="upper">
          <h2>Students Directory</h2>
          <p>View and manage all students in your classes</p>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <FaSearch className="icon" />
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="class-filter">
            <option value="all">All Classes</option>
            <option value="L5 SOD A">L5 SOD A</option>
            <option value="L5 SOD B">L5 SOD B</option>
            <option value="L5 SOD C">L5 SOD C</option>
            <option value="L6 SOD A">L6 SOD A</option>
            <option value="L6 SOD B">L6 SOD B</option>
          </select>
        </div>

        <div className="students-grid">
          {filteredStudents.map((student) => (
            <div className="student-card" key={student.id}>
              <div className="student-header">
                <div className="student-avatar">{student.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="student-info">
                  <h3>{student.name}</h3>
                  <p className="student-id">{student.id}</p>
                  <span className="class-badge">{student.class}</span>
                </div>
                <div className="trend-indicator">
                  {student.trend === 'up' ? 
                    <BiTrendingUp className="icon up" /> : 
                    <BiTrendingDown className="icon down" />
                  }
                </div>
              </div>

              <div className="student-contact">
                <div className="contact-item">
                  <FaEnvelope className="icon" />
                  <span>{student.email}</span>
                </div>
                <div className="contact-item">
                  <FaPhone className="icon" />
                  <span>{student.phone}</span>
                </div>
                <div className="contact-item">
                  <HiOutlineAcademicCap className="icon" />
                  <span>{student.courses}</span>
                </div>
              </div>

              <div className="student-performance">
                <div className="perf-metric">
                  <div className="label">Attendance</div>
                  <div className="progress-bar">
                    <div className="progress" style={{
                      width: `${student.attendance}%`,
                      background: student.attendance >= 90 ? 'green' : student.attendance >= 75 ? '#f59e0b' : '#ef4444'
                    }}></div>
                  </div>
                  <div className="value">{student.attendance}%</div>
                </div>
                <div className="perf-metric">
                  <div className="label">Average Grade</div>
                  <div className="progress-bar">
                    <div className="progress" style={{
                      width: `${student.avgGrade}%`,
                      background: student.avgGrade >= 85 ? 'green' : student.avgGrade >= 70 ? '#3b82f6' : '#ef4444'
                    }}></div>
                  </div>
                  <div className="value">{student.avgGrade}%</div>
                </div>
              </div>

              <div className="student-actions">
                <button className="btn-primary">View Profile</button>
                <button className="btn-secondary">Send Email</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
