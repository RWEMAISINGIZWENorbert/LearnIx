import React, { useState } from 'react';
import './TeacherSettings.css';
import { FaRegUser, FaLongArrowAltRight, FaStar } from 'react-icons/fa';
import { MdOutlineSecurity, MdNotifications, MdMailOutline } from 'react-icons/md';
import { IoLockOpenOutline } from "react-icons/io5";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { Link } from 'react-router-dom';

export const TeacherSettings = () => {
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  return (
    <div className='teacherSettings'>
      <div className='settings'>
        <div className="upper">
          <h2>Settings overview</h2>
          <p>Manage your account preferences, security settings, and notification preferences.</p>
        </div>
        <div className="down">
          <div className="divs">
            <Link to='/teacher/profile' style={{textDecoration:'none', color:'inherit'}}>
              <div className="div1 all">
                <div className="i"><div className="icon"><FaRegUser /></div></div>
                <div className="content">
                  <div className="up">
                    <h3>Profile Settings</h3>
                  </div>
                  <div className="mid">
                    <p>View and manage your personal profile information.</p>
                  </div>
                  <div className="down">
                    <button><span>View Profile</span><FaLongArrowAltRight className='icon'/></button>
                  </div>
                </div>
              </div>
            </Link>

            <div className="div2 all">
              <div className="i"><div className="icon"><MdOutlineSecurity /></div></div>
              <div className="content">
                <div className="up">
                  <h3>Security & Password</h3>
                </div>
                <div className="mid">
                  <p>Change your password and manage security options.</p>
                </div>
                <div className="down">
                  <button onClick={() => setShowSecurityModal(true)}><span>Update Password</span><FaLongArrowAltRight className='icon'/></button>
                </div>
              </div>
            </div>

            <div className="div3 all">
              <div className="i"><div className="icon"><MdNotifications /></div></div>
              <div className="content">
                <div className="up">
                  <h3>Notification Preferences</h3>
                </div>
                <div className="mid">
                  <p>Manage email notifications and alerts.</p>
                </div>
                <div className="down">
                  <button onClick={() => setShowNotificationModal(true)}><span>Configure</span><FaLongArrowAltRight className='icon'/></button>
                </div>
              </div>
            </div>

            <div className="div4 all">
              <div className="i"><div className="icon"><MdMailOutline /></div></div>
              <div className="content">
                <div className="up">
                  <h3>Email Update</h3>
                </div>
                <div className="mid">
                  <p>Change your email address with verification.</p>
                </div>
                <div className="down">
                  <button onClick={() => setShowEmailModal(true)}><span>Update Email</span><FaLongArrowAltRight className='icon'/></button>
                </div>
              </div>
            </div>

            <div className="div5 all">
              <div className="i"><div className="icon"><HiOutlinePaintBrush /></div></div>
              <div className="content">
                <div className="up">
                  <h3>Appearance</h3>
                </div>
                <div className="mid">
                  <p>Customize the look and feel of your interface.</p>
                </div>
                <div className="down">
                  <button><span>Customize</span><FaLongArrowAltRight className='icon'/></button>
                </div>
              </div>
            </div>

            <div className="div6 all">
              <div className="i"><div className="icon"><FaStar /></div></div>
              <div className="content">
                <div className="up">
                  <h3>Rate Our Platform</h3>
                </div>
                <div className="mid">
                  <p>Share your experience and help us improve.</p>
                </div>
                <div className="down">
                  <button onClick={() => setShowRatingModal(true)}><span>Rate Now</span><FaLongArrowAltRight className='icon'/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security/Password Change Modal */}
      {showSecurityModal && (
        <div className="settings_modal_overlay" onClick={() => setShowSecurityModal(false)}>
          <div className="settings_modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings_modal_header">
              <h3>Change Password</h3>
              <button className="settings_modal_close" onClick={() => setShowSecurityModal(false)}>×</button>
            </div>
            
            <div className="settings_modal_body">
              <div className="form_group">
                <label>Current Password</label>
                <input type="password" placeholder="Enter your current password" />
              </div>
              <div className="form_group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
                <small className="form_hint">Must be at least 8 characters</small>
              </div>
              <div className="form_group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>
              <div className="password_requirements">
                <h4>Password Requirements:</h4>
                <ul>
                  <li>At least 8 characters long</li>
                  <li>Contains uppercase and lowercase letters</li>
                  <li>Contains at least one number</li>
                  <li>Contains at least one special character</li>
                </ul>
              </div>
            </div>

            <div className="settings_modal_footer">
              <button className="cancel_btn" onClick={() => setShowSecurityModal(false)}>
                Cancel
              </button>
              <button className="submit_btn">
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Preferences Modal */}
      {showNotificationModal && (
        <div className="settings_modal_overlay" onClick={() => setShowNotificationModal(false)}>
          <div className="settings_modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings_modal_header">
              <h3>Notification Preferences</h3>
              <button className="settings_modal_close" onClick={() => setShowNotificationModal(false)}>×</button>
            </div>
            
            <div className="settings_modal_body">
              <div className="notification_section">
                <h4>Email Notifications</h4>
                <div className="toggle_item">
                  <div className="toggle_info">
                    <label>Assignment Submissions</label>
                    <p>Get notified when students submit assignments</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="toggle_item">
                  <div className="toggle_info">
                    <label>Student Messages</label>
                    <p>Receive notifications for student messages</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="toggle_item">
                  <div className="toggle_info">
                    <label>Announcement Updates</label>
                    <p>Get notified about new school announcements</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>

              <div className="notification_section">
                <h4>Push Notifications</h4>
                <div className="toggle_item">
                  <div className="toggle_info">
                    <label>Enable Push Notifications</label>
                    <p>Receive instant notifications on your device</p>
                  </div>
                  <input type="checkbox" />
                </div>
              </div>
            </div>

            <div className="settings_modal_footer">
              <button className="cancel_btn" onClick={() => setShowNotificationModal(false)}>
                Cancel
              </button>
              <button className="submit_btn">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Update Modal */}
      {showEmailModal && (
        <div className="settings_modal_overlay" onClick={() => setShowEmailModal(false)}>
          <div className="settings_modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings_modal_header">
              <h3>Update Email Address</h3>
              <button className="settings_modal_close" onClick={() => setShowEmailModal(false)}>×</button>
            </div>
            
            <div className="settings_modal_body">
              <p className="modal_description">
                Enter your new email address. A verification code will be sent to verify ownership.
              </p>

              <div className="form_group">
                <label>Current Email</label>
                <input type="email" value="sarah.johnson@learnix.edu" disabled />
              </div>

              <div className="form_group">
                <label>New Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter new email address" 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>

              {emailVerificationSent && (
                <div className="form_group">
                  <label>Verification Code</label>
                  <input 
                    type="text" 
                    placeholder="Enter 6-digit code" 
                    maxLength="6"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <small className="form_hint">
                    A verification code has been sent to {newEmail}
                  </small>
                </div>
              )}

              <div className="email_notice">
                <strong>Important:</strong>
                <ul>
                  <li>A verification code will be sent to your new email</li>
                  <li>The code expires in 15 minutes</li>
                  <li>You won't be able to log in with the old email after verification</li>
                </ul>
              </div>
            </div>

            <div className="settings_modal_footer">
              <button className="cancel_btn" onClick={() => setShowEmailModal(false)}>
                Cancel
              </button>
              {!emailVerificationSent ? (
                <button className="submit_btn" onClick={() => setEmailVerificationSent(true)} disabled={!newEmail}>
                  Send Verification Code
                </button>
              ) : (
                <button className="submit_btn" disabled={verificationCode.length !== 6}>
                  Verify & Update Email
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="settings_modal_overlay" onClick={() => setShowRatingModal(false)}>
          <div className="settings_modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings_modal_header">
              <h3>Rate Our Platform</h3>
              <button className="settings_modal_close" onClick={() => setShowRatingModal(false)}>×</button>
            </div>
            
            <div className="settings_modal_body">
              <p className="modal_description">
                Your feedback helps us improve the platform for everyone!
              </p>

              <div className="rating_section">
                <h4>How would you rate your experience?</h4>
                <div className="star_rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star ${rating >= star ? 'filled' : ''}`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <p className="rating_label">
                  {rating === 0 && 'Select a rating'}
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              </div>

              <div className="form_group">
                <label>Additional Feedback (Optional)</label>
                <textarea 
                  placeholder="Tell us more about your experience..."
                  rows="4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>

              <div className="feedback_benefits">
                <h4>Why your feedback matters:</h4>
                <ul>
                  <li>Helps us identify areas for improvement</li>
                  <li>Guides our development priorities</li>
                  <li>Makes the platform better for all teachers</li>
                </ul>
              </div>
            </div>

            <div className="settings_modal_footer">
              <button className="cancel_btn" onClick={() => setShowRatingModal(false)}>
                Cancel
              </button>
              <button className="submit_btn" disabled={rating === 0}>
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
