import React, { useState } from 'react';
import './StudentSettings.css';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineSecurity, MdNotifications } from 'react-icons/md';

export const StudentSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className='studentSettings'>
      <div className="box">
        <div className="upper">
          <h2>Settings</h2>
          <p>Manage your account preferences</p>
        </div>

        <div className="settings-container">
          <div className="settings-sidebar">
            <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
              <FaRegUser className="icon" /> Profile
            </button>
            <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
              <MdOutlineSecurity className="icon" /> Security
            </button>
            <button className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>
              <MdNotifications className="icon" /> Notifications
            </button>
          </div>

          <div className="settings-content">
            {activeTab === 'profile' && (
              <div className="section">
                <h3>Profile Information</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value="John Doe" readOnly />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value="john.doe@student.com" readOnly />
                </div>
                <div className="form-group">
                  <label>Student ID</label>
                  <input type="text" value="STU001" readOnly />
                </div>
                <div className="form-group">
                  <label>Class</label>
                  <input type="text" value="L5 SOD A" readOnly />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="section">
                <h3>Security Settings</h3>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>
                <button className="save-btn">Update Password</button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="section">
                <h3>Notification Preferences</h3>
                <div className="toggle-group">
                  <label>Email Notifications</label>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="toggle-group">
                  <label>Assignment Reminders</label>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="toggle-group">
                  <label>Grade Updates</label>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="toggle-group">
                  <label>Announcement Alerts</label>
                  <input type="checkbox" defaultChecked />
                </div>
                <button className="save-btn">Save Preferences</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
