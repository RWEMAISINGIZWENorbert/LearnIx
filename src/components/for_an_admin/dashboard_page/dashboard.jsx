import './dashboard.css';
import { GiTeacher } from 'react-icons/gi';
import { PiStudent  } from "react-icons/pi";
import { SlPeople } from "react-icons/sl";
import { IoMdArrowDropright, IoMdTrendingUp } from "react-icons/io";
import { GrAnnounce } from 'react-icons/gr';
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegBell } from 'react-icons/fa';
import { CiCalendar } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { 
  fetchAdminDashboardSummary, 
  selectDashboardSummary,
  selectDashboardLoading,
  selectDashboardError,
  clearDashboardError
} from '../../../features/dashboard/admin/adminDashboardSlice';


export const Dashboard = () => {

   const dispatch = useDispatch();
   const summary = useSelector(selectDashboardSummary);
   const loading = useSelector(selectDashboardLoading);
   const error = useSelector(selectDashboardError);

useEffect(() => {
    dispatch(fetchAdminDashboardSummary());
    return () => {
      // Clear any errors when component unmounts
      dispatch(clearDashboardError());
    };
  }, [dispatch]);

  if (loading) return <div>Loading dashboard data...</div>;
  if (error) return <div className="error">{error}</div>;

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
                <div className="card-content">
                  <div className="card-top">
                    <div className="left">
                      <h3>{summary.students}</h3>
                      <p>Students</p>
                    </div>
                    <div className="rigth">
                      <div className="icon"><PiStudent /></div>
                    </div>
                  </div>
                  <div className="card-trend">
                    <IoMdTrendingUp className="trend-icon" />
                    <span className="trend-text">+12% from last term</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="div2 all">
                <div className="card-content">
                  <div className="card-top">
                    <div className="left">
                      <h3>{summary.teachers}</h3>
                      <p>Teachers</p>
                    </div>
                    <div className="rigth">
                      <div className="icon"><SlPeople/></div>
                    </div>
                  </div>
                  <div className="card-trend">
                    <IoMdTrendingUp className="trend-icon" />
                    <span className="trend-text">+3% from last year</span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="div3 all">
                <div className="card-content">
                  <div className="card-top">
                    <div className="left">
                      <h3>{summary.classes}</h3>
                      <p>Active classes</p>
                    </div>
                    <div className="rigth">
                      <div className="icon"><CiCalendar/></div>
                    </div>
                  </div>
                  <div className="card-trend">
                    <IoMdTrendingUp className="trend-icon" />
                    <span className="trend-text">+1% from last year</span>
                  </div>
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
                  <Link to="/admin/admissions" style={{ textDecoration: 'none' }}>
                    <button style={{ padding: '8px 16px', background: 'none', color: 'var(--main-color)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>View More</button>
                  </Link>
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
                    {/* <tbody>
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
                    </tbody> */}
                    <tbody>
                      {summary.recentApplications.length > 0 ? (
                        console.log(`Recent Application Summary: ${summary.recentApplications.length}`),
                        summary.recentApplications.map((app, index) => (
                          <tr key={app._id}>
                            <td>{index + 1}</td>
                            <td>{app.studentName || app.firstName + ' ' + app.lastName || 'N/A'}</td>
                            <td>{app.className || 'N/A'}</td>
                            <td>
                              {app.createdAt 
                                ? new Date(app.createdAt).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                  }) 
                                : 'N/A'}
                            </td>
                            <td>
                              <span className={app.status?.toLowerCase()}>
                                {app.status || 'Pending'}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                            No recent applications
                          </td>
                        </tr>
                      )}
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
                    <div style={{ fontWeight: 800 }}>{summary.admissionSnapshot.approved || 0}</div>
                  </div>
                  <div style={{ height: 8, background: 'rgba(15,23,42,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ width: '72%', height: '100%', background: 'green' }} />
                  </div>
                </div>

                <div style={{marginTop: 12, display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ color: '#64748b' }}>Pending</div>
                  <div style={{ fontWeight: 800 }}>{summary.admissionSnapshot.pending || 0}</div>
                </div>
                <div style={{ height: 8, background: 'rgba(15,23,42,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ width: '24%', height: '100%', background: 'orange' }} />
                </div>

                
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ color: '#64748b' }}>Rejected</div>
                    <div style={{ fontWeight: 800 }}>{summary.admissionSnapshot.rejected || 0}</div>
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
                  <Link to="/admin/classes" style={{ textDecoration: 'none' }}>
                    <button>Manage</button>
                  </Link>
                </div>
                {/* <div className="down">
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
                </div> */}
                <div className="down">
                    {summary.recentClasses && summary.recentClasses.length > 0 ? (
                        summary.recentClasses.slice(0, 3).map((classItem) => (
                            <div className="it" key={classItem._id}>
                                <div className="div">
                                    <h4>{classItem.name || 'Unnamed Class'}</h4>
                                    <p className="count">
                                        {classItem.studentCount || 0} student
                                        {classItem.studentCount !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <div className="icon"><IoMdArrowDropright/></div>
                            </div>
                        ))
                    ) : (
                        <p style={{ 
                            textAlign: 'center', 
                            color: '#666', 
                            padding: '1rem', 
                            fontStyle: 'italic',
                            margin: '0 auto'
                        }}>
                            No recent classes found
                        </p>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="last">
            <div className="left">
              <div className="upper">
                <h4>User management quick access</h4>
              </div>

              <Link to="/admin/students" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="it students">
                  <div className="icon"><PiStudent/></div>
                  <div className="des">Students</div>
                </div>
              </Link>

              <Link to="/admin/teachers" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="it teachers">
                <div className="icon"><GiTeacher/></div>
                <div className="des">Teachers</div>
              </div>
              </Link>
            </div>
            <div className="right">
              <div className="upper">
                <h4>Communications</h4>
              </div>

              <Link to='/admin/communications' style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="it announce">
                <div className="icon"><GrAnnounce/></div>
                <div className="des">Announce</div>
              </div>
              </Link>

              <Link to='/admin/communications' style={{textDecoration: 'none', color: 'inherit'}}>
              <div className="it messaging">
                <div className="icon"><IoChatbubblesOutline/></div>
                <div className="des">Messaging center</div>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
