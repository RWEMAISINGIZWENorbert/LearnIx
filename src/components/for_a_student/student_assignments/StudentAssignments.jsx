import React, { useState } from 'react';
import './StudentAssignments.css';
import { MdOutlineAssignment, MdUpload, MdCheckCircle } from 'react-icons/md';
import { LuClock, LuCalendar } from 'react-icons/lu';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BiPaperclip } from 'react-icons/bi';

export const StudentAssignments = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const assignments = {
    pending: [
      {
        id: 1,
        title: 'Calculus Assignment - Integration',
        course: 'Advanced Mathematics',
        courseCode: 'MATH 301',
        dueDate: '2025-10-28',
        dueTime: '23:59',
        description: 'Complete exercises on integration techniques',
        points: 100,
        urgent: true
      },
      {
        id: 2,
        title: 'Physics Lab Report',
        course: 'Physics Laboratory',
        courseCode: 'PHYS 201',
        dueDate: '2025-10-30',
        dueTime: '17:00',
        description: 'Write a detailed lab report on the experiment',
        points: 50,
        urgent: false
      },
      {
        id: 3,
        title: 'Web Application Project',
        course: 'Software Development',
        courseCode: 'CS 401',
        dueDate: '2025-11-05',
        dueTime: '23:59',
        description: 'Build a full-stack web application',
        points: 200,
        urgent: false
      }
    ],
    submitted: [
      {
        id: 4,
        title: 'Essay on Shakespeare',
        course: 'English Literature',
        courseCode: 'ENG 202',
        submittedDate: '2025-10-20',
        dueDate: '2025-10-22',
        status: 'Under Review',
        points: 100
      },
      {
        id: 5,
        title: 'Database Design Project',
        course: 'Database Management',
        courseCode: 'CS 301',
        submittedDate: '2025-10-18',
        dueDate: '2025-10-20',
        status: 'Under Review',
        points: 150
      }
    ],
    graded: [
      {
        id: 6,
        title: 'Algebra Quiz 2',
        course: 'Advanced Mathematics',
        courseCode: 'MATH 301',
        submittedDate: '2025-10-10',
        gradedDate: '2025-10-12',
        score: 92,
        points: 100,
        feedback: 'Excellent work! Clear understanding of concepts.'
      },
      {
        id: 7,
        title: 'HTML/CSS Project',
        course: 'Web Technologies',
        courseCode: 'CS 402',
        submittedDate: '2025-10-08',
        gradedDate: '2025-10-10',
        score: 95,
        points: 100,
        feedback: 'Outstanding design and implementation!'
      },
      {
        id: 8,
        title: 'Physics Quiz 3',
        course: 'Physics Laboratory',
        courseCode: 'PHYS 201',
        submittedDate: '2025-10-05',
        gradedDate: '2025-10-07',
        score: 88,
        points: 100,
        feedback: 'Good understanding, minor calculation errors.'
      }
    ]
  };

  const handleUpload = (assignment) => {
    setSelectedAssignment(assignment);
    setShowUploadModal(true);
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className='studentAssignments'>
      <div className="assignments-header">
        <div className="header-content">
          <h1>My Assignments</h1>
          <p>Track, submit, and manage your course assignments</p>
        </div>
        <div className="stats-cards">
          <div className="stat-card pending-stat">
            <div className="stat-number">{assignments.pending.length}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card submitted-stat">
            <div className="stat-number">{assignments.submitted.length}</div>
            <div className="stat-label">Submitted</div>
          </div>
          <div className="stat-card graded-stat">
            <div className="stat-number">{assignments.graded.length}</div>
            <div className="stat-label">Graded</div>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="tabs">
          <button 
            className={activeTab === 'pending' ? 'active' : ''}
            onClick={() => setActiveTab('pending')}
          >
            <MdOutlineAssignment className="tab-icon" />
            Pending ({assignments.pending.length})
          </button>
          <button 
            className={activeTab === 'submitted' ? 'active' : ''}
            onClick={() => setActiveTab('submitted')}
          >
            <MdUpload className="tab-icon" />
            Submitted ({assignments.submitted.length})
          </button>
          <button 
            className={activeTab === 'graded' ? 'active' : ''}
            onClick={() => setActiveTab('graded')}
          >
            <MdCheckCircle className="tab-icon" />
            Graded ({assignments.graded.length})
          </button>
        </div>

        <div className="content">
          {activeTab === 'pending' && (
            <div className="assignments-list">
              {assignments.pending.map(assignment => {
                const daysLeft = getDaysUntilDue(assignment.dueDate);
                return (
                  <div key={assignment.id} className={`assignment-card ${assignment.urgent ? 'urgent' : ''}`}>
                    <div className="assignment-header">
                      <div className="icon-wrapper">
                        <MdOutlineAssignment className="icon" />
                      </div>
                      <div className="assignment-info">
                        <h3>{assignment.title}</h3>
                        <div className="course-tag">
                          <HiOutlineBookOpen className="icon" />
                          <span>{assignment.course} ({assignment.courseCode})</span>
                        </div>
                      </div>
                      {daysLeft <= 1 && <span className="urgent-badge">Urgent</span>}
                    </div>

                    <p className="description">{assignment.description}</p>

                    <div className="assignment-meta">
                      <div className="meta-item">
                        <LuCalendar className="icon" />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()} at {assignment.dueTime}</span>
                      </div>
                      <div className="meta-item">
                        <LuClock className="icon" />
                        <span>{daysLeft} days left</span>
                      </div>
                      <div className="meta-item">
                        <span className="points">{assignment.points} points</span>
                      </div>
                    </div>

                    <button className="submit-btn" onClick={() => handleUpload(assignment)}>
                      <MdUpload className="icon" />
                      Submit Assignment
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'submitted' && (
            <div className="assignments-list">
              {assignments.submitted.map(assignment => (
                <div key={assignment.id} className="assignment-card submitted">
                  <div className="assignment-header">
                    <div className="icon-wrapper submitted">
                      <MdCheckCircle className="icon" />
                    </div>
                    <div className="assignment-info">
                      <h3>{assignment.title}</h3>
                      <div className="course-tag">
                        <HiOutlineBookOpen className="icon" />
                        <span>{assignment.course} ({assignment.courseCode})</span>
                      </div>
                    </div>
                    <span className="status-badge">{assignment.status}</span>
                  </div>

                  <div className="assignment-meta">
                    <div className="meta-item">
                      <span>Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                      <span>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                      <span className="points">{assignment.points} points</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'graded' && (
            <div className="assignments-list">
              {assignments.graded.map(assignment => (
                <div key={assignment.id} className="assignment-card graded">
                  <div className="assignment-header">
                    <div className="icon-wrapper graded">
                      <MdCheckCircle className="icon" />
                    </div>
                    <div className="assignment-info">
                      <h3>{assignment.title}</h3>
                      <div className="course-tag">
                        <HiOutlineBookOpen className="icon" />
                        <span>{assignment.course} ({assignment.courseCode})</span>
                      </div>
                    </div>
                    <div className="grade-badge">
                      <span className="score">{assignment.score}/{assignment.points}</span>
                      <span className="percentage">({Math.round(assignment.score / assignment.points * 100)}%)</span>
                    </div>
                  </div>

                  <div className="feedback-section">
                    <h4>Instructor Feedback:</h4>
                    <p>{assignment.feedback}</p>
                  </div>

                  <div className="assignment-meta">
                    <div className="meta-item">
                      <span>Graded: {new Date(assignment.gradedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedAssignment && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Submit Assignment</h3>
              <button onClick={() => setShowUploadModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <h4>{selectedAssignment.title}</h4>
              <p className="course">{selectedAssignment.course}</p>
              
              <div className="upload-area">
                <BiPaperclip className="upload-icon" />
                <p>Drag and drop your file here or click to browse</p>
                <input type="file" />
              </div>

              <div className="form-group">
                <label>Comments (Optional)</label>
                <textarea placeholder="Add any comments for your instructor..." rows="4"></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
              <button className="btn-submit">Submit Assignment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
