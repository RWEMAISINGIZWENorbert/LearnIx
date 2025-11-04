import React, { useState } from 'react';
import './StudentAnnouncements.css';
import { GrAnnounce } from 'react-icons/gr';
import { LuClock, LuBell,  LuInfo } from 'react-icons/lu';
import { MdOutlinePushPin } from 'react-icons/md';
import { FiAlertTriangle } from "react-icons/fi";

export const StudentAnnouncements = () => {
  const [filterPriority, setFilterPriority] = useState('all');

  const announcements = [
    { id: 1, title: 'Mid-term Exam Schedule Released', content: 'The mid-term examination schedule for all courses has been published. Please check the academic calendar.', date: '2025-10-25', priority: 'high', pinned: true },
    { id: 2, title: 'Library Hours Extended', content: 'The library will now be open until 10 PM on weekdays to support your study needs.', date: '2025-10-24', priority: 'normal', pinned: false },
    { id: 3, title: 'Guest Lecture on AI', content: 'Join us for an exciting guest lecture on Artificial Intelligence by Dr. John Smith this Friday.', date: '2025-10-22', priority: 'normal', pinned: false },
    { id: 4, title: 'Campus Maintenance Notice', content: 'The main building will undergo maintenance this weekend. Some facilities may be unavailable.', date: '2025-10-20', priority: 'low', pinned: false },
    { id: 5, title: 'New Course Registration Opens', content: 'Registration for next semester courses will open on November 1st. Plan your schedule early!', date: '2025-10-26', priority: 'high', pinned: true }
  ];

  const filteredAnnouncements = filterPriority === 'all' 
    ? announcements 
    : announcements.filter(a => a.priority === filterPriority);

  const highCount = announcements.filter(a => a.priority === 'high').length;
  const normalCount = announcements.filter(a => a.priority === 'normal').length;
  const lowCount = announcements.filter(a => a.priority === 'low').length;

  return (
    <div className='studentAnnouncements'>
      <div className="announcements-header">
        <div className="header-content">
          <h1>Announcements</h1>
          <p>Stay updated with important notices and school updates</p>
        </div>
        <div className="stats-cards">
          <div className="stat-card high-stat">
            <FiAlertTriangle className="stat-icon" />
            <div className="stat-number">{highCount}</div>
            <div className="stat-label">High Priority</div>
          </div>
          <div className="stat-card normal-stat">
            <LuInfo className="stat-icon" />
            <div className="stat-number">{normalCount}</div>
            <div className="stat-label">Normal</div>
          </div>
          <div className="stat-card low-stat">
            <LuBell className="stat-icon" />
            <div className="stat-number">{lowCount}</div>
            <div className="stat-label">Low Priority</div>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="filters">
          <button 
            className={filterPriority === 'all' ? 'active' : ''}
            onClick={() => setFilterPriority('all')}
          >
            All Announcements
          </button>
          <button 
            className={filterPriority === 'high' ? 'active' : ''}
            onClick={() => setFilterPriority('high')}
          >
            <FiAlertTriangle className="filter-icon" />
            High Priority
          </button>
          <button 
            className={filterPriority === 'normal' ? 'active' : ''}
            onClick={() => setFilterPriority('normal')}
          >
            <LuInfo className="filter-icon" />
            Normal
          </button>
          <button 
            className={filterPriority === 'low' ? 'active' : ''}
            onClick={() => setFilterPriority('low')}
          >
            <LuBell className="filter-icon" />
            Low Priority
          </button>
        </div>

        <div className="announcements-list">
          {filteredAnnouncements.map(announcement => (
            <div key={announcement.id} className={`announcement-card ${announcement.priority} ${announcement.pinned ? 'pinned' : ''}`}>
              <div className="announcement-header">
                <div className={`icon-wrapper ${announcement.priority}`}>
                  <GrAnnounce />
                </div>
                <div className="announcement-title-section">
                  <h3>{announcement.title}</h3>
                  {announcement.pinned && (
                    <div className="pinned-badge">
                      <MdOutlinePushPin className="pin-icon" />
                      Pinned
                    </div>
                  )}
                </div>
                <div className={`priority-badge ${announcement.priority}`}>
                  {announcement.priority === 'high' && <FiAlertTriangle className="badge-icon" />}
                  {announcement.priority === 'normal' && <LuInfo className="badge-icon" />}
                  {announcement.priority === 'low' && <LuBell className="badge-icon" />}
                  {announcement.priority}
                </div>
              </div>
              <p className="content">{announcement.content}</p>
              <div className="meta">
                <LuClock className="icon" />
                <span>{new Date(announcement.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
