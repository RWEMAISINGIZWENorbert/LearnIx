import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AssignmentSubmissions.css';
import { FaArrowLeft, FaDownload, FaCheck, FaTimes } from 'react-icons/fa';
import { LuCalendar, LuClock, LuFileText ,  LuDownload, LuEye } from 'react-icons/lu';
import { MdOutlineAssignment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubmissionsByAssignment, selectAssignmentSubmissions, gradeSubmission } from '../../../features/submissions/submissionSlice';
import FileViewer from '../../Docs/FileViewer';

export const AssignmentSubmissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignmentId } = useParams();
  const [grade, setGrade] = useState(0);
  const [feedback, setFeedBack] = useState("");
  const [viewedDocument, setViewedDocument] = useState(null);


  const { 
    loading, 
    error,
    currentAssignment 
  } = useSelector((state) => state.submissions);
  const submissions = useSelector(selectAssignmentSubmissions);
  
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
  
  const [selectedSubmission, setSelectedSubmission] = useState(submissions.length === 0 ? null : submissions[0]);

    useEffect(() => {
    if (assignmentId) {
      dispatch(fetchSubmissionsByAssignment(assignmentId));
      setSelectedSubmission(submissions.length === 0 ? null : submissions[0]);
      setGrade(submissions.length === 0 ? null : submissions[0].grade);
      setFeedBack(submissions.length === 0 ? null : submissions[0].feedback);
    }
    () => navigate(-1)
  }, [dispatch, assignmentId]);

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
     dispatch(gradeSubmission({
      submissionId: id,
      grade,
      feedback
     }));
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

  const handleDownloadDocument = async (doc) => {
    // In a real application, this would trigger a file download
    if (doc.fileUrl) {
      // const fileURL = URL.createObjectURL(doc.fileUrl);
      const fileURL = doc.fileUrl;
      const fileType = doc.fileUrl?.split('.').pop().toLowerCase();
      const title = doc.title || doc.name;
      const fileName = title + '.' + fileType;
      //  alert(`The File Name to download  ${fileName}`);
      const response = await fetch(fileURL);
      const blob = await response.blob();

       const link = document.createElement("a");
       link.href = URL.createObjectURL(blob);
       link.download = fileName;

       document.body.appendChild(link);
       link.click();
       link.remove();
    } else {
      alert(`Downloading: ${doc.name}`);
    }
  };

  const handleViewDocument = (document) => {
    if (document.fileUrl) {
       console.log(`The Document File Url ${document.fileUrl}`);
      setViewedDocument(document);
    } else {
      alert(`Viewing: ${document.name}\nThis would open the document in a viewer.`);
    }
  };

  if (viewedDocument) {
      return (
      <div style={{ width: '70%', height: '100vh', padding: '20px', transform: 'translateX(20vw)' }}>
        <button 
          onClick={() => setViewedDocument(null)} 
          style={{ marginBottom: '10px', padding: '5px 10px' }}
        >
          ← Back to Documents
        </button>
        <FileViewer url={viewedDocument.fileUrl} />
      </div>
     );
    }


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
              <span>{submissions.length} Submitted</span>
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
                key={submission._id} 
                className={`submission_card ${submission.status} ${selectedSubmission?.id === submission.id ? 'active' : ''}`}
                onClick={() => {setSelectedSubmission(submission), setGrade(submission.grade), setFeedBack(submission.feedback)}}
              >
                <div className="student_info">
                  <div className="student_avatar">
                    <img src={`${import.meta.env.BASE_URL}assets/profile_pic_blank.png` } alt={submission.studentName} />
                  </div>
                  <div className="student_details">
                    <h4>{submission.studentName}</h4>
                    {/* <p className="student_id">{submission.studentId}</p> */}
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
                      <span>{submission.createdAt}</span>
                    </div>
                    <div className="meta_item">
                      <LuFileText className="icon" />
                      <span>{submission.fileName}</span>
                    </div>
                  </div>
                )}

                {submission.grade && (
                  <div className="graded_badge">
                    Graded: {submission.grade}/100
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

              {/* {selectedSubmission.status === "submitted" ? ( */}
              {selectedSubmission.studentId !== "" ? (
                <>
                  <div className="submitted_work">
                    <div className="file_preview">
                      <LuFileText className="file_icon" />
                      <div className="file_info">
                        <h4>{selectedSubmission.fileName}</h4>
                        <p>Submitted on {formatDate(selectedSubmission.createdAt)}</p>
                      </div>
                     {/* { selectedSubmission.fileUrl ? <button 
                      className="download_btn"
                      onClick={() => handleViewDocument(selectedSubmission)}
                      >
                        <FaDownload /> Download
                      </button>  : null  
                    }  */}
                     { selectedSubmission.fileUrl ?
                      <div className="document_actions">
                       <button className="view" onClick={() => handleViewDocument(selectedSubmission)} title="View document"><LuEye /></button>
                       <button className="download" onClick={() => handleDownloadDocument(selectedSubmission)} title="Download document"><LuDownload /></button>
                      </div>  : null  
                    } 
                    </div>
                  </div>

                  <div className="grading_form">
                    <div className="form_group">
                      <label>Marks (out of 100)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        placeholder="Enter marks"
                      />
                    </div>

                    <div className="form_group">
                      <label>Feedback</label>
                      <textarea
                        rows="5"
                        value={feedback}
                        onChange={(e) => setFeedBack(e.target.value)}
                        placeholder="Provide feedback to the student..."
                      />
                    </div>

                    <button 
                      className="save_grade_btn"
                      onClick={() => handleSaveGrade(selectedSubmission._id)}
                      disabled={grade == 0 || grade == null}
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
