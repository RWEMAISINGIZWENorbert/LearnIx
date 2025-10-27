import React from 'react';
import './StudentAnnouncements.css';
import { GrAnnounce } from 'react-icons/gr';
import { LuClock } from 'react-icons/lu';

export const StudentAnnouncements = () => {
  const announcements = [
    { id: 1, title: 'Mid-term Exam Schedule Released', content: 'The mid-term examination schedule for all courses has been published. Please check the academic calendar.', date: '2025-10-25', priority: 'high' },
    { id: 2, title: 'Library Hours Extended', content: 'The library will now be open until 10 PM on weekdays to support your study needs.', date: '2025-10-24', priority: 'normal' },
    { id: 3, title: 'Guest Lecture on AI', content: 'Join us for an exciting guest lecture on Artificial Intelligence by Dr. John Smith this Friday.', date: '2025-10-22', priority: 'normal' },
    { id: 4, title: 'Campus Maintenance Notice', content: 'The main building will undergo maintenance this weekend. Some facilities may be unavailable.', date: '2025-10-20', priority: 'low' }
  ];

  return (
    <div className='studentAnnouncements'>
      <div className="box">
        <div className="upper">
          <h2>Announcements</h2>
          <p>Stay updated with important notices</p>
        </div>

        <div className="announcements-list">
          {announcements.map(announcement => (
            <div key={announcement.id} className={`announcement-card ${announcement.priority}`}>
              <div className="announcement-header">
                <div className="icon-wrapper">
                  <GrAnnounce />
                </div>
                <div className="priority-badge">{announcement.priority}</div>
              </div>
              <h3>{announcement.title}</h3>
              <p className="content">{announcement.content}</p>
              <div className="meta">
                <LuClock className="icon" />
                <span>{new Date(announcement.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
