import React from 'react'
import './user_management.css'
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { LuUserRoundCheck,LuUserPlus, LuChartColumnIncreasing } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { MdBolt } from "react-icons/md";

export const User_management = () => {
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
                            <p className='increase'>+2.7% from last month</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="middle">
                <div className="up"><h3>Quick actions</h3><MdBolt className='icon'/></div>
                <div className="down">
                    <div className="divs div1">
                        <div className="icon"><LuUserPlus/></div>
                        <div className="des">Manage students</div>
                    </div>
                    <div className="divs div2">
                        <div className="icon"><LuUserPlus/></div>
                        <div className="des">Create classes</div>
                    </div>
                    <div className="divs div3">
                        <div className="icon"><LuUserPlus/></div>
                        <div className="des">Generate report</div>
                    </div>
                    <div className="divs div4">
                        <div className="icon"><LuUserPlus/></div>
                        <div className="des">Manage students</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
