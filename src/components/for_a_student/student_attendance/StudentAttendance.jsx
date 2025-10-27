import React from 'react';
import './StudentAttendance.css';
import { LuClipboardList, LuCalendar } from 'react-icons/lu';
import { MdCheckCircle, MdCancel } from 'react-icons/md';

export const StudentAttendance = () => {
  const attendance = [
    { course: 'Advanced Mathematics', present: 28, absent: 2, percentage: 93, color: '#3b82f6' },
    { course: 'Physics Laboratory', present: 25, absent: 3, percentage: 89, color: '#10b981' },
    { course: 'Software Development', present: 30, absent: 0, percentage: 100, color: '#8b5cf6' },
    { course: 'English Literature', present: 24, absent: 4, percentage: 86, color: '#ef4444' },
    { course: 'Database Management', present: 27, absent: 2, percentage: 93, color: '#f59e0b' },
    { course: 'Web Technologies', present: 29, absent: 1, percentage: 97, color: '#06b6d4' }
  ];

  const overallPresent = attendance.reduce((sum, c) => sum + c.present, 0);
  const overallAbsent = attendance.reduce((sum, c) => sum + c.absent, 0);
  const overallPercentage = Math.round((overallPresent / (overallPresent + overallAbsent)) * 100);

  return (
    <div className='studentAttendance'>
      <div className="box">
        <div className="upper">
          <h2>Attendance Record</h2>
          <p>Track your class attendance</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card main">
            <div className="icon"><LuClipboardList /></div>
            <div className="content">
              <h3>Overall Attendance</h3>
              <div className="value">{overallPercentage}%</div>
              <p>{overallPresent} Present, {overallAbsent} Absent</p>
            </div>
          </div>
        </div>

        <div className="attendance-list">
          {attendance.map((item, index) => (
            <div key={index} className="attendance-card" style={{borderLeft: `4px solid ${item.color}`}}>
              <div className="card-header">
                <h3>{item.course}</h3>
                <div className="percentage" style={{color: item.color}}>{item.percentage}%</div>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{width: `${item.percentage}%`, background: item.color}}></div>
              </div>
              <div className="stats">
                <div className="stat present">
                  <MdCheckCircle className="icon" />
                  <span>{item.present} Present</span>
                </div>
                <div className="stat absent">
                  <MdCancel className="icon" />
                  <span>{item.absent} Absent</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
