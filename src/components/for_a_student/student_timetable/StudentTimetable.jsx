import React, { useState } from 'react';
import './StudentTimetable.css';
import { LuCalendarDays, LuClock } from 'react-icons/lu';
import { HiOutlineBookOpen, HiOutlineAcademicCap } from 'react-icons/hi';
import { MdLocationOn } from 'react-icons/md';

export const StudentTimetable = () => {
  const [selectedDay, setSelectedDay] = useState('monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const timetable = {
    monday: [
      { time: '08:00 - 09:30', course: 'Advanced Mathematics', code: 'MATH 301', room: 'Room 301', teacher: 'Dr. Sarah Johnson', color: '#3b82f6' },
      { time: '09:45 - 11:15', course: 'Software Development', code: 'CS 401', room: 'Computer Lab A', teacher: 'Dr. Emily Chen', color: '#8b5cf6' },
      { time: '12:00 - 13:30', course: 'Database Management', code: 'CS 301', room: 'Computer Lab B', teacher: 'Dr. David Martinez', color: '#f59e0b' }
    ],
    tuesday: [
      { time: '08:00 - 09:30', course: 'Physics Laboratory', code: 'PHYS 201', room: 'Lab 102', teacher: 'Prof. Michael Brown', color: '#10b981' },
      { time: '09:45 - 11:15', course: 'English Literature', code: 'ENG 202', room: 'Room 205', teacher: 'Ms. Patricia Wilson', color: '#ef4444' },
      { time: '14:00 - 15:30', course: 'Web Technologies', code: 'CS 402', room: 'Computer Lab C', teacher: 'Mr. James Taylor', color: '#06b6d4' }
    ],
    wednesday: [
      { time: '08:00 - 09:30', course: 'Advanced Mathematics', code: 'MATH 301', room: 'Room 301', teacher: 'Dr. Sarah Johnson', color: '#3b82f6' },
      { time: '09:45 - 11:15', course: 'Software Development', code: 'CS 401', room: 'Computer Lab A', teacher: 'Dr. Emily Chen', color: '#8b5cf6' },
      { time: '13:00 - 14:30', course: 'Web Technologies', code: 'CS 402', room: 'Computer Lab C', teacher: 'Mr. James Taylor', color: '#06b6d4' }
    ],
    thursday: [
      { time: '09:45 - 11:15', course: 'Physics Laboratory', code: 'PHYS 201', room: 'Lab 102', teacher: 'Prof. Michael Brown', color: '#10b981' },
      { time: '12:00 - 13:30', course: 'Database Management', code: 'CS 301', room: 'Computer Lab B', teacher: 'Dr. David Martinez', color: '#f59e0b' },
      { time: '14:00 - 15:30', course: 'English Literature', code: 'ENG 202', room: 'Room 205', teacher: 'Ms. Patricia Wilson', color: '#ef4444' }
    ],
    friday: [
      { time: '08:00 - 09:30', course: 'Advanced Mathematics', code: 'MATH 301', room: 'Room 301', teacher: 'Dr. Sarah Johnson', color: '#3b82f6' },
      { time: '10:00 - 11:30', course: 'Database Management', code: 'CS 301', room: 'Computer Lab B', teacher: 'Dr. David Martinez', color: '#f59e0b' },
      { time: '13:00 - 14:30', course: 'Web Technologies', code: 'CS 402', room: 'Computer Lab C', teacher: 'Mr. James Taylor', color: '#06b6d4' }
    ]
  };

  return (
    <div className='studentTimetable'>
      <div className="box">
        <div className="upper">
          <h2>Class Timetable</h2>
          <p>Your weekly class schedule</p>
        </div>

        <div className="week-navigator">
          {days.map(day => (
            <button
              key={day}
              className={selectedDay === day.toLowerCase() ? 'active' : ''}
              onClick={() => setSelectedDay(day.toLowerCase())}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="schedule-grid">
          {timetable[selectedDay].map((session, index) => (
            <div key={index} className="session-card" style={{border:'none'}}>
              <div className="session-header">
                <div className="time-badge">
                  <LuClock className="icon" />
                  <span>{session.time}</span>
                </div>
                <div className="course-badge" style={{background: `${session.color}20`, color: session.color}}>
                  {session.code}
                </div>
              </div>
              <div className="session-content">
                <h3>{session.course}</h3>
                <div className="session-details">
                  <div className="detail">
                    <HiOutlineAcademicCap className="icon" />
                    <span>{session.teacher}</span>
                  </div>
                  <div className="detail">
                    <MdLocationOn className="icon" />
                    <span>{session.room}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="weekly-overview">
          <h3>Weekly Overview</h3>
          <div className="overview-grid">
            {days.map(day => (
              <div key={day} className="day-column">
                <div className="day-header">{day}</div>
                <div className="day-sessions">
                  {timetable[day.toLowerCase()].map((session, index) => (
                    <div key={index} className="mini-session" style={{background: `${session.color}15`, borderLeft: `3px solid ${session.color}`}}>
                      <div className="time">{session.time.split(' - ')[0]}</div>
                      <div className="course">{session.code}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
