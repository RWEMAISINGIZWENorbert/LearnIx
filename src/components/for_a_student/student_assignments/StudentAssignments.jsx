import './StudentAssignments.css';
import { MdOutlineAssignment, MdUpload, MdCheckCircle } from 'react-icons/md';
import { LuClock, LuCalendar } from 'react-icons/lu';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BiPaperclip } from 'react-icons/bi';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchAssignments, 
  selectAssignments,
  selectAssignmentsLoading,
  selectAssignmentsError,
  selectGradedAssignments,
  selectPendingAssignments,
  selectSubmittedAssignments
} from '../../../features/assignement/assignementSlice';
import { submitAssignment } from '../../../features/submissions/submissionSlice';



export const StudentAssignments = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [comment, setComment] = useState('');

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

  // const { 
  //   pendingAssignments = [], 
  //   submittedAssignments = [], 
  //   gradedAssignments = [],
  //   loading,
  //   error 
  // } = useSelector((state) => ({
  //   // ...state.assignments,
  //   loading: selectAssignmentsLoading(state),
  //   error: selectAssignmentsError(state)
  // }));
  const loading = useSelector(selectAssignmentsLoading);
  const error = useSelector(selectAssignmentsError);
  const pendingAssignments =  useSelector(selectPendingAssignments);
  const submittedAssignments =  useSelector(selectSubmittedAssignments);
  const gradedAssignments =  useSelector(selectGradedAssignments);

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

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

 const getCurrentAssignments = () => {
    switch (activeTab) {
      case 'pending':
        return pendingAssignments;
      case 'submitted':
        return submittedAssignments;
      case 'graded':
        return gradedAssignments;
      default:
        return [];
    }
  };


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmitAssignment = async (assignmentId, formData) => {
   try {
    // Add assignmentId to the formData
    console.log(`formData Description ${formData.get('description')}`);
    console.log(`formData AssignmentIdssi ${formData.get('assignmentId')}`);
    console.log(`formData Submission ${formData.get('submission')}`);

    const submissionData = {
      ...formData,
      assignmentId
    };
    
    // Dispatch the submitAssignment action
    const resultAction = dispatch(submitAssignment(formData));
    
    // Check if the submission was successful
    if (submitAssignment.fulfilled != null) {
      // Refresh the assignments to update the UI
      dispatch(fetchAssignments());
      // Close the modal
      setShowUploadModal(false);
      // Show success message
      alert('Assignment submitted successfully!');
    }
  } catch (error) {
    console.error('Error submitting assignment:', error);
    alert('Failed to submit assignment. Please try again.');
  }
};

  
  const currentAssignments = getCurrentAssignments();
  if (loading) return <div className="loading">Loading assignments...</div>;
  if (error) return <div className="error">Error: {error}</div>;
   

  return (
    <div className='studentAssignments'>
      <div className="assignments-header">
        <div className="header-content">
          <h1>My Assignments</h1>
          <p>Track, submit, and manage your course assignments</p>
        </div>
        <div className="stats-cards">
          <div className="stat-card pending-stat">
            <div className="stat-number">{pendingAssignments.length}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card submitted-stat">
            <div className="stat-number">{submittedAssignments.length}</div>
            <div className="stat-label">Submitted</div>
          </div>
          <div className="stat-card graded-stat">
            <div className="stat-number">{gradedAssignments.length}</div>
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
            Pending ({pendingAssignments.length})
          </button>
          <button 
            className={activeTab === 'submitted' ? 'active' : ''}
            onClick={() => setActiveTab('submitted')}
          >
            <MdUpload className="tab-icon" />
            Submitted ({submittedAssignments.length})
          </button>
          <button 
            className={activeTab === 'graded' ? 'active' : ''}
            onClick={() => setActiveTab('graded')}
          >
            <MdCheckCircle className="tab-icon" />
            Graded ({gradedAssignments.length})
          </button>
        </div>

        <div className="content">
          {activeTab === 'pending' && (
            <div className="assignments-list">
               {pendingAssignments.length > 0 ? pendingAssignments.map(assignment => {
                const daysLeft = getDaysUntilDue(assignment.dueDate);
                return (
                  <div key={assignment._id} className={`assignment-card ${assignment.urgent ? 'urgent' : ''}`}>
                    <div className="assignment-header">
                      <div className="icon-wrapper">
                        <MdOutlineAssignment className="icon" />
                      </div>
                      <div className="assignment-info">
                        <h3>{assignment.title}</h3>
                        <div className="course-tag">
                          <HiOutlineBookOpen className="icon" />
                          <span>{assignment.subject} {assignment.courseCode}</span>
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
              }): ( <p> No Pending Assignment Found</p> )}
            </div>
          ) }

          {activeTab === 'submitted' && (
            <div className="assignments-list">
              {submittedAssignments.map(assignment => (
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
              {gradedAssignments.map(assignment => (
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
            <form 
             onSubmit={(e) => {
                 e.preventDefault();
                 const formData = new FormData(e.target);
                 formData.append('submission', uploadedFile); 
                 formData.append('assignmentId', selectedAssignment._id);
                 formData.append('description', comment);
                 handleSubmitAssignment(selectedAssignment._id, formData);
             }}>
            <div className="modal-body">
              <h4>{selectedAssignment.title}</h4>
              <p className="course">{selectedAssignment.course}</p>
              
              <div className="upload-area" onClick={() => document.getElementById('file-upload').click()}>
                <BiPaperclip className="upload-icon" />
                <p>{uploadedFile ? uploadedFile.name : 'Drag and drop your file here or click to browse'}</p>
                <input 
                  id="file-upload"
                  type="file" 
                  onChange={(e) => {if (e.target.files && e.target.files[0]) {
                      setUploadedFile(e.target.files[0]);
                  }}}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.mp3,.wav,.m4a,.ogg,.mp4,.avi,.mov,.mkv,.webm"
                />
              </div>

              <div className="form-group">
                <label>Comments (Optional)</label>
                <textarea 
                placeholder="Add any comments for your instructor..." 
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
              <button className="btn-submit">Submit Assignment</button>
            </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
