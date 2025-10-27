import React from 'react';
import './TeacherAnnouncements.css';
import { MdAdd } from 'react-icons/md';
import { FaBullhorn } from 'react-icons/fa';

export const TeacherAnnouncements = () => {
  const announcements = [
    { id: 1, title: 'Midterm Exam Schedule', content: 'The midterm examinations will be held from November 10-15. Please review the exam timetable.', priority: 'urgent', date: '2024-10-27', classes: ['All Classes'] },
    { id: 2, title: 'Assignment Extension', content: 'React project deadline has been extended to November 20 due to technical issues.', priority: 'normal', date: '2024-10-26', classes: ['L5 SOD A'] },
    { id: 3, title: 'Guest Lecture', content: 'We will have a guest lecture on Cloud Architecture on November 5 at 2:00 PM.', priority: 'normal', date: '2024-10-25', classes: ['L6 SOD A', 'L6 SOD B'] }
  ];

  return (
    <div className='teacherAnnouncements'>
      <div className="box">
        <div className="upper">
          <h2>Announcements</h2>
          <p>Create and manage class announcements</p>
        </div>

        <button className="create-btn">
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
    </div>
  );
};
