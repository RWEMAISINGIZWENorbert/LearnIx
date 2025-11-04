import React from 'react';
import './StudentDashboard.css';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { MdOutlineAssignment } from 'react-icons/md';
import { LuClock, LuBookOpen, LuFileText } from 'react-icons/lu';
import { GrAnnounce, GrResources } from 'react-icons/gr';
import { FaRegBell } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const StudentDashboard = () => {
  return (
    <div className='studentDashboard'>
      <div className='dash'>
        <div className="box">
          {/* Welcome Section */}
          <div className="upper">
            <h2>Welcome back, John!</h2>
            <p>Stay organized and on track with your academic journey.</p>
          </div>

          {/* Quick Stats Cards */}
          <div className="mid_upper">
            <div className="divisions">
              <div className="div1 all">
                <div className="left">
                  <h3>12</h3>
                  <p>Pending Assignments</p>
                </div>
                <div className="right">
                  <div className="icon"><MdOutlineAssignment /></div>
                </div>
              </div>

              <div className="div2 all">
                <div className="left">
                  <h3>45</h3>
                  <p>Available Resources</p>
                </div>
                <div className="right">
                  <div className="icon"><GrResources /></div>
                </div>
              </div>

              <div className="div3 all">
                <div className="left">
                  <h3>8</h3>
                  <p>New Announcements</p>
                </div>
                <div className="right">
                  <div className="icon"><GrAnnounce /></div>
                </div>
              </div>

              <div className="div4 all">
                <div className="left">
                  <h3>5</h3>
                  <p>Unread Notifications</p>
                </div>
                <div className="right">
                  <div className="icon"><FaRegBell /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="middle">
            <div className="left">
              {/* Upcoming Assignments */}
              <div className="upper">
                <div className="up">
                  <h3>Upcoming Assignments</h3>
                  <NavLink to='/student/assignments'><button>View All</button></NavLink>
                </div>
                <div className="down">
                  <div className="assignment-item">
                    <div className="content">
                      <h4>Mathematics - Calculus Assignment</h4>
                      <p className="course">Advanced Mathematics</p>
                      <div className="deadline">
                        <LuClock className="icon" />
                        <span>Due: Tomorrow, 11:59 PM</span>
                      </div>
                    </div>
                    <span className="status urgent">Urgent</span>
                  </div>

                  <div className="assignment-item">
                    <div className="content">
                      <h4>Physics Lab Report</h4>
                      <p className="course">Physics Laboratory</p>
                      <div className="deadline">
                        <LuClock className="icon" />
                        <span>Due: Oct 30, 2025</span>
                      </div>
                    </div>
                    <span className="status pending">Pending</span>
                  </div>

                  <div className="assignment-item">
                    <div className="content">
                      <h4>Programming Project - Web App</h4>
                      <p className="course">Software Development</p>
                      <div className="deadline">
                        <LuClock className="icon" />
                        <span>Due: Nov 5, 2025</span>
                      </div>
                    </div>
                    <span className="status normal">Normal</span>
                  </div>
                </div>
              </div>

              {/* Recent Resources */}
              <div className="lower">
                <div className="up">
                  <h3>Recent Resources</h3>
                  <NavLink to='/student/resources'><button>View All</button></NavLink>
                </div>
                <div className="down">
                  <div className="resource-list">
                    <div className="resource-item">
                      <div className="resource-icon pdf">
                        <LuFileText />
                      </div>
                      <div className="resource-info">
                        <h4>Mathematics Past Papers 2023</h4>
                        <p>Past Papers • 2.4 MB • 2 days ago</p>
                      </div>
                      <button className="view-btn">View</button>
                    </div>
                    <div className="resource-item">
                      <div className="resource-icon book">
                        <LuBookOpen />
                      </div>
                      <div className="resource-info">
                        <h4>English Literature Notes</h4>
                        <p>Learning notes • 3.2 MB • 3 days ago</p>
                      </div>
                      <button className="view-btn">View</button>
                    </div>
                    <div className="resource-item">
                      <div className="resource-icon doc">
                        <LuFileText />
                      </div>
                      <div className="resource-info">
                        <h4>School Rules and Regulations</h4>
                        <p>Rules and regulations • 1.8 MB • 1 week ago</p>
                      </div>
                      <button className="view-btn">View</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="right">
              {/* Recent Announcements */}
              <div className="schedule">
                <div className="section-title">
                  <h3>Recent Announcements</h3>
                  <NavLink to='/student/announcements'><span className="view-link">View All</span></NavLink>
                </div>
                <div className="schedule-items">
                  <div className="announcement-item">
                    <div className="announcement-badge important">Important</div>
                    <h4>Mid-Term Examination Schedule Released</h4>
                    <p className="announcement-time">Posted 2 hours ago</p>
                    <p className="announcement-preview">The mid-term examination schedule has been released...</p>
                  </div>
                  <div className="announcement-item">
                    <div className="announcement-badge general">General</div>
                    <h4>Library Hours Extended</h4>
                    <p className="announcement-time">Posted 1 day ago</p>
                    <p className="announcement-preview">The library will now be open until 10 PM...</p>
                  </div>
                  <div className="announcement-item">
                    <div className="announcement-badge event">Event</div>
                    <h4>Science Fair Next Week</h4>
                    <p className="announcement-time">Posted 2 days ago</p>
                    <p className="announcement-preview">Annual science fair will be held next week...</p>
                  </div>
                </div>
              </div>

              {/* Assignment Progress */}
              <div className="performance">
                <div className="section-title">
                  <h3>Assignment Progress</h3>
                </div>
                <div className="performance-items">
                  <div className="perf-item">
                    <div className="label">Assignments Completed</div>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '85%'}}></div>
                    </div>
                    <div className="value">85%</div>
                  </div>
                  <div className="perf-item">
                    <div className="label">Submitted On Time</div>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '92%', background: 'green'}}></div>
                    </div>
                    <div className="value">92%</div>
                  </div>
                  <div className="perf-item">
                    <div className="label">Resources Accessed</div>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '68%', background: '#f59e0b'}}></div>
                    </div>
                    <div className="value">68%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <NavLink to='/student/assignments' className="action-card">
                <div className="icon"><MdOutlineAssignment /></div>
                <div className="text">
                  <h4>Submit Assignment</h4>
                  <p>Upload your work</p>
                </div>
              </NavLink>
              <NavLink to='/student/resources' className="action-card">
                <div className="icon"><HiOutlineAcademicCap /></div>
                <div className="text">
                  <h4>Study Resources</h4>
                  <p>Access learning materials</p>
                </div>
              </NavLink>
              <NavLink to='/student/announcements' className="action-card">
                <div className="icon"><GrAnnounce /></div>
                <div className="text">
                  <h4>Announcements</h4>
                  <p>View school updates</p>
                </div>
              </NavLink>
              <NavLink to='/student/notifications' className="action-card">
                <div className="icon"><FaRegBell /></div>
                <div className="text">
                  <h4>Notifications</h4>
                  <p>Check your alerts</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
