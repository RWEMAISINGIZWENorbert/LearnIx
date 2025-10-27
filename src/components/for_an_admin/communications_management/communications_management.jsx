import React, { useState } from 'react';
import './communications_management.css';
import { FaPlus, FaBullhorn, FaEnvelope, FaSms, FaEdit, FaTrash, FaEye, FaPaperPlane } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';

export const Communications_management = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [showNewModal, setShowNewModal] = useState(false);

  const announcements = [
    {
      id: 1,
      title: 'Mid-Term Examinations Schedule',
      message: 'All students are reminded that mid-term examinations will commence on Monday, November 6th...',
      date: '2024-10-25',
      author: 'Academic Affairs',
      recipients: 'All Students',
      status: 'Published'
    },
    {
      id: 2,
      title: 'Parent-Teacher Conference',
      message: 'We are pleased to invite all parents to our annual parent-teacher conference...',
      date: '2024-10-24',
      author: 'Administration',
      recipients: 'Parents & Guardians',
      status: 'Published'
    },
    {
      id: 3,
      title: 'School Holiday Notice',
      message: 'The school will be closed for the public holiday on November 1st...',
      date: '2024-10-23',
      author: 'Administration',
      recipients: 'All',
      status: 'Draft'
    }
  ];

  const messages = [
    {
      id: 1,
      subject: 'Assignment Deadline Extension',
      preview: 'The deadline for the Programming assignment has been extended to...',
      sender: 'Dr. Sarah Johnson',
      recipient: 'L5 SOD A Students',
      date: '2024-10-25',
      read: false
    },
    {
      id: 2,
      subject: 'Library Books Return Reminder',
      preview: 'Please return all borrowed library books by Friday...',
      sender: 'Library Department',
      recipient: 'All Students',
      date: '2024-10-24',
      read: true
    }
  ];

  const stats = [
    { title: 'Total Announcements', value: '45', icon: <FaBullhorn />, color: '#A05AC8' },
    { title: 'Messages Sent', value: '1,234', icon: <FaEnvelope />, color: '#10b981' },
    { title: 'SMS Notifications', value: '567', icon: <FaSms />, color: '#f59e0b' },
    { title: 'Active Recipients', value: '1,620', icon: <MdNotifications />, color: '#3b82f6' }
  ];

  return (
    <div className='communications_management'>
      <div className="communications_management_header">
        <div className="communications_management_title">
          <h1>Communications Center</h1>
          <p>Manage announcements, messages, and notifications</p>
        </div>
        <button className="communications_management_new_btn" onClick={() => setShowNewModal(true)}>
          <FaPlus /> New Communication
        </button>
      </div>

      {/* Stats Grid */}
      <div className="communications_management_stats_grid">
        {stats.map((stat, index) => (
          <div className="communications_management_stat_card" key={index} style={{ borderColor: stat.color }}>
            <div className="communications_management_stat_icon" style={{ background: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="communications_management_stat_info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="communications_management_tabs">
        <button
          className={activeTab === 'announcements' ? 'active' : ''}
          onClick={() => setActiveTab('announcements')}
        >
          <FaBullhorn /> Announcements
        </button>
        <button
          className={activeTab === 'messages' ? 'active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          <FaEnvelope /> Messages
        </button>
        <button
          className={activeTab === 'notifications' ? 'active' : ''}
          onClick={() => setActiveTab('notifications')}
        >
          <MdNotifications /> Notifications
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'announcements' && (
        <div className="communications_management_content">
          <div className="communications_management_list">
            {announcements.map(announcement => (
              <div className="communications_management_card" key={announcement.id}>
                <div className="communications_management_card_header">
                  <div>
                    <h3>{announcement.title}</h3>
                    <div className="communications_management_card_meta">
                      <span className="communications_management_author">{announcement.author}</span>
                      <span className="communications_management_date">{announcement.date}</span>
                      <span className={`communications_management_status ${announcement.status.toLowerCase()}`}>
                        {announcement.status}
                      </span>
                    </div>
                  </div>
                  <div className="communications_management_card_actions">
                    <button className="communications_management_action_btn view">
                      <FaEye />
                    </button>
                    <button className="communications_management_action_btn edit">
                      <FaEdit />
                    </button>
                    <button className="communications_management_action_btn delete">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="communications_management_card_message">{announcement.message}</p>
                <div className="communications_management_card_footer">
                  <span className="communications_management_recipients">
                    👥 {announcement.recipients}
                  </span>
                  {announcement.status === 'Draft' && (
                    <button className="communications_management_publish_btn">
                      <FaPaperPlane /> Publish
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="communications_management_content">
          <div className="communications_management_list">
            {messages.map(message => (
              <div className="communications_management_card" key={message.id}>
                <div className="communications_management_card_header">
                  <div>
                    <h3>{message.subject} {!message.read && <span className="communications_management_unread_badge">New</span>}</h3>
                    <div className="communications_management_card_meta">
                      <span className="communications_management_author">{message.sender}</span>
                      <span className="communications_management_date">{message.date}</span>
                    </div>
                  </div>
                  <div className="communications_management_card_actions">
                    <button className="communications_management_action_btn view">
                      <FaEye />
                    </button>
                    <button className="communications_management_action_btn delete">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="communications_management_card_message">{message.preview}</p>
                <div className="communications_management_card_footer">
                  <span className="communications_management_recipients">
                    📨 To: {message.recipient}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="communications_management_content">
          <div className="communications_management_empty_state">
            <MdNotifications />
            <h3>Notifications Center</h3>
            <p>Send push notifications and SMS alerts to students and parents</p>
            <button className="communications_management_new_btn">
              <FaPlus /> Create Notification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
