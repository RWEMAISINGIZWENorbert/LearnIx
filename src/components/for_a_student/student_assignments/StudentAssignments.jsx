import './StudentAssignments.css';
import { MdOutlineAssignment, MdUpload, MdCheckCircle } from 'react-icons/md';
import { LuClock, LuCalendar } from 'react-icons/lu';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BiPaperclip } from 'react-icons/bi';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Prompt } from '../../shared/Prompt';
import { 
  fetchAssignments, 
  selectAssignments,
  selectAssignmentsLoading,
  selectAssignmentsError,
  selectGradedAssignments,
  selectPendingAssignments,
  selectSubmittedAssignments
} from '../../../features/assignement/assignementSlice';
import { selectSubmissionsLoading, selectSubmissionsError,submitAssignment } from '../../../features/submissions/submissionSlice';



export const StudentAssignments = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [comment, setComment] = useState('');

  const [promptOpen, setPromptOpen] = useState(false);
  const [prompt, setPrompt] = useState({ variant: 'success', title: '', message: '' });

  const openPrompt = useCallback((variant, title, message) => {
    setPrompt({ variant, title, message });
    setPromptOpen(true);
  }, []);


  const loading = useSelector(selectAssignmentsLoading);
  const error = useSelector(selectAssignmentsError);
  const pendingAssignments =  useSelector(selectPendingAssignments);
  const submittedAssignments =  useSelector(selectSubmittedAssignments);
  const gradedAssignments =  useSelector(selectGradedAssignments);

  const submissionsLoading = useSelector(selectSubmissionsLoading);
  const submissionsError = useSelector(selectSubmissionsError);

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
    const submissionData = new FormData();
    submissionData.append('assignmentId', assignmentId);
    submissionData.append('description', formData.get('description') || '');
    submissionData.append('submission', formData.get('submission'));
    console.log(`Call To submit Assignment`);
    const resultAction = await dispatch(submitAssignment(submissionData));
    
    if (submitAssignment.fulfilled.match(resultAction)) {
      // Refresh assignments to update the UI
      await dispatch(fetchAssignments());
      // Close the modal and reset form
      setShowUploadModal(false);
      setUploadedFile(null);
      setComment('');
      // Show success message
      openPrompt('success', 'Success', 'Assignment submitted successfully!');
    } else if (submitAssignment.rejected.match(resultAction)) {
      // Error is already handled in the slice
      console.error('Submission failed:', resultAction.error);
    }
  } catch (error) {
    console.error('Error in submission process:', error);
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
                const isExpired = new Date(assignment.dueDate) <= new Date();
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
                      {/* {daysLeft <= 1 && <span className="urgent-badge">Urgent</span>} */}
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
                      {/* <div className="meta-item">
                        <span className="points">{assignment.grade} points</span>
                      </div> */}
                    </div>

                    <button 
                    className="submit-btn" 
                    style={isExpired ? {background: "#cfcfcfff"}: {}}
                    onClick={() => handleUpload(assignment)}
                    disabled = {isExpired}
                    >
                      {!isExpired ? <MdUpload className="icon" /> : null}
                      { isExpired ? 'Expired':  'Submit Assignment' }
                      
                    </button>
                  </div>
                );
              }): ( <p> No Pending Assignment Found</p> )}
            </div>
          ) }

          {activeTab === 'submitted' && (
            <div className="assignments-list">
              {submittedAssignments.map(assignment => { 
                const isExpired = new Date(assignment.dueDate) <= new Date();
                return (
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
                    {/* <span className="status-badge">{assignment.status}</span> */}
                    <span className="status-badge">{isExpired ? 'Completed' : 'Active'}</span>
                  </div>

                  <div className="assignment-meta">
                    <div className="meta-item">
                      <span>Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                      <span>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                    { (assignment.points || assignment.grade) && <span className="points">{Number(assignment.points) || Number(assignment.grade)} points</span>}
                    </div>
                  </div>
                </div>
              )})}
            </div>
          )}

          {activeTab === 'graded' && (
            <div className="assignments-list">
              {gradedAssignments.map(assignment => {
                const isExpired = new Date(assignment.dueDate) <= new Date();
                return (
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
                      <span className="score">{Number(assignment.grade)}/{assignment.score || 100}</span>
                      <span className="percentage">({Math.round(Number(assignment.grade) / (assignment.score || 100) * 100)}%)</span>
                    </div>
                  </div>

                  <div className="feedback-section">
                    <h4>Instructor Feedback:</h4>
                    <p>{assignment.feedback || assignment.feedBack}</p>
                  </div>

                  <div className="assignment-meta">
                    <div className="meta-item">
                      <span>Graded: {new Date(assignment.gradedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="upload_modal_overlay" onClick={() => setShowUploadModal(false)}>
          <div className="upload_modal" onClick={(e) => e.stopPropagation()}>
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
              <button className="btn-cancel" type='button' onClick={() => setShowUploadModal(false)}>Cancel</button>
              <button 
              className="btn-submit" 
              disabled = {submissionsLoading}
              type="submit">{!submissionsLoading ? 'Submit Assignment' : 'Submitting...'}</button>
            </div>
            </form>
          </div>
        </div>
      )}

      <Prompt
        isOpen={promptOpen}
        onClose={() => setPromptOpen(false)}
        title={prompt.title}
        message={prompt.message}
        variant={prompt.variant}
      />
    </div>
  )
}
