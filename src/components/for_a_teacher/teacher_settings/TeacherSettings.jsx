import React, { useState } from 'react';
import './TeacherSettings.css';
import { FaUser, FaLock, FaBell } from 'react-icons/fa';

export const TeacherSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className='teacherSettings'>
      <div className="box">
        <div className="upper">
          <h2>Settings</h2>
          <p>Manage your account preferences</p>
        </div>

        <div className="tabs">
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
            <FaUser className="icon" /> Profile
          </button>
          <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
            <FaLock className="icon" /> Security
          </button>
          <button className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>
            <FaBell className="icon" /> Notifications
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="section">
              <h3>Profile Information</h3>
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" defaultValue="Sarah" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" defaultValue="Johnson" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue="sarah.johnson@learnix.edu" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" defaultValue="+1 234 567 8900" />
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="section">
              <h3>Security Settings</h3>
              <form>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>
                <button type="submit" className="save-btn">Update Password</button>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="section">
              <h3>Notification Preferences</h3>
              <div className="notification-options">
                <div className="notification-item">
                  <div>
                    <h4>Assignment Submissions</h4>
                    <p>Get notified when students submit assignments</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="notification-item">
                  <div>
                    <h4>Class Reminders</h4>
                    <p>Reminders for upcoming classes</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
              <button className="save-btn">Save Preferences</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
