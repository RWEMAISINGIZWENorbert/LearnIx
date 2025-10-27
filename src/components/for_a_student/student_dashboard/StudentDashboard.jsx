import React from 'react';
import './StudentDashboard.css';
import { HiOutlineBookOpen, HiOutlineAcademicCap } from 'react-icons/hi';
import { MdOutlineAssignment, MdOutlineEventNote } from 'react-icons/md';
import { BiBarChart } from 'react-icons/bi';
import { IoMdArrowDropright } from 'react-icons/io';
import { LuCalendarDays, LuClock } from 'react-icons/lu';
import { FiTrendingUp } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

export const StudentDashboard = () => {
  return (
    <div className='studentDashboard'>
      <div className='dash'>
        <div className="box">
          {/* Welcome Section */}
          <div className="upper">
            <h2>Welcome back, John!</h2>
            <p>Here's your academic overview and upcoming tasks.</p>
          </div>

          {/* Quick Stats Cards */}
          <div className="mid_upper">
            <div className="divisions">
              <div className="div1 all">
                <div className="left">
                  <h3>6</h3>
                  <p>Enrolled Courses</p>
                </div>
                <div className="right">
                  <div className="icon"><HiOutlineBookOpen /></div>
                </div>
              </div>

              <div className="div2 all">
                <div className="left">
                  <h3>12</h3>
                  <p>Pending Assignments</p>
                </div>
                <div className="right">
                  <div className="icon"><MdOutlineAssignment /></div>
                </div>
              </div>

              <div className="div3 all">
                <div className="left">
                  <h3>85%</h3>
                  <p>Average Grade</p>
                </div>
                <div className="right">
                  <div className="icon"><BiBarChart /></div>
                </div>
              </div>

              <div className="div4 all">
                <div className="left">
                  <h3>92%</h3>
                  <p>Attendance Rate</p>
                </div>
                <div className="right">
                  <div className="icon"><MdOutlineEventNote /></div>
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

              {/* Recent Grades */}
              <div className="lower">
                <div className="up">
                  <h3>Recent Grades</h3>
                  <NavLink to='/student/grades'><button>View All</button></NavLink>
                </div>
                <div className="down">
                  <table>
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Assessment</th>
                        <th>Grade</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mathematics</td>
                        <td>Mid-term Exam</td>
                        <td>92%</td>
                        <td><span className='excellent'>Excellent</span></td>
                      </tr>
                      <tr>
                        <td>Physics</td>
                        <td>Quiz 3</td>
                        <td>88%</td>
                        <td><span className='good'>Good</span></td>
                      </tr>
                      <tr>
                        <td>Software Dev</td>
                        <td>Project 1</td>
                        <td>95%</td>
                        <td><span className='excellent'>Excellent</span></td>
                      </tr>
                      <tr>
                        <td>English</td>
                        <td>Essay</td>
                        <td>78%</td>
                        <td><span className='average'>Average</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="right">
              {/* Today's Schedule */}
              <div className="schedule">
                <div className="section-title">
                  <h3>Today's Schedule</h3>
                  <NavLink to='/student/timetable'><span className="view-link">View Full</span></NavLink>
                </div>
                <div className="schedule-items">
                  <div className="schedule-item">
                    <div className="time">08:00 - 09:30</div>
                    <div className="details">
                      <h4>Mathematics</h4>
                      <p>Room 301</p>
                    </div>
                  </div>
                  <div className="schedule-item active">
                    <div className="time">09:45 - 11:15</div>
                    <div className="details">
                      <h4>Physics</h4>
                      <p>Lab 102</p>
                    </div>
                  </div>
                  <div className="schedule-item">
                    <div className="time">12:00 - 13:30</div>
                    <div className="details">
                      <h4>Software Development</h4>
                      <p>Computer Lab A</p>
                    </div>
                  </div>
                  <div className="schedule-item">
                    <div className="time">14:00 - 15:30</div>
                    <div className="details">
                      <h4>English Literature</h4>
                      <p>Room 205</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Overview */}
              <div className="performance">
                <div className="section-title">
                  <h3>Performance Overview</h3>
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
                    <div className="label">Attendance</div>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '92%', background: 'green'}}></div>
                    </div>
                    <div className="value">92%</div>
                  </div>
                  <div className="perf-item">
                    <div className="label">Course Progress</div>
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
              <NavLink to='/student/courses' className="action-card">
                <div className="icon"><HiOutlineBookOpen /></div>
                <div className="text">
                  <h4>My Courses</h4>
                  <p>View all enrolled courses</p>
                </div>
              </NavLink>
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
              <NavLink to='/student/timetable' className="action-card">
                <div className="icon"><LuCalendarDays /></div>
                <div className="text">
                  <h4>Class Schedule</h4>
                  <p>View your timetable</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
