import React from 'react';
import './StudentNotifications.css';
import { FaRegBell } from 'react-icons/fa';
import { MdCheckCircle, MdOutlineAssignment } from 'react-icons/md';
import { BiBarChart } from 'react-icons/bi';

export const StudentNotifications = () => {
  const notifications = [
    { id: 1, type: 'assignment', title: 'New Assignment Posted', message: 'Calculus Assignment - Integration has been posted', time: '2 hours ago', read: false },
    { id: 2, type: 'grade', title: 'Grade Published', message: 'Your Physics Quiz 3 has been graded - 88%', time: '5 hours ago', read: false },
    { id: 3, type: 'announcement', title: 'Mid-term Schedule', message: 'Mid-term examination schedule has been released', time: '1 day ago', read: true },
    { id: 4, type: 'assignment', title: 'Assignment Due Soon', message: 'Web Application Project due in 2 days', time: '1 day ago', read: true },
    { id: 5, type: 'grade', title: 'Grade Published', message: 'Your Database Project has been graded - 95%', time: '2 days ago', read: true }
  ];

  return (
    <div className='studentNotifications'>
      <div className="box">
        <div className="upper">
          <h2>Notifications</h2>
          <p>Stay informed about important updates</p>
        </div>

        <div className="notifications-list">
          {notifications.map(notification => (
            <div key={notification.id} className={`notification-card ${notification.read ? 'read' : 'unread'}`}>
              <div className="notification-icon">
                {notification.type === 'assignment' && <MdOutlineAssignment />}
                {notification.type === 'grade' && <BiBarChart />}
                {notification.type === 'announcement' && <FaRegBell />}
              </div>
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="time">{notification.time}</span>
              </div>
              {!notification.read && <div className="unread-dot"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
