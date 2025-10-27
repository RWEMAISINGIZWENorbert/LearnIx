import React, { useState } from 'react';
import './StudentGrades.css';
import { BiBarChart, BiTrendingUp } from 'react-icons/bi';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { MdOutlineAssignment } from 'react-icons/md';

export const StudentGrades = () => {
  const [selectedSemester, setSelectedSemester] = useState('current');

  const gradesData = [
    {
      id: 1,
      course: 'Advanced Mathematics',
      code: 'MATH 301',
      midterm: 88,
      assignments: 92,
      final: 90,
      overall: 90,
      grade: 'A',
      credits: 4,
      color: '#3b82f6'
    },
    {
      id: 2,
      course: 'Physics Laboratory',
      code: 'PHYS 201',
      midterm: 85,
      assignments: 88,
      final: 87,
      overall: 87,
      grade: 'B+',
      credits: 3,
      color: '#10b981'
    },
    {
      id: 3,
      course: 'Software Development',
      code: 'CS 401',
      midterm: 95,
      assignments: 98,
      final: 96,
      overall: 96,
      grade: 'A',
      credits: 4,
      color: '#8b5cf6'
    },
    {
      id: 4,
      course: 'English Literature',
      code: 'ENG 202',
      midterm: 75,
      assignments: 78,
      final: 76,
      overall: 76,
      grade: 'B',
      credits: 3,
      color: '#ef4444'
    },
    {
      id: 5,
      course: 'Database Management',
      code: 'CS 301',
      midterm: 82,
      assignments: 85,
      final: 84,
      overall: 84,
      grade: 'B+',
      credits: 4,
      color: '#f59e0b'
    },
    {
      id: 6,
      course: 'Web Technologies',
      code: 'CS 402',
      midterm: 90,
      assignments: 92,
      final: 91,
      overall: 91,
      grade: 'A-',
      credits: 3,
      color: '#06b6d4'
    }
  ];

  // Calculate GPA
  const gradePoints = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0
  };

  const totalCredits = gradesData.reduce((sum, course) => sum + course.credits, 0);
  const totalPoints = gradesData.reduce((sum, course) => sum + (gradePoints[course.grade] * course.credits), 0);
  const gpa = (totalPoints / totalCredits).toFixed(2);

  const getGradeColor = (grade) => {
    if (grade >= 90) return '#10b981';
    if (grade >= 80) return '#3b82f6';
    if (grade >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className='studentGrades'>
      <div className="box">
        <div className="upper">
          <h2>Grades & Results</h2>
          <p>View your academic performance and grades</p>
        </div>

        {/* GPA Overview */}
        <div className="gpa-section">
          <div className="gpa-card main">
            <div className="icon"><BiBarChart /></div>
            <div className="content">
              <h3>Current Percentege</h3>
              <div className="gpa-value">{gpa}</div>
              <p>Out of 100</p>
            </div>
          </div>
          <div className="gpa-card">
            <div className="icon"><MdOutlineAssignment /></div>
            <div className="content">
              <h3>Total Credits</h3>
              <div className="value">{totalCredits}</div>
            </div>
          </div>
          <div className="gpa-card">
            <div className="icon"><BiTrendingUp /></div>
            <div className="content">
              <h3>Average Grade</h3>
              <div className="value">85%</div>
            </div>
          </div>
        </div>

        {/* Semester Filter */}
        <div className="filters">
          <button 
            className={selectedSemester === 'current' ? 'active' : ''}
            onClick={() => setSelectedSemester('current')}
          >
            Current Semester
          </button>
          <button 
            className={selectedSemester === 'previous' ? 'active' : ''}
            onClick={() => setSelectedSemester('previous')}
          >
            Previous Semester
          </button>
          <button 
            className={selectedSemester === 'all' ? 'active' : ''}
            onClick={() => setSelectedSemester('all')}
          >
            All Time
          </button>
        </div>

        {/* Grades Table */}
        <div className="grades-container">
          <div className="grades-table">
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Code</th>
                  <th>Midterm</th>
                  <th>Assignments</th>
                  <th>Final</th>
                  <th>Overall</th>
                  <th>Grade</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                {gradesData.map(course => (
                  <tr key={course.id}>
                    <td>
                      <div className="course-name">
                        <div className="course-dot" style={{background: course.color}}></div>
                        {course.course}
                      </div>
                    </td>
                    <td className="code">{course.code}</td>
                    <td>{course.midterm}%</td>
                    <td>{course.assignments}%</td>
                    <td>{course.final}%</td>
                    <td className="overall">{course.overall}%</td>
                    <td>
                      <span className="grade-badge" style={{background: `${course.color}20`, color: course.color}}>
                        {course.grade}
                      </span>
                    </td>
                    <td>{course.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Course Cards (Mobile View) */}
          <div className="grades-cards">
            {gradesData.map(course => (
              <div key={course.id} className="grade-card" style={{borderLeft: `4px solid ${course.color}`}}>
                <div className="card-header">
                  <div>
                    <h3>{course.course}</h3>
                    <p className="code">{course.code}</p>
                  </div>
                  <span className="grade-badge-large" style={{background: `${course.color}20`, color: course.color}}>
                    {course.grade}
                  </span>
                </div>
                <div className="card-stats">
                  <div className="stat">
                    <span className="label">Midterm</span>
                    <span className="value">{course.midterm}%</span>
                  </div>
                  <div className="stat">
                    <span className="label">Assignments</span>
                    <span className="value">{course.assignments}%</span>
                  </div>
                  <div className="stat">
                    <span className="label">Final</span>
                    <span className="value">{course.final}%</span>
                  </div>
                  <div className="stat">
                    <span className="label">Overall</span>
                    <span className="value overall">{course.overall}%</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{width: `${course.overall}%`, background: getGradeColor(course.overall)}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
