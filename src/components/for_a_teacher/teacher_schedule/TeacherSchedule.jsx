import React, { useState } from 'react';
import './TeacherSchedule.css';
import { FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

export const TeacherSchedule = () => {
  const [selectedDay, setSelectedDay] = useState('monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const schedule = {
    monday: [
      { time: '09:00 - 11:00', course: 'Web Development', class: 'L5 SOD A', room: 'Lab 301', students: 24, color: '#3b82f6' },
      { time: '14:00 - 16:00', course: 'Software Engineering', class: 'L6 SOD A', room: 'Room 108', students: 22, color: '#8b5cf6' }
    ],
    tuesday: [
      { time: '11:30 - 13:30', course: 'Database Systems', class: 'L5 SOD B', room: 'Room 205', students: 26, color: '#10b981' }
    ],
    wednesday: [
      { time: '09:00 - 11:00', course: 'Web Development', class: 'L5 SOD A', room: 'Lab 301', students: 24, color: '#3b82f6' },
      { time: '10:00 - 12:00', course: 'Mobile App Development', class: 'L5 SOD C', room: 'Lab 302', students: 20, color: '#f59e0b' }
    ],
    thursday: [
      { time: '11:30 - 13:30', course: 'Database Systems', class: 'L5 SOD B', room: 'Room 205', students: 26, color: '#10b981' }
    ],
    friday: [
      { time: '10:00 - 12:00', course: 'Mobile App Development', class: 'L5 SOD C', room: 'Lab 302', students: 20, color: '#f59e0b' },
      { time: '14:00 - 16:00', course: 'Software Engineering', class: 'L6 SOD A', room: 'Room 108', students: 22, color: '#8b5cf6' }
    ]
  };

  return (
    <div className='teacherSchedule'>
      <div className="box">
        <div className="upper">
          <h2>My Schedule</h2>
          <p>View your weekly teaching timetable</p>
        </div>

        <div className="week-navigator">
          {days.map(day => (
            <button
              key={day}
              className={selectedDay === day.toLowerCase() ? 'day-btn active' : 'day-btn'}
              onClick={() => setSelectedDay(day.toLowerCase())}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="schedule-content">
          {schedule[selectedDay].map((session, index) => (
            <div className="session-card" key={index} style={{borderLeft: `none`}}>
              <div className="session-time" style={{background: `${session.color}20`, color: session.color}}>
                <FaClock className="icon" />
                <span>{session.time}</span>
              </div>
              <div className="session-details">
                <h4>{session.course}</h4>
                <div className="session-meta">
                  <div className="meta-item">
                    <FaUsers className="icon" />
                    <span>{session.class} • {session.students} students</span>
                  </div>
                  <div className="meta-item">
                    <FaMapMarkerAlt className="icon" />
                    <span>{session.room}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
