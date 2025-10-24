import React from 'react';
import './dashboard.css';
import { GiTeacher } from 'react-icons/gi';
import { PiStudent  } from "react-icons/pi";
import { SlPeople } from "react-icons/sl";
import { IoMdArrowDropright } from "react-icons/io";
import { RiUserForbidLine } from "react-icons/ri";
import { GrAnnounce } from 'react-icons/gr';
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegBell } from 'react-icons/fa';
import { CiCalendar } from "react-icons/ci";


export const Dashboard = () => {
  return (
    <div className='dashboard'>

      {/* START: Main dashboard container */}
      <div className='dash'>

        {/* START: Top box */}
        <div className="box">
          {/* START: Upper welcome */}
          <div className="upper">
            <h2>Welcome back, Admin!</h2>
            <p>Overview of school operations and tasks.</p>
          </div>
          {/* END: Upper welcome */}

          {/* START: Mid upper summary cards */}
          <div className="mid_upper">
            <div className="divisions">
              {/* Card 1 */}
              <div className="div1 all">
                <div className="left">
                  <h3>1287</h3>
                  <p>Students</p>
                </div>
                <div className="rigth">
                  <div className="icon"><PiStudent /></div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="div2 all">
                <div className="left">
                  <h3>32</h3>
                  <p>Teachers</p>
                </div>
                <div className="rigth">
                  <div className="icon"><SlPeople/></div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="div3 all">
                <div className="left">
                  <h3>20</h3>
                  <p>Active classes</p>
                </div>
                <div className="rigth">
                  <div className="icon"><CiCalendar/></div>
                </div>
              </div>
            </div>
          </div>
          {/* END: Mid upper summary cards */}

          {/* START: Middle section (two-column) */}
          <div className="middle">
            {/* LEFT column inside middle */}
            <div className="left">
              {/* LEFT -> Upper: Recent activities & alerts */}
              <div className="upper">
                <div className="up">
                  <h3>Recent activities & alerts</h3>
                </div>
                <div className="down">
                  {/* Activity item 1 */}
                  <div className="it">
                    <div className="div">
                      <h4>New student registration : Franco Nelly</h4>
                      <p className="time">2hr ago</p>
                    </div>
                    <div className="dot"></div>
                  </div>

                  {/* Activity item 2 */}
                  <div className="it">
                    <div className="div">
                      <h4>Exam results uploaded for L5 SOD A</h4>
                      <p className="time">1hr ago</p>
                    </div>
                    <div className="dot"></div>
                  </div>

                  {/* Activity item 3 */}
                  <div className="it">
                    <div className="div">
                      <h4>Attendance alert : L5 SOD B</h4>
                      <p className="time">2hr ago</p>
                    </div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
              {/* END: LEFT -> Upper */}

              {/* LEFT -> Lower: Pending applications */}
              <div className="lower">
                <div className="up">
                  <h3>Recent applications</h3>
                </div>
                <div className="down">
                  <table>
                    <thead>
                      <tr className='tr'>
                        <th>#</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Submitted</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Franco Nelly</td>
                        <td>L5 SOD</td>
                        <td>2d ago</td>
                        <td><span className='approved'>Approved</span></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>RWEMA Nobii</td>
                        <td>L5 SOD</td>
                        <td>1d ago</td>
                        <td><span className='pending'>pending</span></td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>SHEMA Valentin</td>
                        <td>L5 SOD</td>
                        <td>4d ago</td>
                        <td><span className='rejected'>Rejected</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* END: LEFT -> Lower */}
            </div>
            {/* END: LEFT column inside middle */}

            {/* RIGHT column inside middle */}
            <div className="right">
              {/* RIGHT -> Stats */}
              <div className="stats">
                <div className="section-title"><h3>Admissions snapshot</h3></div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ color: '#64748b' }}>Approved</div>
                    <div style={{ fontWeight: 800 }}>342</div>
                  </div>
                  <div style={{ height: 8, background: 'rgba(15,23,42,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ width: '72%', height: '100%', background: 'green' }} />
                  </div>
                </div>

                <div style={{marginTop: 12, display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ color: '#64748b' }}>Pending</div>
                  <div style={{ fontWeight: 800 }}>12</div>
                </div>
                <div style={{ height: 8, background: 'rgba(15,23,42,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ width: '24%', height: '100%', background: 'orange' }} />
                </div>

                
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ color: '#64748b' }}>Rejected</div>
                    <div style={{ fontWeight: 800 }}>24</div>
                  </div>
                  <div style={{ height: 8, background: 'rgba(15,23,42,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ width: '34%', height: '100%', background: 'red' }} />
                  </div>
                </div>
              </div>
              {/* END: RIGHT -> Stats */}

              {/* RIGHT -> Following: Recent classes */}
              <div className="following">
                <div className="up">
                  <p>Recent classes</p>
                  <button>Manage</button>
                </div>
                <div className="down">
                  <div className="it">
                    <div className="div">
                      <h4>L5 SOD A</h4>
                      <p className="count">29 students</p>
                    </div>
                    <div className="icon"><IoMdArrowDropright/></div>
                  </div>

                  <div className="it">
                    <div className="div">
                      <h4>L5 SOD B</h4>
                      <p className="count">32 students</p>
                    </div>
                    <div className="icon"><IoMdArrowDropright/></div>
                  </div>

                  <div className="it">
                    <div className="div">
                      <h4>L4 SOD A</h4>
                      <p className="count">45 students</p>
                    </div>
                    <div className="icon"><IoMdArrowDropright/></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="last">
            <div className="left">
              <div className="upper">
                <h4>User management quick access</h4>
              </div>

              <div className="it students">
                <div className="icon"><PiStudent/></div>
                <div className="des">Students</div>
              </div>

              <div className="it teachers">
                <div className="icon"><GiTeacher/></div>
                <div className="des">Teachers</div>
              </div>

              <div className="it permissions">
                <div className="icon"><RiUserForbidLine/></div>
                <div className="des">Grant and revoke permissions</div>
              </div>
            </div>
            <div className="right">
              <div className="upper">
                <h4>Communications</h4>
              </div>

              <div className="it students">
                <div className="icon"><GrAnnounce/></div>
                <div className="des">Announce</div>
              </div>

              <div className="it teachers">
                <div className="icon"><IoChatbubblesOutline/></div>
                <div className="des">Messaging center</div>
              </div>

              <div className="it permissions">
                <div className="icon"><FaRegBell/></div>
                <div className="des">Parent notifications</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
