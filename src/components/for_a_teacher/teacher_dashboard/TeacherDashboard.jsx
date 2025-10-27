import React from 'react';
import './TeacherDashboard.css';
import { FaChalkboardTeacher, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineAssignment, MdPendingActions } from 'react-icons/md';
import { BiBarChart } from 'react-icons/bi';
import { LuClock, LuCalendarDays } from 'react-icons/lu';
import { HiOutlineBookOpen, HiOutlineAcademicCap } from 'react-icons/hi';
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
                  <h3>6</h3>
                  <p>Active Classes</p>
                </div>
                <div className="right">
                  <div className="icon"><FaChalkboardTeacher /></div>
                </div>
              </div>

              <div className="div2 all">
                <div className="left">
                  <h3>142</h3>
                  <p>Total Students</p>
                </div>
                <div className="right">
                  <div className="icon"><FaUsers /></div>
                </div>
              </div>

              <div className="div3 all">
                <div className="left">
                  <h3>18</h3>
                  <p>Assignments</p>
                </div>
                <div className="right">
                  <div className="icon"><MdOutlineAssignment /></div>
                </div>
              </div>

              <div className="div4 all">
                <div className="left">
                  <h3>23</h3>
                  <p>Pending Grades</p>
                </div>
                <div className="right">
                  <div className="icon"><MdPendingActions /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="middle">
            <div className="left">
              {/* Today's Classes */}
              <div className="upper">
                <div className="up">
                  <h3>Today's Classes</h3>
                  <NavLink to='/teacher/schedule'><button>View Full Schedule</button></NavLink>
                </div>
                <div className="down">
                  <div className="class-item">
                    <div className="content">
                      <h4>Web Development - L5 SOD A</h4>
                      <p className="location">Lab 301 • 24 students</p>
                      <div className="time-info">
                        <LuClock className="icon" />
                        <span>09:00 - 11:00</span>
                      </div>
                    </div>
                    <span className="status upcoming">Upcoming</span>
                  </div>

                  <div className="class-item">
                    <div className="content">
                      <h4>Database Systems - L5 SOD B</h4>
                      <p className="location">Room 205 • 26 students</p>
                      <div className="time-info">
                        <LuClock className="icon" />
                        <span>11:30 - 13:30</span>
                      </div>
                    </div>
                    <span className="status upcoming">Upcoming</span>
                  </div>

                  <div className="class-item">
                    <div className="content">
                      <h4>Software Engineering - L6 SOD A</h4>
                      <p className="location">Room 108 • 22 students</p>
                      <div className="time-info">
                        <LuClock className="icon" />
                        <span>14:00 - 16:00</span>
                      </div>
                    </div>
                    <span className="status upcoming">Upcoming</span>
                  </div>
                </div>
              </div>

              {/* Recent Submissions */}
              <div className="lower">
                <div className="up">
                  <h3>Recent Submissions</h3>
                  <NavLink to='/teacher/assignments'><button>View All</button></NavLink>
                </div>
                <div className="down">
                  <table>
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Assignment</th>
                        <th>Course</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John Doe</td>
                        <td>React Project</td>
                        <td>Web Development</td>
                        <td><span className='pending'>Pending Review</span></td>
                      </tr>
                      <tr>
                        <td>Emma Wilson</td>
                        <td>SQL Queries</td>
                        <td>Database Systems</td>
                        <td><span className='pending'>Pending Review</span></td>
                      </tr>
                      <tr>
                        <td>Michael Brown</td>
                        <td>UML Diagrams</td>
                        <td>Software Engineering</td>
                        <td><span className='pending'>Pending Review</span></td>
                      </tr>
                      <tr>
                        <td>Sarah Davis</td>
                        <td>API Design</td>
                        <td>Web Development</td>
                        <td><span className='graded'>Graded</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="right">
              {/* Class Performance */}
              <div className="performance">
                <div className="section-title">
                  <h3>Class Performance</h3>
                  <NavLink to='/teacher/grades'><span className="view-link">View Details</span></NavLink>
                </div>
                <div className="performance-items">
                  <div className="perf-item">
                    <div className="label">Web Development - Avg Grade</div>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '85%'}}></div>
                    </div>
                    <div className="value">85%</div>
                  </div>
                  <div className="perf-item">
                    <div className="label">Database Systems - Avg Grade</div>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '78%', background: '#3b82f6'}}></div>
                    </div>
                    <div className="value">78%</div>
                  </div>
                  <div className="perf-item">
                    <div className="label">Software Engineering - Avg Grade</div>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '82%', background: '#10b981'}}></div>
                    </div>
                    <div className="value">82%</div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="schedule">
                <div className="section-title">
                  <h3>Upcoming Deadlines</h3>
                </div>
                <div className="schedule-items">
                  <div className="schedule-item">
                    <div className="time">Oct 30</div>
                    <div className="details">
                      <h4>Assignment Deadline</h4>
                      <p>Database Project Due</p>
                    </div>
                  </div>
                  <div className="schedule-item active">
                    <div className="time">Nov 5</div>
                    <div className="details">
                      <h4>Grade Submission</h4>
                      <p>Mid-term Grades Due</p>
                    </div>
                  </div>
                  <div className="schedule-item">
                    <div className="time">Nov 10</div>
                    <div className="details">
                      <h4>Exam Period</h4>
                      <p>Mid-term Examinations</p>
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
                  <p>Add new assignment for class</p>
                </div>
              </NavLink>
              <NavLink to='/teacher/attendance' className="action-card">
                <div className="icon"><FaCheckCircle /></div>
                <div className="text">
                  <h4>Mark Attendance</h4>
                  <p>Record student attendance</p>
                </div>
              </NavLink>
              <NavLink to='/teacher/grades' className="action-card">
                <div className="icon"><BiBarChart /></div>
                <div className="text">
                  <h4>Enter Grades</h4>
                  <p>Update student grades</p>
                </div>
              </NavLink>
              <NavLink to='/teacher/resources' className="action-card">
                <div className="icon"><HiOutlineBookOpen /></div>
                <div className="text">
                  <h4>Upload Resources</h4>
                  <p>Share course materials</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
