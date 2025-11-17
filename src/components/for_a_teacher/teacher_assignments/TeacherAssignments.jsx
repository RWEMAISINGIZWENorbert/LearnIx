import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherAssignments.css';
import { MdOutlineAssignment, MdAdd, MdCheckCircle, MdPending } from 'react-icons/md';
import { LuClock, LuCalendar, LuUpload, LuX, LuMic, LuTrash2 } from 'react-icons/lu';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { FaUsers, FaPause, FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { 
  fetchAssignments, 
  createAssignment,
  selectAssignments,
  selectAssignmentsLoading,
  selectAssignmentsError
} from '../../../features/assignement/assignementSlice';

export const TeacherAssignments = () => {
 
  const dispatch = useDispatch();
  const assignments = useSelector(selectAssignments);
  const loading = useSelector(selectAssignmentsLoading);
  const error = useSelector(selectAssignmentsError);

   useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch, fetchAssignments ]);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');
  const [assignmentClass, setAssignmentClass] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  
  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayTime, setCurrentPlayTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const playbackTimerRef = useRef(null);

  // Audio recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioURL(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(timerRef.current);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setAudioBlob(null);
    setAudioURL(null);
    clearInterval(timerRef.current);
    audioChunksRef.current = [];
  };

  const deleteAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    clearInterval(playbackTimerRef.current);
    setAudioBlob(null);
    setAudioURL(null);
    setRecordingTime(0);
    setIsPlaying(false);
    setCurrentPlayTime(0);
    setAudioDuration(0);
  };

  const togglePlayPause = () => {
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new Audio(audioURL);
      audioPlayerRef.current.onloadedmetadata = () => {
        setAudioDuration(Math.floor(audioPlayerRef.current.duration));
      };
      audioPlayerRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentPlayTime(0);
        clearInterval(playbackTimerRef.current);
      };
    }

    if (isPlaying) {
      audioPlayerRef.current.pause();
      clearInterval(playbackTimerRef.current);
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
      playbackTimerRef.current = setInterval(() => {
        if (audioPlayerRef.current) {
          setCurrentPlayTime(Math.floor(audioPlayerRef.current.currentTime));
        }
      }, 100);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleCreateAssignment = () => {
         if (!assignmentTitle || !assignmentDueDate || !assignmentClass) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Handle assignment creation logic here
    console.log({
      title: assignmentTitle,
      description: assignmentDescription,
      dueDate: assignmentDueDate,
      class: assignmentClass,
      file: uploadedFile,
      audio: audioBlob
    });

    let formDataToSend = new FormData();
    formDataToSend.append('title', assignmentTitle);
    formDataToSend.append('description', assignmentDescription);
    formDataToSend.append('dueDate', assignmentDueDate);
    formDataToSend.append('assignment', uploadedFile);
    try {
      dispatch(createAssignment(formDataToSend));
       alert('Assignment created successfully!');
       setShowCreateModal(false);
      // Reset form
      setAssignmentTitle('');
      setAssignmentDescription('');
      setAssignmentDueDate('');
      setAssignmentClass('');
      setUploadedFile(null);
      cancelRecording();
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
    
    // // Reset form
    // setShowCreateModal(false);
    // setAssignmentTitle('');
    // setAssignmentDescription('');
    // setAssignmentDueDate('');
    // setAssignmentClass('');
    // setUploadedFile(null);
    // cancelRecording();
    
    alert('Assignment created successfully!');
  };

  // const assignments = {
  //   active: [
  //     {
  //       id: 1,
  //       title: 'React Component Design',
  //       course: 'Web Development',
  //       courseCode: 'CS301',
  //       dueDate: '2025-11-15',
  //       submitted: 18,
  //       total: 24,
  //       pending: 6,
  //       graded: 12,
  //       color: '#3b82f6'
  //     },
  //     {
  //       id: 2,
  //       title: 'Database Normalization',
  //       course: 'Database Systems',
  //       courseCode: 'CS302',
  //       dueDate: '2025-11-18',
  //       submitted: 20,
  //       total: 26,
  //       pending: 8,
  //       graded: 12,
  //       color: '#10b981'
  //     },
  //     {
  //       id: 3,
  //       title: 'UML Class Diagrams',
  //       course: 'Software Engineering',
  //       courseCode: 'CS401',
  //       dueDate: '2025-11-20',
  //       submitted: 15,
  //       total: 22,
  //       pending: 5,
  //       graded: 10,
  //       color: '#8b5cf6'
  //     }
  //   ],
  //   completed: [
  //     {
  //       id: 4,
  //       title: 'HTML/CSS Project',
  //       course: 'Web Development',
  //       courseCode: 'CS301',
  //       completedDate: '2025-10-20',
  //       submitted: 24,
  //       total: 24,
  //       avgGrade: 88,
  //       color: '#3b82f6'
  //     },
  //     {
  //       id: 5,
  //       title: 'SQL Queries Exercise',
  //       course: 'Database Systems',
  //       courseCode: 'CS302',
  //       completedDate: '2025-10-15',
  //       submitted: 26,
  //       total: 26,
  //       avgGrade: 85,
  //       color: '#10b981'
  //     }
  //   ]
  // };
   
  const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return '';
  const date = new Date(dateTimeString);
  // Get date components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  
  // Get time components
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}-${month}-${year} ${hours}:${minutes}`;
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
            Active ({assignments.filter(e => e.status === 'active').length})
          </button>
          <button 
            className={activeTab === 'completed' ? 'active' : ''}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({assignments.filter(e => e.status === 'completed').length})
          </button>
          <button className="create-btn" onClick={() => setShowCreateModal(true)}>
            <MdAdd className="icon" /> Create Assignment
          </button>
        </div>
        {loading && <div className="loading">Loading assignments...</div>}
        {error && <div className="error">{error}</div>}
        <div className="assignments-grid">
          {activeTab === 'active' && assignments.filter(e => e.status === 'active').length > 0 ?
           assignments.filter(e => e.status === 'active').map((assignment) => (
            <div key={assignment._id} className="assignment-card">
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
                  <span>Due: {formatDateTime(assignment.dueDate)}</span>
                </div>
                <div className="detail-row">
                  <FaUsers className="icon" />
                  <span>{assignment.submitted}/{assignment.total} submitted</span>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span>Submission Progress</span>
                  <span className="progress-value">{assignment.submitted > 0 ? Math.round((assignment.submitted / assignment.total) * 100) : 0}%</span>
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

              <button className="view-btn" style={{background: assignment.color}} onClick={() => navigate(`/teacher/assignments/${assignment._id || assignment.id}/submissions`)}>View Submissions</button>
            </div>
          )) : <p>No assignments found</p>}

          {activeTab === 'completed' && assignments.filter(e => e.status === 'completed').length > 0 
          && assignments.filter(e => e.status === 'completed').map((assignment) => (
            <div key={assignment._id} className="assignment-card">
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

              <button className="view-btn" style={{background: assignment.color}} onClick={() => navigate(`/teacher/assignments/${assignment.id}/submissions`)}>View Details</button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="assignment_modal_overlay" onClick={() => setShowCreateModal(false)}>
          <div className="assignment_modal" onClick={(e) => e.stopPropagation()}>
            <div className="assignment_modal_header">
              <h3>Create New Assignment</h3>
              <button className="assignment_modal_close" onClick={() => setShowCreateModal(false)}>×</button>
            </div>

            <div className="assignment_modal_body">
              <div className="form_group">
                <label>Title <span className="required">*</span></label>
                <input
                  type="text"
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  placeholder="Enter assignment title"
                  required
                />
              </div>

              <div className="form_group">
                <label>Description</label>
                <textarea
                  rows="4"
                  value={assignmentDescription}
                  onChange={(e) => setAssignmentDescription(e.target.value)}
                  placeholder="Describe the assignment requirements..."
                />
              </div>

              <div className="form_row">
                <div className="form_field">
                  <label>Due Date <span className="required">*</span></label>
                  <input
                    type="datetime-local"
                    value={assignmentDueDate}
                    onChange={(e) => setAssignmentDueDate(e.target.value)}
                  />
                </div>

                <div className="form_field">
                  <label>Class <span className="required">*</span></label>
                  <select value={assignmentClass} onChange={(e) => setAssignmentClass(e.target.value)}>
                    <option value="">Select class</option>
                    <option value="L5 SOD A">L5 SOD A</option>
                    <option value="L5 SOD B">L5 SOD B</option>
                    <option value="L6 SOD A">L6 SOD A</option>
                    <option value="L6 SOD B">L6 SOD B</option>
                  </select>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="form_group">
                <label>Attach File (Optional)</label>
                <div className="file_upload_area">
                  <input
                    type="file"
                    id="assignmentFile"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.mp3,.wav,.m4a,.ogg,.mp4,.avi,.mov,.mkv,.webm"
                  />
                  <button 
                    className="upload_file_btn" 
                    onClick={() => document.getElementById('assignmentFile').click()}
                  >
                    <LuUpload className="icon" />
                    {uploadedFile ? uploadedFile.name : 'Choose file to upload'}
                  </button>
                  {uploadedFile && (
                    <button className="remove_file_btn" onClick={() => setUploadedFile(null)}>
                      <LuX /> Remove
                    </button>
                  )}
                </div>
              </div>

              {/* WhatsApp-style Audio Recording */}
              <div className="form_group">
                <label>Voice Note (Optional)</label>
                <div className="audio_recording_area">
                  {!audioURL && !isRecording && (
                    <button className="record_btn start" onClick={startRecording}>
                      <LuMic className="icon" />
                      Press to Record
                    </button>
                  )}

                  {isRecording && (
                    <div className="recording_active">
                      <div className="recording_indicator">
                        <span className="recording_dot"></span>
                        <span className="recording_time">{formatTime(recordingTime)}</span>
                      </div>
                      <div className="recording_controls">
                        <button className="record_btn stop" onClick={stopRecording}>
                          <FaPlay className="icon" />
                          Stop
                        </button>
                        <button className="record_btn cancel" onClick={cancelRecording}>
                          <LuTrash2 className="icon" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {audioURL && !isRecording && (
                    <div className="whatsapp_audio_preview">
                      <button className="play_pause_btn" onClick={togglePlayPause}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                      <div className="audio_waveform">
                        <div className="waveform_bars">
                          {[3, 8, 4, 9, 5, 12, 7, 10, 6, 11, 4, 8, 5, 9, 6, 10, 7, 8, 5, 9, 4, 7, 6, 8, 5, 9, 7, 10, 6, 8].map((height, i) => (
                            <div 
                              key={i} 
                              className="bar" 
                              style={{ 
                                height: `${height}px`,
                                background: i < (currentPlayTime / audioDuration * 30) ? 'var(--main_color)' : '#d1d5db'
                              }}
                            ></div>
                          ))}
                        </div>
                        <div className="audio_times">
                          <span className="current_time">{formatTime(currentPlayTime)}</span>
                          <span className="total_time">{formatTime(audioDuration || recordingTime)}</span>
                        </div>
                      </div>
                      <button className="delete_audio_icon_btn" onClick={deleteAudio}>
                        <LuTrash2 />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="assignment_modal_footer">
              <button className="cancel_btn" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button 
                className="submit_btn" 
                onClick={handleCreateAssignment}
                disabled={!assignmentTitle || !assignmentDueDate || !assignmentClass}
              >
                Create Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
