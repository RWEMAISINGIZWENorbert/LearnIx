import React , { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TeacherAnnouncements.css';
import { MdAdd } from 'react-icons/md';
import { FaBullhorn } from 'react-icons/fa';
import {
  fetchAllAnnouncements,
  createAnnouncement,
  selectAnnouncements,
  selectAnnouncementsLoading,
  selectAnnouncementsError,
  resetAnnouncementState
} from '../../../features/announcements/announcementsSlice.js';

export const TeacherAnnouncements = () => {
  // const [announcements, setAnnouncements] = React.useState([
  //   { id: 1, title: 'Midterm Exam Schedule', content: 'The midterm examinations will be held from November 10-15. Please review the exam timetable.', priority: 'urgent', date: '2024-10-27', classes: ['All Classes'] },
  //   { id: 2, title: 'Assignment Extension', content: 'React project deadline has been extended to November 20 due to technical issues.', priority: 'normal', date: '2024-10-26', classes: ['L5 SOD A'] },
  //   { id: 3, title: 'Guest Lecture', content: 'We will have a guest lecture on Cloud Architecture on November 5 at 2:00 PM.', priority: 'normal', date: '2024-10-25', classes: ['L6 SOD A', 'L6 SOD B'] }
  // ]);

  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [formTitle, setFormTitle] = React.useState('');
  const [formContent, setFormContent] = React.useState('');
  const [formPriority, setFormPriority] = React.useState('normal');
  const classesOptions = ['All Classes', 'L5 SOD A', 'L5 SOD B', 'L6 SOD A', 'L6 SOD B'];
  const [selectedClasses, setSelectedClasses] = React.useState(['All Classes']);

  const dispatch = useDispatch();
  const announcements = useSelector(selectAnnouncements);
  const loading = useSelector(selectAnnouncementsLoading);
  const error = useSelector(selectAnnouncementsError);

  // const toggleClass = (cls) => {
  //   if (cls === 'All Classes') {
  //     setSelectedClasses(['All Classes']);
  //     return;
  //   }
  //   setSelectedClasses((prev) => {
  //     const withoutAll = prev.filter(c => c !== 'All Classes');
  //     return withoutAll.includes(cls)
  //       ? withoutAll.filter(c => c !== cls)
  //       : [...withoutAll, cls];
  //   });
  // };
  
  useEffect(() => {
    dispatch(fetchAllAnnouncements());
    return () => {
      dispatch(resetAnnouncementState());
    };
  }, [dispatch])
   
  // const handleCreate = (e) => {
  //   e.preventDefault();
  //   if (!formTitle || !formContent || selectedClasses.length === 0) return;
  //   const newAnnouncement = {
  //     id: Date.now(),
  //     title: formTitle,
  //     content: formContent,
  //     priority: formPriority,
  //     date: new Date().toISOString().split('T')[0],
  //     classes: selectedClasses,
  //   };
  //   setAnnouncements([newAnnouncement, ...announcements]);
  //   setShowCreateModal(false);
  //   setFormTitle('');
  //   setFormContent('');
  //   setFormPriority('normal');
  //   setSelectedClasses(['All Classes']);
  // };
   
    const handleCreate = async (e) => {
    e.preventDefault();
    if (!formTitle || !formContent) return;
    
    try {
      const newAnnouncement = {
        title: formTitle,
        message: formContent,
        priority: formPriority,
        recipients: selectedClasses.includes('All Classes') ? 'all' : selectedClasses.join(','),
        status: 'published',
        author: 'teacher' // Replace with actual teacher ID/name from auth
      };
      
      await dispatch(createAnnouncement(newAnnouncement)).unwrap();
      
      setShowCreateModal(false);
      setFormTitle('');
      setFormContent('');
      setFormPriority('normal');
      setSelectedClasses(['All Classes']);
      
      // Refresh the announcements list
      dispatch(fetchAllAnnouncements());
    } catch (error) {
      console.error('Failed to create announcement:', error);
      alert('Failed to create announcement. Please try again.');
    }
  };

  return (
    <div className='teacherAnnouncements'>
      <div className="box">
        <div className="upper">
          <h2>Announcements</h2>
          <p>Create and manage class announcements</p>
        </div>

        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          <MdAdd className="icon" /> Create Announcement
        </button>
         {loading && <div className="loading">Loading announcements...</div>}
         {error && <div className="error">Error: {error}</div>}
        <div className="announcements-list">
          {announcements && announcements.length > 0 ? ( 
            announcements.map((announcement) => (
            <div className={`announcement-card priority-${announcement.priority}`} key={announcement._id}>
              <div className="announcement-header">
                <FaBullhorn className="icon" />
                <div className="header-content">
                  <h3>{announcement.title}</h3>
                  <div className="meta">
                    <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                    {/* <span>•</span>
                    <span>{announcement.classes.join(', ')}</span> */}
                  </div>
                </div>
                <span className={`priority-badge ${announcement.priority}`}>{announcement.priority}</span>
              </div>
              <p className="content">{announcement.content}</p>
            </div>
          ))) : (<p>No announcements found</p>)}
        </div>
      </div>
      {showCreateModal && (
        <div className="announce_modal_overlay" onClick={() => setShowCreateModal(false)}>
          <div className="announce_modal" onClick={(e) => e.stopPropagation()}>
            <div className="announce_modal_header">
              <h3>New Announcement</h3>
              <button className="announce_modal_close" onClick={() => setShowCreateModal(false)}>×</button>
            </div>

            <form className="announce_modal_body" onSubmit={handleCreate}>
              <div className="form_group">
                <label>Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Enter announcement title"
                  required
                />
              </div>

              <div className="form_group">
                <label>Message</label>
                <textarea
                  rows="4"
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Write the announcement content..."
                  required
                />
              </div>

              <div className="form_row">
                <div className="form_field">
                  <label>Priority</label>
                  <select value={formPriority} onChange={(e) => setFormPriority(e.target.value)}>
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* <div className="form_group">
                <label>Target Classes</label>
                <div className="classes_grid">
                  {classesOptions.map(cls => (
                    <label key={cls} className={`class_chip ${selectedClasses.includes(cls) ? 'selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedClasses.includes(cls)}
                        onChange={() => toggleClass(cls)}
                      />
                      <span>{cls}</span>
                    </label>
                  ))}
                </div>
              </div> */}

              <div className="announce_modal_footer">
                <button type="button" className="cancel_btn" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="submit_btn" disabled={!formTitle || !formContent || selectedClasses.length === 0}>Create Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
