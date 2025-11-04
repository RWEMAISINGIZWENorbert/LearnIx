import React from 'react';
import './TeacherAnnouncements.css';
import { MdAdd } from 'react-icons/md';
import { FaBullhorn } from 'react-icons/fa';

export const TeacherAnnouncements = () => {
  const [announcements, setAnnouncements] = React.useState([
    { id: 1, title: 'Midterm Exam Schedule', content: 'The midterm examinations will be held from November 10-15. Please review the exam timetable.', priority: 'urgent', date: '2024-10-27', classes: ['All Classes'] },
    { id: 2, title: 'Assignment Extension', content: 'React project deadline has been extended to November 20 due to technical issues.', priority: 'normal', date: '2024-10-26', classes: ['L5 SOD A'] },
    { id: 3, title: 'Guest Lecture', content: 'We will have a guest lecture on Cloud Architecture on November 5 at 2:00 PM.', priority: 'normal', date: '2024-10-25', classes: ['L6 SOD A', 'L6 SOD B'] }
  ]);

  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [formTitle, setFormTitle] = React.useState('');
  const [formContent, setFormContent] = React.useState('');
  const [formPriority, setFormPriority] = React.useState('normal');
  const classesOptions = ['All Classes', 'L5 SOD A', 'L5 SOD B', 'L6 SOD A', 'L6 SOD B'];
  const [selectedClasses, setSelectedClasses] = React.useState(['All Classes']);

  const toggleClass = (cls) => {
    if (cls === 'All Classes') {
      setSelectedClasses(['All Classes']);
      return;
    }
    setSelectedClasses((prev) => {
      const withoutAll = prev.filter(c => c !== 'All Classes');
      return withoutAll.includes(cls)
        ? withoutAll.filter(c => c !== cls)
        : [...withoutAll, cls];
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formTitle || !formContent || selectedClasses.length === 0) return;
    const newAnnouncement = {
      id: Date.now(),
      title: formTitle,
      content: formContent,
      priority: formPriority,
      date: new Date().toISOString().split('T')[0],
      classes: selectedClasses,
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setShowCreateModal(false);
    setFormTitle('');
    setFormContent('');
    setFormPriority('normal');
    setSelectedClasses(['All Classes']);
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

        <div className="announcements-list">
          {announcements.map((announcement) => (
            <div className={`announcement-card priority-${announcement.priority}`} key={announcement.id}>
              <div className="announcement-header">
                <FaBullhorn className="icon" />
                <div className="header-content">
                  <h3>{announcement.title}</h3>
                  <div className="meta">
                    <span>{new Date(announcement.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{announcement.classes.join(', ')}</span>
                  </div>
                </div>
                <span className={`priority-badge ${announcement.priority}`}>{announcement.priority}</span>
              </div>
              <p className="content">{announcement.content}</p>
            </div>
          ))}
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

              <div className="form_group">
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
              </div>

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
