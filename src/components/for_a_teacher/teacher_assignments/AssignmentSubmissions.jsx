import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AssignmentSubmissions.css';
import { FaArrowLeft, FaDownload, FaCheck, FaTimes } from 'react-icons/fa';
import { LuCalendar, LuClock, LuFileText } from 'react-icons/lu';
import { MdOutlineAssignment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubmissionsByAssignment } from '../../../features/submissions/submissionSlice';

export const AssignmentSubmissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignmentId } = useParams();

  const { 
    submissions, 
    loading, 
    error,
    currentAssignment 
  } = useSelector((state) => state.submissions);
  
  // const [submissions, setSubmissions] = useState([
  //   {
  //     id: 1,
  //     studentId: "STU001",
  //     studentName: "John Doe",
  //     submittedAt: "2025-11-10 14:32",
  //     status: "submitted",
  //     fileUrl: "assignment_john.pdf",
  //     fileName: "React_Component_Design.pdf",
  //     marks: "",
  //     feedback: "",
  //     profilePic: "profile_pic_blank.png"
  //   },
  //   {
  //     id: 2,
  //     studentId: "STU002",
  //     studentName: "Jane Smith",
  //     submittedAt: "2025-11-09 10:15",
  //     status: "submitted",
  //     fileUrl: "assignment_jane.pdf",
  //     fileName: "Component_Design_Final.pdf",
  //     marks: "",
  //     feedback: "",
  //     profilePic: "profile_pic_blank.png"
  //   },
  //   {
  //     id: 3,
  //     studentId: "STU003",
  //     studentName: "Mike Johnson",
  //     submittedAt: "2025-11-11 16:45",
  //     status: "submitted",
  //     fileUrl: "assignment_mike.zip",
  //     fileName: "React_Project.zip",
  //     marks: "",
  //     feedback: "",
  //     profilePic: "profile_pic_blank.png"
  //   },
  //   {
  //     id: 4,
  //     studentId: "STU004",
  //     studentName: "Sarah Wilson",
  //     submittedAt: "",
  //     status: "pending",
  //     fileUrl: "",
  //     fileName: "",
  //     marks: "",
  //     feedback: "",
  //     profilePic: "profile_pic_blank.png"
  //   },
  //   {
  //     id: 5,
  //     studentId: "STU005",
  //     studentName: "David Brown",
  //     submittedAt: "2025-11-12 09:20",
  //     status: "submitted",
  //     fileUrl: "assignment_david.pdf",
  //     fileName: "Assignment_Submission.pdf",
  //     marks: "",
  //     feedback: "",
  //     profilePic: "profile_pic_blank.png"
  //   },
  //   {
  //     id: 6,
  //     studentId: "STU006",
  //     studentName: "Emily Davis",
  //     submittedAt: "",
  //     status: "pending",
  //     fileUrl: "",
  //     fileName: "",
  //     marks: "",
  //     feedback: "",
  //     profilePic: "profile_pic_blank.png"
  //   }
  // ]);
  
  useEffect(() => {
    if (assignmentId) {
      dispatch(fetchSubmissionsByAssignment(assignmentId));
    }
  }, [dispatch, assignmentId]);

  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // const handleMarksChange = (id, value) => {
  //   setSubmissions(submissions.map(sub => 
  //     sub.id === id ? { ...sub, marks: value } : sub
  //   ));
  // };

  // const handleFeedbackChange = (id, value) => {
  //   setSubmissions(submissions.map(sub => 
  //     sub.id === id ? { ...sub, feedback: value } : sub
  //   ));
  // };

  const handleSaveGrade = (id) => {
    const submission = submissions.find(sub => sub.id === id);
    if (submission.marks) {
      alert(`Grade saved: ${submission.marks}/100 for ${submission.studentName}`);
    }
  };

  const submittedCount = submissions.filter(s => s.status === "submitted").length;
  const pendingCount = submissions.filter(s => s.status === "pending").length;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };


  if (loading) return <div className="loading">Loading submissions...</div>;
  if (error) return <div className="error">Error: {error}</div>;


  return (
    <div className='assignmentSubmissions'>
      <div className="box">
        {/* Header */}
        <div className="submissions_header">
          <button className="back_btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back to Assignments
          </button>
          <div className="assignment_info">
            <h2><MdOutlineAssignment className="icon" /> React Component Design</h2>
            <p>CS301 - Web Development</p>
          </div>
          <div className="stats_summary">
            <div className="stat_item submitted">
              <FaCheck className="icon" />
              <span>{submittedCount} Submitted</span>
            </div>
            <div className="stat_item pending">
              <FaTimes className="icon" />
              <span>{pendingCount} Pending</span>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="submissions_container">
          <div className="submissions_list">
            {submissions.map((submission) => (
              <div 
                key={submission.id} 
                className={`submission_card ${submission.status} ${selectedSubmission?.id === submission.id ? 'active' : ''}`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="student_info">
                  <div className="student_avatar">
                    <img src={`${import.meta.env.BASE_URL}assets/${submission.profilePic}`} alt={submission.studentName} />
                  </div>
                  <div className="student_details">
                    <h4>{submission.studentName}</h4>
                    <p className="student_id">{submission.studentId}</p>
                  </div>
                  <div className={`status_badge ${submission.status}`}>
                    {submission.status === "submitted" ? <FaCheck /> : <FaTimes />}
                    {submission.status}
                  </div>
                </div>

                {submission.status === "submitted" && (
                  <div className="submission_meta">
                    <div className="meta_item">
                      <LuCalendar className="icon" />
                      <span>{submission.submittedAt}</span>
                    </div>
                    <div className="meta_item">
                      <LuFileText className="icon" />
                      <span>{submission.fileName}</span>
                    </div>
                  </div>
                )}

                {submission.marks && (
                  <div className="graded_badge">
                    Graded: {submission.marks}/100
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Grading Panel */}
          {selectedSubmission && (
            <div className="grading_panel">
              <div className="panel_header">
                <h3>Grade Submission</h3>
                <p>{selectedSubmission.studentName} - {selectedSubmission.studentId}</p>
              </div>

              {selectedSubmission.status === "submitted" ? (
                <>
                  <div className="submitted_work">
                    <div className="file_preview">
                      <LuFileText className="file_icon" />
                      <div className="file_info">
                        <h4>{selectedSubmission.fileName}</h4>
                        <p>Submitted on {selectedSubmission.submittedAt}</p>
                      </div>
                      <button className="download_btn">
                        <FaDownload /> Download
                      </button>
                    </div>
                  </div>

                  <div className="grading_form">
                    <div className="form_group">
                      <label>Marks (out of 100)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={selectedSubmission.marks}
                        onChange={(e) => handleMarksChange(selectedSubmission.id, e.target.value)}
                        placeholder="Enter marks"
                      />
                    </div>

                    <div className="form_group">
                      <label>Feedback</label>
                      <textarea
                        rows="5"
                        value={selectedSubmission.feedback}
                        onChange={(e) => handleFeedbackChange(selectedSubmission.id, e.target.value)}
                        placeholder="Provide feedback to the student..."
                      />
                    </div>

                    <button 
                      className="save_grade_btn"
                      onClick={() => handleSaveGrade(selectedSubmission.id)}
                      disabled={!selectedSubmission.marks}
                    >
                      <FaCheck /> Save Grade
                    </button>
                  </div>
                </>
              ) : (
                <div className="no_submission">
                  <FaTimes className="icon" />
                  <h4>No Submission Yet</h4>
                  <p>This student hasn't submitted their work.</p>
                </div>
              )}
            </div>
          )}

          {!selectedSubmission && (
            <div className="no_selection">
              <MdOutlineAssignment className="icon" />
              <h3>Select a Submission</h3>
              <p>Click on a student to view and grade their submission</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
