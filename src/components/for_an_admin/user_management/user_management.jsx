import React, { useRef, useEffect } from 'react'
import './user_management.css'
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { LuUserRoundCheck,LuUserPlus, LuChartColumnIncreasing } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { MdBolt, MdOutlineEventRepeat   , MdOutlineManageAccounts } from "react-icons/md";
import { FiBarChart2 } from "react-icons/fi";
import Chart from 'chart.js/auto';
import { FaChartLine } from "react-icons/fa6";
import { SlNotebook } from "react-icons/sl";
import { Link } from 'react-router-dom';




export const User_management = () => {
    const performanceChart = useRef(null);

    useEffect(() => {
      const canvas = performanceChart.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          datasets: [{
            label: 'Average Score',
            data: [75, 78, 82, 80, 85, 88,12,34,23,67,11,97],
            borderColor: '#A05AC8',
            backgroundColor: 'rgba(195, 0, 255, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 0,
              max: 100
            }
          }
        }
      });

      return () => {
        chart.destroy();
      };
    }, []);
  return (
    <div className='user_management'>
        <div className="box">
            <div className="upper">
                <div className="up">
                    <h3>User management overview</h3>
                    <p>Manage all registered users across your school platform. Add, edit, or deactivate teacher and student accounts, assign roles, and monitor activity with ease.</p>
                </div>
            </div>
            <div className="mini_up">
                <div className="divs div1">
                    <div className="up">
                        <div className="left">
                            <div className="icon"><FiUsers/></div>
                        </div>
                        <div className="right">
                            <p className="des">Total students</p>
                            <h3 className='total_counter'>1,247</h3>
                        </div>
                    </div>
                    <div className="down">
                        <div className="icon"><IoMdTrendingUp/></div>
                        <div className="increasing">
                            <p className='increase'>+12% from last term</p>
                        </div>
                    </div>
                </div>
                <div className="divs div2">
                    <div className="up">
                        <div className="left">
                            <div className="icon"><LuUserRoundCheck/></div>
                        </div>
                        <div className="right">
                            <p className="des">Total teachers</p>
                            <h3 className='total_counter'>42</h3>
                        </div>
                    </div>
                    <div className="down">
                        <div className="icon"><IoMdTrendingUp/></div>
                        <div className="increasing">
                            <p className='increase'>+3% from last year</p>
                        </div>
                    </div>
                </div>
                <div className="divs div3">
                    <div className="up">
                        <div className="left">
                            <div className="icon"><CiCalendar/></div>
                        </div>
                        <div className="right">
                            <p className="des">Active classes</p>
                            <h3 className='total_counter'>23</h3>
                        </div>
                    </div>
                    <div className="down">
                        <div className="icon"><IoMdTrendingUp/></div>
                        <div className="increasing">
                            <p className='increase'>+1% from last year</p>
                        </div>
                    </div>
                </div>
                <div className="divs div4">
                    <div className="up">
                        <div className="left">
                            <div className="icon"><LuChartColumnIncreasing/></div>
                        </div>
                        <div className="right">
                            <p className="des">Attendance rate</p>
                            <h3 className='total_counter'>91.7%</h3>
                        </div>
                    </div>
                    <div className="down decreasing">
                        <div className="icon"><IoMdTrendingDown/></div>
                        <div className="increasing">
                            <p className='increase'>-2.7% from last month</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="middle">
                <div className="LeftSider">
                    <div className="buttons">
                        <div className="up"><MdBolt className='icon'/><h4>Quick actions</h4></div>
                        <div className="down">
                            <Link to='students' style={{color:'inherit', textDecoration:'none', width: '100%'}}>
                            <div className="divs div1">
                                <div className="icon"><LuUserPlus/></div>
                                <div className="des">Manage students</div>
                            </div>
                            </Link>
                             <Link to='teachers' style={{color:'inherit', textDecoration:'none', width: '100%'}}>
                            <div className="divs div2">
                                <div className="icon"><MdOutlineManageAccounts /></div>
                                <div className="des">Manage teachers</div>
                            </div>
                            </Link>
                             <Link to='classes' style={{color:'inherit', textDecoration:'none', width: '100%'}}>
                            <div className="divs div3">
                                <div className="icon"><SlNotebook/></div>
                                <div className="des">Manage classes</div>
                            </div>
                            </Link>
                             <Link to='reports' style={{color:'inherit', textDecoration:'none', width: '100%'}}>
                            <div className="divs div4">
                                <div className="icon"><FiBarChart2/></div>
                                <div className="des">Generate report</div>
                            </div>  
                            </Link>
                        </div>  
                    </div>
                    <div className="stats">
                        <div className="des">
                            <h4> <FaChartLine className='icon'/> <span>Average performance of students in this year</span></h4>
                        </div>
                        <div className="chart">
                            <canvas ref={performanceChart}></canvas>
                        </div>
                    </div>
                </div>
                <div className="rightSider">
                    <div className="div1">
                        <div className="up">
                            <h4><MdOutlineEventRepeat  className='icon'/><span>Recent activities</span></h4>
                        </div>
                        <div className="boxes">
                            <div className="box1 all type_about_class">
                                <div className="des_and_counter"><h5>New class enrolled</h5><span className="counter">2 hours ago</span></div>
                                <p className='activity_message'>L3 SOD A was added successfully</p>
                            </div>
                            <div className="box2 all type_about_teachers">
                                <div className="des_and_counter"><h5>Teacher revoked permissions</h5><span className="counter">2 hours ago</span></div>
                                <p className='activity_message'>Teacher Nelly Valentin was revoked permission to enter marks</p>
                            </div>
                            <div className="box3 all type_about_students">
                                <div className="des_and_counter"><h5>New student enrolled</h5><span className="counter">5 hours ago</span></div>
                                <p className='activity_message'>A new comer student was inserted in L4 SOD C successfully.</p>
                            </div>
                            <div className="box4 all type_about_report">
                                <div className="des_and_counter"><h5>New generated report</h5><span className="counter">1 hour ago</span></div>
                                <p className='activity_message'>You have been generated a new report about students</p>
                            </div>
                            <div className="box5 all type_about_class">
                                <div className="des_and_counter"><h5>New class enrolled</h5><span className="counter">2 hours ago</span></div>
                                <p className='activity_message'>L3 SOD A was added successfully</p>
                            </div>
                            <div className="box6 all type_about_teachers">
                                <div className="des_and_counter"><h5>Teacher revoked permissions</h5><span className="counter">2 hours ago</span></div>
                                <p className='activity_message'>Teacher Nelly Valentin was revoked permission to enter marks</p>
                            </div>
                            <div className="box7 all type_about_students">
                                <div className="des_and_counter"><h5>New student enrolled</h5><span className="counter">5 hours ago</span></div>
                                <p className='activity_message'>A new comer student was inserted in L4 SOD C successfully.</p>
                            </div>
                            <div className="box8 all type_about_report">
                                <div className="des_and_counter"><h5>New generated report</h5><span className="counter">1 hour ago</span></div>
                                <p className='activity_message'>You have been generated a new report about students</p>
                            </div>
                            <div className="box9 all type_about_class">
                                <div className="des_and_counter"><h5>New class enrolled</h5><span className="counter">2 hours ago</span></div>
                                <p className='activity_message'>L3 SOD A was added successfully</p>
                            </div>
                            <div className="box10 all type_about_teachers">
                                <div className="des_and_counter"><h5>Teacher revoked permissions</h5><span className="counter">2 hours ago</span></div>
                                <p className='activity_message'>Teacher Nelly Valentin was revoked permission to enter marks</p>
                            </div>
                            <div className="box11 all type_about_students">
                                <div className="des_and_counter"><h5>New student enrolled</h5><span className="counter">5 hours ago</span></div>
                                <p className='activity_message'>A new comer student was inserted in L4 SOD C successfully.</p>
                            </div>
                            <div className="box12 all type_about_report">
                                <div className="des_and_counter"><h5>New generated report</h5><span className="counter">1 hour ago</span></div>
                                <p className='activity_message'>You have been generated a new report about students</p>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    </div>
  )
}
