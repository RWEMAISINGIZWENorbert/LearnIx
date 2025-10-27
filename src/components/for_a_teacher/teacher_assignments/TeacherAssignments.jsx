import React, { useState } from 'react';
import './TeacherAssignments.css';
import { MdOutlineAssignment, MdAdd, MdCheckCircle, MdPending } from 'react-icons/md';
import { LuClock, LuCalendar } from 'react-icons/lu';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { FaUsers } from 'react-icons/fa';

export const TeacherAssignments = () => {
  const [activeTab, setActiveTab] = useState('active');

  const assignments = {
    active: [
      {
        id: 1,
        title: 'React Component Design',
        course: 'Web Development',
        courseCode: 'CS301',
        dueDate: '2025-11-15',
        submitted: 18,
        total: 24,
        pending: 6,
        graded: 12,
        color: '#3b82f6'
      },
      {
        id: 2,
        title: 'Database Normalization',
        course: 'Database Systems',
        courseCode: 'CS302',
        dueDate: '2025-11-18',
        submitted: 20,
        total: 26,
        pending: 8,
        graded: 12,
        color: '#10b981'
      },
      {
        id: 3,
        title: 'UML Class Diagrams',
        course: 'Software Engineering',
        courseCode: 'CS401',
        dueDate: '2025-11-20',
        submitted: 15,
        total: 22,
        pending: 5,
        graded: 10,
        color: '#8b5cf6'
      }
    ],
    completed: [
      {
        id: 4,
        title: 'HTML/CSS Project',
        course: 'Web Development',
        courseCode: 'CS301',
        completedDate: '2025-10-20',
        submitted: 24,
        total: 24,
        avgGrade: 88,
        color: '#3b82f6'
      },
      {
        id: 5,
        title: 'SQL Queries Exercise',
        course: 'Database Systems',
        courseCode: 'CS302',
        completedDate: '2025-10-15',
        submitted: 26,
        total: 26,
        avgGrade: 85,
        color: '#10b981'
      }
    ]
  };

  return (
    <div className='teacherAssignments'>
      <div className="box">
        <div className="upper">
          <h2>Assignment Management</h2>
          <p>Create, manage and grade student assignments</p>
        </div>

        <div className="tabs">
          <button 
            className={activeTab === 'active' ? 'active' : ''}
            onClick={() => setActiveTab('active')}
          >
            Active ({assignments.active.length})
          </button>
          <button 
            className={activeTab === 'completed' ? 'active' : ''}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({assignments.completed.length})
          </button>
          <button className="create-btn">
            <MdAdd className="icon" /> Create Assignment
          </button>
        </div>

        <div className="assignments-grid">
          {activeTab === 'active' && assignments.active.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header" style={{borderLeft: `none`}}>
                <div className="assignment-icon" style={{background: `${assignment.color}20`, color: assignment.color}}>
                  <MdOutlineAssignment />
                </div>
                <div className="assignment-info">
                  <h3>{assignment.title}</h3>
                  <p className="course-name">{assignment.course}</p>
                </div>
              </div>

              <div className="assignment-details">
                <div className="detail-row">
                  <LuCalendar className="icon" />
                  <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <FaUsers className="icon" />
                  <span>{assignment.submitted}/{assignment.total} submitted</span>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span>Submission Progress</span>
                  <span className="progress-value">{Math.round((assignment.submitted / assignment.total) * 100)}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{width: `${(assignment.submitted / assignment.total) * 100}%`, background: assignment.color}}></div>
                </div>
              </div>

              <div className="status-grid">
                <div className="status-item graded">
                  <MdCheckCircle className="icon" />
                  <span>{assignment.graded} Graded</span>
                </div>
                <div className="status-item pending">
                  <MdPending className="icon" />
                  <span>{assignment.pending} Pending</span>
                </div>
              </div>

              <button className="view-btn" style={{background: assignment.color}}>View Submissions</button>
            </div>
          ))}

          {activeTab === 'completed' && assignments.completed.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header" style={{borderLeft: `none`}}>
                <div className="assignment-icon" style={{background: `${assignment.color}20`, color: assignment.color}}>
                  <MdCheckCircle />
                </div>
                <div className="assignment-info">
                  <h3>{assignment.title}</h3>
                  <p className="course-name">{assignment.course}</p>
                </div>
              </div>

              <div className="assignment-details">
                <div className="detail-row">
                  <LuCalendar className="icon" />
                  <span>Completed: {new Date(assignment.completedDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <FaUsers className="icon" />
                  <span>{assignment.submitted}/{assignment.total} students</span>
                </div>
                <div className="detail-row">
                  <MdOutlineAssignment className="icon" />
                  <span>Avg Grade: {assignment.avgGrade}%</span>
                </div>
              </div>

              <button className="view-btn" style={{background: assignment.color}}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
