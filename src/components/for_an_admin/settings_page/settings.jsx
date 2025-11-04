import React, { useState } from 'react'
import './settings.css'
import { BsInfoCircle } from "react-icons/bs";
import { FaLongArrowAltRight,FaRegQuestionCircle   } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { MdOutlineManageAccounts, MdMailOutline,MdOutlineStarRate   } from "react-icons/md";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoLockOpenOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

export const Settings = () => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className='settings_page'>
      <div className='settings'>
        <div className="upper">
          <h2>Settings overview</h2>
          <p>Configure your school platform preferences, manage user roles, and adjust system features to ensure smooth operations.</p>
        </div>
        <div className="down">
          <div className="divs">
            <div className="div1 all">
              <div className="i"><div className="icon"><BsInfoCircle /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>School information</h3>
                    </div>
                    <div className="mid">
                      <p>Manage school details, contact info, and branding.</p>
                    </div>
                    <div className="down">
                      <Link to='/admin/profile' style={{ textDecoration: 'none', color: 'inherit' }}>
                      <button><span>Configure</span><FaLongArrowAltRight className='icon'/></button>
                      </Link>
                    </div>
              </div>
            </div>
            <div className="div2 all">
              <div className="i"><div className="icon"><LuUsers /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Manage users</h3>
                    </div>
                    <div className="mid">
                      <p>Manage all students, teachers and classes</p>
                    </div>
                    <div className="down">
                      <Link to='/admin/students' style={{ textDecoration: 'none', color: 'inherit' }}>
                      <button><span>Manage</span><FaLongArrowAltRight className='icon'/></button>
                      </Link>
                    </div>
              </div>
            </div>
            <div className="div3 all">
              <div className="i"><div className="icon"><MdOutlineManageAccounts /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Academic configuration</h3>
                    </div>
                    <div className="mid">
                      <p>Manage academic years, terms and subjects</p>
                    </div>
                    <div className="down">
                      <Link to='/admin/academic_setup' style={{ textDecoration: 'none', color: 'inherit' }}>
                      <button><span>Setup</span><FaLongArrowAltRight className='icon'/></button>
                      </Link>
                    </div>
              </div>
            </div>
            <div className="div4 all">
              <div className="i"><div className="icon"><MdMailOutline /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Communication</h3>
                    </div>
                    <div className="mid">
                      <p>Manage Email, SMS, notifications, and messaging.</p>
                    </div>
                    <div className="down">
                      <Link to='/admin/communications' style={{ textDecoration: 'none', color: 'inherit' }}>
                      <button><span>Configure</span><FaLongArrowAltRight className='icon'/></button>
                      </Link>
                    </div>
              </div>
            </div>
            <div className="div5 all">
              <div className="i"><div className="icon"><HiOutlinePaintBrush /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Customization & UI</h3>
                    </div>
                    <div className="mid">
                      <p>Customize the look and feel of the application.</p>
                    </div>
                    <div className="down">
                      <button><span>Customize</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div6 all">
              <div className="i"><div className="icon"><IoLockOpenOutline /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Security</h3>
                    </div>
                    <div className="mid">
                      <p>Two Factor Authentication(2FA), password policies and data protection.</p>
                    </div>
                    <div className="down">
                      <button onClick={() => setShowSecurityModal(true)}><span>Secure</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div7 all">
              <div className="i"><div className="icon"><FaRegQuestionCircle  /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Feedback & Support</h3>
                    </div>
                    <div className="mid">
                      <p>Get help and support for using the application.</p>
                    </div>
                    <div className="down">
                      <button><span>Support</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
            <div className="div8 all">
              <div className="i"><div className="icon"><MdOutlineStarRate  /></div></div>
              <div className="content">
                    <div className="up">
                      <h3>Ratings</h3>
                    </div>
                    <div className="mid">
                      <p>Provide feedback and rate your experience.</p>
                    </div>
                    <div className="down">
                      <button onClick={() => setShowRatingModal(true)}><span>Rate us</span><FaLongArrowAltRight className='icon'/></button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="settings_modal_overlay" onClick={() => setShowRatingModal(false)}>
          <div className="settings_modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings_modal_header">
              <h3>Rate Your Experience</h3>
              <button className="settings_modal_close" onClick={() => setShowRatingModal(false)}>×</button>
            </div>
            
            <div className="settings_modal_body">
              <div className="rating_section">
                <label>How would you rate our platform?</label>
                <div className="star_rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="rating_text">
                  {rating === 0 && 'Select a rating'}
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              </div>

              <div className="form_group">
                <label>Feedback Title</label>
                <input type="text" placeholder="Brief title for your feedback" />
              </div>

              <div className="form_group">
                <label>Your Feedback</label>
                <textarea 
                  rows="5" 
                  placeholder="Tell us about your experience..."
                ></textarea>
              </div>

              <div className="form_group">
                <label>Category (Optional)</label>
                <select>
                  <option value="">Select a category</option>
                  <option value="ui">User Interface</option>
                  <option value="features">Features</option>
                  <option value="performance">Performance</option>
                  <option value="support">Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="settings_modal_footer">
              <button className="cancel_btn" onClick={() => setShowRatingModal(false)}>
                Cancel
              </button>
              <button className="submit_btn">
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

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
                <input type="password" placeholder="Enter current password" />
              </div>

              <div className="form_group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
                <small className="form_hint">
                  Password must be at least 8 characters with uppercase, lowercase, and numbers
                </small>
              </div>

              <div className="form_group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>

              <div className="password_requirements">
                <h4>Password Requirements:</h4>
                <ul>
                  <li>At least 8 characters long</li>
                  <li>Contains uppercase letter (A-Z)</li>
                  <li>Contains lowercase letter (a-z)</li>
                  <li>Contains number (0-9)</li>
                  <li>Contains special character (!@#$%^&*)</li>
                </ul>
              </div>
            </div>

            <div className="settings_modal_footer">
              <button className="cancel_btn" onClick={() => setShowSecurityModal(false)}>
                Cancel
              </button>
              <button className="submit_btn">
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
