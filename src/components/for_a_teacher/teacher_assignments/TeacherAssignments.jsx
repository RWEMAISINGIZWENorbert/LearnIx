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
  updateAssignment,
  deleteAssignment,
  selectAssignments,
  selectAssignmentsLoading,
  selectAssignmentsError
} from '../../../features/assignement/assignementSlice';
import { fetchClasses, selectAllClasses } from '../../../features/classes/classesSlice';
import { FiEdit } from 'react-icons/fi';
import { DeleteConfirmation } from '../../shared/DeleteConfirmation';


export const TeacherAssignments = () => {
 
  const dispatch = useDispatch();
  const assignments = useSelector(selectAssignments);
  const loading = useSelector(selectAssignmentsLoading);
  const error = useSelector(selectAssignmentsError);
  const classes = useSelector(selectAllClasses);

   useEffect(() => {
    dispatch(fetchAssignments());
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
      if (error && error.msg) {
        console.log(`Error: ${error}`)
            alert(error.msg);
         }
  }, [error, dispatch]);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [assignmentType, setAssignmentType] = useState('HOMEWORK');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');
  const [assignmentClass, setAssignmentClass] = useState('');
  const [assignmentClassId, setAssignmentClassId] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  // Exam scheduling
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');

  // Exam security flags
  const [securityFullscreen, setSecurityFullscreen] = useState(true);
  const [securityBlockCopyPaste, setSecurityBlockCopyPaste] = useState(true);
  const [securityDetectTabSwitch, setSecurityDetectTabSwitch] = useState(true);
  const [securityDetectScreenshot, setSecurityDetectScreenshot] = useState(false);

  const [editingAssignment, setEditingAssignment] = useState(null);


  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);


  const handleDeleteAssignment = (assignment) => {
    setAssignmentToDelete(assignment);
    setShowDeleteConfirm(true);
  };


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
    const isExam = assignmentType === 'EXAM';

    if (!assignmentTitle || !assignmentDueDate || !assignmentClass) {
      alert('Please fill in all required fields');
      return;
    }

    if (isExam && (!startDateTime || !durationMinutes)) {
      alert('Please provide start time and duration for exams');
      return;
    }
    
    // Handle assignment creation logic here
    // console.log({
    //   title: assignmentTitle,
    //   description: assignmentDescription,
    //   dueDate: assignmentDueDate,
    //   class: assignmentClass,
    //   file: uploadedFile,
    //   audio: audioBlob
    // });

    let formDataToSend = new FormData();
    formDataToSend.append('title', assignmentTitle);
    formDataToSend.append('type', assignmentType);
    formDataToSend.append('description', assignmentDescription);
    formDataToSend.append('dueDate', assignmentDueDate);

    // Targeting – link to academic structure / class
    formDataToSend.append('className', assignmentClass);
    if (assignmentClassId) {
      formDataToSend.append('classId', assignmentClassId);
    }

    // Scheduling – align with spec
    formDataToSend.append('startTime', isExam ? startDateTime : '');
    formDataToSend.append(
      'endTime',
      isExam ? (endDateTime || assignmentDueDate) : assignmentDueDate
    );
    formDataToSend.append('durationMinutes', isExam ? durationMinutes : '');

    // Security flags – used for secure exams
    formDataToSend.append('fullscreen', isExam ? securityFullscreen : false);
    formDataToSend.append('blockCopyPaste', isExam ? securityBlockCopyPaste : false);
    formDataToSend.append('detectTabSwitch', isExam ? securityDetectTabSwitch : false);
    formDataToSend.append('detectScreenshot', isExam ? securityDetectScreenshot : false);

    formDataToSend.append('assignment', uploadedFile);
    try {
      dispatch(createAssignment(formDataToSend));
      //  alert('Assignment created successfully!');
       setShowCreateModal(false);
      // Reset form
      setAssignmentType('HOMEWORK');
      setAssignmentTitle('');
      setAssignmentDescription('');
      setAssignmentDueDate('');
      setAssignmentClass('');
      setAssignmentClassId('');
      setUploadedFile(null);
      setStartDateTime('');
      setEndDateTime('');
      setDurationMinutes('');
      setSecurityFullscreen(true);
      setSecurityBlockCopyPaste(true);
      setSecurityDetectTabSwitch(true);
      setSecurityDetectScreenshot(false);
      cancelRecording();
      fetchAssignments();
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
    
    // Reset form
    setShowCreateModal(false);
    setAssignmentType('HOMEWORK');
    setAssignmentTitle('');
    setAssignmentDescription('');
    setAssignmentDueDate('');
    setAssignmentClass('');
    setAssignmentClassId('');
    setUploadedFile(null);
    setStartDateTime('');
    setEndDateTime('');
    setDurationMinutes('');
    setSecurityFullscreen(true);
    setSecurityBlockCopyPaste(true);
    setSecurityDetectTabSwitch(true);
    setSecurityDetectScreenshot(false);
    cancelRecording();
    
  };    // alert('Assignment created successfully!');

  const handleUpdateAssignment = async () => {
    const isExam = assignmentType === 'EXAM';

    if (!assignmentTitle || !assignmentDueDate || !assignmentClass) {
      alert('Please fill in all required fields');
      return;
    }

    if (isExam && (!startDateTime || !durationMinutes)) {
      alert('Please provide start time and duration for exams');
      return;
    }

    let formDataToSend = new FormData();
    formDataToSend.append('title', assignmentTitle);
    formDataToSend.append('type', assignmentType);
    formDataToSend.append('description', assignmentDescription);
    formDataToSend.append('dueDate', assignmentDueDate);

    formDataToSend.append('className', assignmentClass);
    if (assignmentClassId) {
      formDataToSend.append('classId', assignmentClassId);
    }

    formDataToSend.append('startTime', isExam ? startDateTime : '');
    formDataToSend.append(
      'endTime',
      isExam ? (endDateTime || assignmentDueDate) : assignmentDueDate
    );
    formDataToSend.append('durationMinutes', isExam ? durationMinutes : '');

    formDataToSend.append('fullscreen', isExam ? securityFullscreen : false);
    formDataToSend.append('blockCopyPaste', isExam ? securityBlockCopyPaste : false);
    formDataToSend.append('detectTabSwitch', isExam ? securityDetectTabSwitch : false);
    formDataToSend.append('detectScreenshot', isExam ? securityDetectScreenshot : false);

    formDataToSend.append('assignment', uploadedFile);

    const updatedAssignmentAction = await dispatch(updateAssignment({ id: editingAssignment._id, assignmentData: formDataToSend }));
      console.log(`Updated Assignment Action Data in the UI ${updatedAssignmentAction}`);
    if(updateAssignment.fulfilled.match(updatedAssignmentAction)) {
      setShowEditModal(false);
      setEditingAssignment(null);
      setAssignmentType('HOMEWORK');
      setAssignmentTitle('');
      setAssignmentDescription('');
      setAssignmentDueDate('');
      setAssignmentClass('');
      setAssignmentClassId('');
      setUploadedFile(null);
      setStartDateTime('');
      setEndDateTime('');
      setDurationMinutes('');
      setSecurityFullscreen(true);
      setSecurityBlockCopyPaste(true);
      setSecurityDetectTabSwitch(true);
      setSecurityDetectScreenshot(false);
      cancelRecording();
      dispatch(fetchAssignments());
      alert('Assignment updated Succesfully');
    }
  };

   
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

  //  if(loading) return <div>Loading...</div>
 //  if(error) return <div>Error: {error}</div>
  
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
        {/* {error && <div className="error">{error}</div>} */}
        <div className="assignments-grid">
          {activeTab === 'active' &&
           
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
                  {/* <span>{assignment.submitted}/{assignment.total} submitted</span> */}
                  <span>{assignment.gradedSubmissions + assignment.pendingSubmissions } submitted</span>
                </div>
              </div>

              { assignment.submissionProgress && <div className="progress-section">
                <div className="progress-header">
                  <span>Submission Progress</span>
                  <span className="progress-value">{assignment.submitted > 0 ? Math.round((assignment.submitted / assignment.total) * 100) : 0}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{width: `${(assignment.submitted / assignment.total) * 100}%`, background: assignment.color}}></div>
                </div>
              </div> }

              <div className="status-grid">
                <div className="status-item graded">
                  <MdCheckCircle className="icon" />
                  <span>{assignment.gradedSubmissions} Graded</span>
                </div>
                <div className="status-item pending">
                  <MdPending className="icon" />
                  <span>{assignment.pendingSubmissions} Pending</span>
                </div>
              </div>

              <div className="view_edit_submissions">
                <button className="view-btn" style={{background: assignment.color != null ? assignment.color : '#10b981'}} onClick={() => navigate(`/teacher/assignments/${assignment._id}/submissions`)}>View Submissions</button>
                <button className="edit-btn" 
                  onClick={() => {
                    setEditingAssignment(assignment); 
                    setAssignmentTitle(assignment.title || '');
                    setAssignmentDescription(assignment.description || '');
                    if (assignment.dueDate) {
                      const date = new Date(assignment.dueDate);
                      const formattedDate = date.toISOString().slice(0,16); // YYYY-MM-DDTHH:mm
                      setAssignmentDueDate(formattedDate);
                    } else {
                      setAssignmentDueDate('');
                    }
                    setAssignmentClass(assignment.class || '');
                    setUploadedFile(assignment.file || null);
                    setAudioBlob(assignment.audio || null);
                    setAudioURL(assignment.audioURL || null);
                    setShowEditModal(true);
                  }} 
                >
                  <FiEdit/>
                </button>
              </div>
            </div>
          ))}

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

              <button 
              className="view-btn" 
              style={{background: assignment.color != null ? assignment.color : '#8b5cf6' }} 
              onClick={() => navigate(`/teacher/assignments/${assignment.id}/submissions`)}>View Details</button>
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
                <label>Assignment Type <span className="required">*</span></label>
                <select
                  value={assignmentType}
                  onChange={(e) => setAssignmentType(e.target.value)}
                >
                  <option value="HOMEWORK">Homework or Assignment</option>
                  <option value="EXAM">Exam or Assessment</option>
                </select>
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
                  <label>Due / End Date &amp; Time <span className="required">*</span></label>
                  <input
                    type="datetime-local"
                    value={assignmentDueDate}
                    onChange={(e) => setAssignmentDueDate(e.target.value)}
                  />
                </div>

                <div className="form_field">
                  <label>Class <span className="required">*</span></label>
                  <select
                    value={assignmentClassId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setAssignmentClassId(id);
                      const cls = classes.find((c) => c._id === id);
                      setAssignmentClass(cls ? cls.name : '');
                    }}
                  >
                    <option value="">Select class</option>
                    {classes.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {assignmentType === 'EXAM' && (
                <>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Start Date &amp; Time <span className="required">*</span></label>
                      <input
                        type="datetime-local"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                      />
                    </div>
                    <div className="form_field">
                      <label>Exam End Time</label>
                      <input
                        type="datetime-local"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form_group">
                    <label>Exam Duration (minutes) <span className="required">*</span></label>
                    <input
                      type="number"
                      min="1"
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(e.target.value)}
                      placeholder="e.g. 90"
                    />
                  </div>

                  <div className="form_group">
                    <label>Security Settings</label>
                    <div className="security_options">
                      <label>
                        <input
                          type="checkbox"
                          checked={securityFullscreen}
                          onChange={(e) => setSecurityFullscreen(e.target.checked)}
                        />
                        Enforce fullscreen during exam
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={securityBlockCopyPaste}
                          onChange={(e) => setSecurityBlockCopyPaste(e.target.checked)}
                        />
                        Disable copy / paste
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={securityDetectTabSwitch}
                          onChange={(e) => setSecurityDetectTabSwitch(e.target.checked)}
                        />
                        Detect tab switching
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={securityDetectScreenshot}
                          onChange={(e) => setSecurityDetectScreenshot(e.target.checked)}
                        />
                        Detect screenshots (where supported)
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* File Upload */}
              <div className="form_group">
                <label>Attach File (Optional)</label>
                <div className="file_upload_area">
                  <input
                    type="file"
                    id="assignmentFile"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.mp3,.wav,.m4a,.ogg,.mp4,.avi,.mov,.mkv,.webm,.png,.jpeg,.jpg"
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

              {/* Audio Recording */}
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
                                background: i < (currentPlayTime / (audioDuration || 1) * 30) ? 'var(--main_color)' : '#d1d5db'
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

      {/* Update Assignment Modal */}
      {showEditModal && (
        <div className="assignment_modal_overlay" onClick={() => setShowEditModal(false)}>
          <div className="assignment_modal" onClick={(e) => e.stopPropagation()}>
            <div className="assignment_modal_header">
              <h3>Edit Assignment</h3>
              <div className="action_edit_buttons">
               <button 
                  className="assignment_modal_close" 
                  onClick={() => handleDeleteAssignment(editingAssignment)}
                >
                  <LuTrash2/>
                </button>

                <button className="assignment_modal_close" onClick={() => setShowEditModal(false)}>×</button>
              </div>
                
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
                <label>Assignment Type <span className="required">*</span></label>
                <select
                  value={assignmentType}
                  onChange={(e) => setAssignmentType(e.target.value)}
                >
                  <option value="HOMEWORK">Homework</option>
                  <option value="EXAM">Exam (Secure)</option>
                </select>
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
                  <label>Due / End Date &amp; Time <span className="required">*</span></label>
                  <input
                    type="datetime-local"
                    value={assignmentDueDate}
                    onChange={(e) => setAssignmentDueDate(e.target.value)}
                  />
                </div>

                <div className="form_field">
                  <label>Class <span className="required">*</span></label>
                  <select
                    value={assignmentClassId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setAssignmentClassId(id);
                      const cls = classes.find((c) => c._id === id);
                      setAssignmentClass(cls ? cls.name : '');
                    }}
                  >
                    <option value="">Select class</option>
                    {classes.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {assignmentType === 'EXAM' && (
                <>
                  <div className="form_row">
                    <div className="form_field">
                      <label>Start Date &amp; Time <span className="required">*</span></label>
                      <input
                        type="datetime-local"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                      />
                    </div>
                    <div className="form_field">
                      <label>Exam End Time</label>
                      <input
                        type="datetime-local"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form_group">
                    <label>Exam Duration (minutes) <span className="required">*</span></label>
                    <input
                      type="number"
                      min="1"
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(e.target.value)}
                      placeholder="e.g. 90"
                    />
                  </div>

                  <div className="form_group">
                    <label>Security Settings</label>
                    <div className="security_options">
                      <label>
                        <input
                          type="checkbox"
                          checked={securityFullscreen}
                          onChange={(e) => setSecurityFullscreen(e.target.checked)}
                        />
                        Enforce fullscreen during exam
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={securityBlockCopyPaste}
                          onChange={(e) => setSecurityBlockCopyPaste(e.target.checked)}
                        />
                        Disable copy / paste
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={securityDetectTabSwitch}
                          onChange={(e) => setSecurityDetectTabSwitch(e.target.checked)}
                        />
                        Detect tab switching
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={securityDetectScreenshot}
                          onChange={(e) => setSecurityDetectScreenshot(e.target.checked)}
                        />
                        Detect screenshots (where supported)
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* File Upload */}
              <div className="form_group">
                <label>Attach File (Optional)</label>
                <div className="file_upload_area">
                  <input
                    type="file"
                    id="editAssignmentFile"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.mp3,.wav,.m4a,.ogg,.mp4,.avi,.mov,.mkv,.webm,.png,.jpeg,.jpg"
                  />
                  <button 
                    className="upload_file_btn" 
                    onClick={() => document.getElementById('editAssignmentFile').click()}
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

              {/* Audio Recording */}
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
                                background: i < (currentPlayTime / (audioDuration || 1) * 30) ? 'var(--main_color)' : '#d1d5db'
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
              <button className="cancel_btn" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button 
                className="submit_btn" 
                onClick={handleUpdateAssignment}
                disabled={!assignmentTitle || !assignmentDueDate || !assignmentClass}
              >
               { loading ? 'Updating' : 'Update Assignment'}
              </button>
            </div>
          </div>
        </div>
      )}
      
<DeleteConfirmation
  isOpen={showDeleteConfirm}
  onClose={() => {
    setShowDeleteConfirm(false);
    setAssignmentToDelete(null);
  }}
  onConfirm={async () => {
    if (!assignmentToDelete) return;

    console.log(`Deleting assignment id: ${assignmentToDelete._id}`);

    // Here you would call API to delete the assignment
    // This is Demo Bro For now, just reset states
    // if (editingAssignment?.id === assignmentToDelete.id) {
    //   setShowEditModal(false);
    //   setEditingAssignment(null);
    // }

    try {
      const result = await dispatch(deleteAssignment(assignmentToDelete._id)).unwrap();
      console.log('Assignment deleted successfully:', result);
      
      // Reset form field
      setAssignmentType('HOMEWORK');
      setAssignmentTitle('');
      setAssignmentDescription('');
      setAssignmentDueDate('');
      setAssignmentClass('');
      setAssignmentClassId('');
      setUploadedFile(null);
      setShowEditModal(false);
      cancelRecording();
      
      // Close the delete confirmation and clear the assignment to delete
      setShowDeleteConfirm(false);
      setAssignmentToDelete(null);

      
      // Optionally show a success message
      // You can use a toast or alert here if you have one
      console.log('Assignment deleted successfully');
    } catch (error) {
       if (error && error.msg) {
        // console.log(`Error: ${error}`)
            alert(error.msg);          
         }else if(error){
           alert('Assignment failed to be deleted please try again');         
         }

      fetchAssignments();
      setShowDeleteConfirm(false);
      setAssignmentToDelete(null);    
      setAssignmentTitle('');
      setAssignmentDescription('');
      setAssignmentDueDate('');
      setAssignmentClass('');
      setUploadedFile(null);
      setShowEditModal(false);
      cancelRecording();  
    }
  }}
  itemName={assignmentToDelete?.title}
  itemType="assignment"
/>
    </div>
    
  )
  };
