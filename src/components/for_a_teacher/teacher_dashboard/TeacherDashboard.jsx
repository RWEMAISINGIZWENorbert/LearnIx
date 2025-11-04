import React from 'react';
import './TeacherDashboard.css';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineAssignment } from 'react-icons/md';
import { LuClock, LuFileText } from 'react-icons/lu';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { GrAnnounce } from 'react-icons/gr';
import { NavLink } from 'react-router-dom';

export const TeacherDashboard = () => {
  return (
    <div className='teacherDashboard'>
      <div className='dash'>
        <div className="box">
          {/* Welcome Section */}
          <div className="upper">
            <h2>Welcome back, Dr. Johnson!</h2>
            <p>Here's your teaching overview and today's schedule.</p>
          </div>

          {/* Quick Stats Cards */}
          <div className="mid_upper">
            <div className="divisions">
              <div className="div1 all">
                <div className="left">
                  <h3>142</h3>
                  <p>Total Students</p>
                </div>
                <div className="right">
                  <div className="icon"><FaUsers /></div>
                </div>
              </div>

              <div className="div2 all">
                <div className="left">
                  <h3>18</h3>
                  <p>Active Assignments</p>
                </div>
                <div className="right">
                  <div className="icon"><MdOutlineAssignment /></div>
                </div>
              </div>

              <div className="div3 all">
                <div className="left">
                  <h3>47</h3>
                  <p>Resources Shared</p>
                </div>
                <div className="right">
                  <div className="icon"><HiOutlineBookOpen /></div>
                </div>
              </div>

              <div className="div4 all">
                <div className="left">
                  <h3>12</h3>
                  <p>Announcements</p>
                </div>
                <div className="right">
                  <div className="icon"><GrAnnounce /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="middle">
            <div className="left">
              {/* Recent Assignment Activity */}
              <div className="upper">
                <div className="up">
                  <h3>Recent Assignment Activity</h3>
                  <NavLink to='/teacher/assignments'><button>View All</button></NavLink>
                </div>
                <div className="down">
                  <div className="assignment-activity-item">
                    <div className="content">
                      <h4>React Project Submission</h4>
                      <p className="student-info">John Doe • Web Development</p>
                      <div className="time-info">
                        <LuClock className="icon" />
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <span className="status new">New</span>
                  </div>

                  <div className="assignment-activity-item">
                    <div className="content">
                      <h4>SQL Queries Assignment</h4>
                      <p className="student-info">Emma Wilson • Database Systems</p>
                      <div className="time-info">
                        <LuClock className="icon" />
                        <span>5 hours ago</span>
                      </div>
                    </div>
                    <span className="status new">New</span>
                  </div>

                  <div className="assignment-activity-item">
                    <div className="content">
                      <h4>UML Diagrams Project</h4>
                      <p className="student-info">Michael Brown • Software Engineering</p>
                      <div className="time-info">
                        <LuClock className="icon" />
                        <span>1 day ago</span>
                      </div>
                    </div>
                    <span className="status reviewed">Reviewed</span>
                  </div>
                </div>
              </div>

              {/* Recent Resources */}
              <div className="lower">
                <div className="up">
                  <h3>Recently Added Resources</h3>
                  <NavLink to='/teacher/resources'><button>View All</button></NavLink>
                </div>
                <div className="down resources-list">
                  <div className="resource-item">
                    <div className="resource-icon pdf">
                      <LuFileText />
                    </div>
                    <div className="resource-info">
                      <h4>React Hooks Tutorial</h4>
                      <p>Web Development • 2.4 MB</p>
                    </div>
                    <span className="resource-date">Today</span>
                  </div>
                  <div className="resource-item">
                    <div className="resource-icon pdf">
                      <LuFileText />
                    </div>
                    <div className="resource-info">
                      <h4>Database Normalization Guide</h4>
                      <p>Database Systems • 1.8 MB</p>
                    </div>
                    <span className="resource-date">Yesterday</span>
                  </div>
                  <div className="resource-item">
                    <div className="resource-icon pdf">
                      <LuFileText />
                    </div>
                    <div className="resource-info">
                      <h4>SDLC Best Practices</h4>
                      <p>Software Engineering • 3.2 MB</p>
                    </div>
                    <span className="resource-date">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="right">
              {/* Recent Announcements */}
              <div className="announcements">
                <div className="section-title">
                  <h3>Recent Announcements</h3>
                  <NavLink to='/teacher/announcements'><span className="view-link">View All</span></NavLink>
                </div>
                <div className="announcement-items">
                  <div className="announcement-item">
                    <div className="announcement-header">
                      <h4>Mid-term Exam Schedule</h4>
                      <span className="date">2 days ago</span>
                    </div>
                    <p>The mid-term examination schedule has been finalized...</p>
                  </div>
                  <div className="announcement-item">
                    <div className="announcement-header">
                      <h4>Library Hours Extended</h4>
                      <span className="date">5 days ago</span>
                    </div>
                    <p>Library will remain open until 10 PM on weekdays...</p>
                  </div>
                  <div className="announcement-item">
                    <div className="announcement-header">
                      <h4>Guest Lecture Series</h4>
                      <span className="date">1 week ago</span>
                    </div>
                    <p>Join us for exciting guest lectures on AI and ML...</p>
                  </div>
                </div>
              </div>

              {/* Pending Reviews */}
              <div className="pending-reviews">
                <div className="section-title">
                  <h3>Pending Reviews</h3>
                </div>
                <div className="review-items">
                  <div className="review-item">
                    <div className="count">8</div>
                    <div className="details">
                      <h4>Assignment Submissions</h4>
                      <p>Awaiting your review</p>
                    </div>
                  </div>
                  <div className="review-item">
                    <div className="count">3</div>
                    <div className="details">
                      <h4>Resource Requests</h4>
                      <p>From students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <NavLink to='/teacher/assignments' className="action-card">
                <div className="icon"><MdOutlineAssignment /></div>
                <div className="text">
                  <h4>Create Assignment</h4>
                  <p>Add new assignment for students</p>
                </div>
              </NavLink>
              <NavLink to='/teacher/resources' className="action-card">
                <div className="icon"><HiOutlineBookOpen /></div>
                <div className="text">
                  <h4>Upload Resources</h4>
                  <p>Share course materials</p>
                </div>
              </NavLink>
              <NavLink to='/teacher/announcements' className="action-card">
                <div className="icon"><GrAnnounce /></div>
                <div className="text">
                  <h4>Post Announcement</h4>
                  <p>Share important updates</p>
                </div>
              </NavLink>
              <NavLink to='/teacher/students' className="action-card">
                <div className="icon"><FaUsers /></div>
                <div className="text">
                  <h4>View Students</h4>
                  <p>Manage student information</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
