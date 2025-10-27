import React, { useState } from 'react';
import './StudentCourses.css';
import { HiOutlineBookOpen, HiOutlineAcademicCap } from 'react-icons/hi';
import { BiBarChart } from 'react-icons/bi';
import { LuClock, LuUsers } from 'react-icons/lu';
import { MdOutlineAssignment } from 'react-icons/md';
import { IoMdArrowDropright } from 'react-icons/io';

export const StudentCourses = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const courses = [
    {
      id: 1,
      name: 'Advanced Mathematics',
      code: 'MATH 301',
      teacher: 'Dr. Sarah Johnson',
      progress: 85,
      grade: 'A',
      students: 32,
      schedule: 'Mon, Wed, Fri - 08:00-09:30',
      assignments: 5,
      color: '#3b82f6'
    },
    {
      id: 2,
      name: 'Physics Laboratory',
      code: 'PHYS 201',
      teacher: 'Prof. Michael Brown',
      progress: 72,
      grade: 'B+',
      students: 28,
      schedule: 'Tue, Thu - 09:45-11:15',
      assignments: 3,
      color: '#10b981'
    },
    {
      id: 3,
      name: 'Software Development',
      code: 'CS 401',
      teacher: 'Dr. Emily Chen',
      progress: 90,
      grade: 'A',
      students: 35,
      schedule: 'Mon, Wed - 12:00-13:30',
      assignments: 7,
      color: '#8b5cf6'
    },
    {
      id: 4,
      name: 'English Literature',
      code: 'ENG 202',
      teacher: 'Ms. Patricia Wilson',
      progress: 68,
      grade: 'B',
      students: 30,
      schedule: 'Tue, Thu - 14:00-15:30',
      assignments: 4,
      color: '#ef4444'
    },
    {
      id: 5,
      name: 'Database Management',
      code: 'CS 301',
      teacher: 'Dr. David Martinez',
      progress: 78,
      grade: 'B+',
      students: 25,
      schedule: 'Mon, Fri - 10:00-11:30',
      assignments: 6,
      color: '#f59e0b'
    },
    {
      id: 6,
      name: 'Web Technologies',
      code: 'CS 402',
      teacher: 'Mr. James Taylor',
      progress: 82,
      grade: 'A-',
      students: 30,
      schedule: 'Wed, Fri - 13:00-14:30',
      assignments: 5,
      color: '#06b6d4'
    }
  ];

  return (
    <div className='studentCourses'>
      <div className="box">
        <div className="upper">
          <h2>My Courses</h2>
          <p>View and manage all your enrolled courses</p>
        </div>

        <div className="filters">
          <button 
            className={selectedFilter === 'all' ? 'active' : ''}
            onClick={() => setSelectedFilter('all')}
          >
            All Courses
          </button>
          <button 
            className={selectedFilter === 'active' ? 'active' : ''}
            onClick={() => setSelectedFilter('active')}
          >
            Active
          </button>
          <button 
            className={selectedFilter === 'completed' ? 'active' : ''}
            onClick={() => setSelectedFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-header" style={{borderLeft: `4px solid ${course.color}`}}>
                <div className="course-icon" style={{background: `${course.color}20`, color: course.color}}>
                  <HiOutlineBookOpen />
                </div>
                <div className="course-info">
                  <h3>{course.name}</h3>
                  <p className="course-code">{course.code}</p>
                </div>
              </div>

              <div className="course-details">
                <div className="detail-item">
                  <HiOutlineAcademicCap className="icon" />
                  <span>{course.teacher}</span>
                </div>
                <div className="detail-item">
                  <LuClock className="icon" />
                  <span>{course.schedule}</span>
                </div>
                <div className="detail-item">
                  <LuUsers className="icon" />
                  <span>{course.students} students</span>
                </div>
                <div className="detail-item">
                  <MdOutlineAssignment className="icon" />
                  <span>{course.assignments} assignments</span>
                </div>
              </div>

              <div className="course-stats">
                <div className="stat">
                  <div className="stat-header">
                    <span className="label">Progress</span>
                    <span className="value">{course.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress" style={{width: `${course.progress}%`, background: course.color}}></div>
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-header">
                    <span className="label">Current Grade</span>
                    <span className="grade-badge" style={{background: `${course.color}20`, color: course.color}}>
                      {course.grade}
                    </span>
                  </div>
                </div>
              </div>

              <div className="course-actions">
                <button className="btn-primary">View Course</button>
                <button className="btn-secondary">Materials</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
