import React from 'react';
import './TeacherClasses.css';
import { FaUsers, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { BiBarChart } from 'react-icons/bi';
import { MdOutlineAssignment } from 'react-icons/md';
import { HiOutlineBookOpen } from 'react-icons/hi';

export const TeacherClasses = () => {
  const classes = [
    {
      id: 1,
      name: 'Web Development',
      code: 'CS301',
      level: 'Level 5',
      class: 'SOD A',
      students: 24,
      schedule: 'Mon, Wed 09:00-11:00',
      room: 'Lab 301',
      color: '#3b82f6',
      avgGrade: 85,
      attendance: 92,
      assignments: 8
    },
    {
      id: 2,
      name: 'Database Systems',
      code: 'CS302',
      level: 'Level 5',
      class: 'SOD B',
      students: 26,
      schedule: 'Tue, Thu 11:30-13:30',
      room: 'Room 205',
      color: '#10b981',
      avgGrade: 78,
      attendance: 88,
      assignments: 6
    },
    {
      id: 3,
      name: 'Software Engineering',
      code: 'CS401',
      level: 'Level 6',
      class: 'SOD A',
      students: 22,
      schedule: 'Mon, Fri 14:00-16:00',
      room: 'Room 108',
      color: '#8b5cf6',
      avgGrade: 82,
      attendance: 90,
      assignments: 7
    },
    {
      id: 4,
      name: 'Mobile App Development',
      code: 'CS303',
      level: 'Level 5',
      class: 'SOD C',
      students: 20,
      schedule: 'Wed, Fri 10:00-12:00',
      room: 'Lab 302',
      color: '#f59e0b',
      avgGrade: 88,
      attendance: 94,
      assignments: 5
    },
    {
      id: 5,
      name: 'Cloud Computing',
      code: 'CS402',
      level: 'Level 6',
      class: 'SOD B',
      students: 18,
      schedule: 'Tue, Thu 14:00-16:00',
      room: 'Lab 201',
      color: '#06b6d4',
      avgGrade: 80,
      attendance: 87,
      assignments: 6
    },
    {
      id: 6,
      name: 'AI & Machine Learning',
      code: 'CS501',
      level: 'Level 7',
      class: 'SOD A',
      students: 15,
      schedule: 'Mon, Wed 16:00-18:00',
      room: 'Lab 401',
      color: '#ef4444',
      avgGrade: 75,
      attendance: 85,
      assignments: 9
    }
  ];

  return (
    <div className='teacherClasses'>
      <div className="box">
        <div className="upper">
          <h2>My Classes</h2>
          <p>Manage and monitor all your teaching classes</p>
        </div>

        <div className="classes-grid">
          {classes.map((cls) => (
            <div key={cls.id} className="class-card">
              <div className="class-header" style={{borderLeft: `4px solid ${cls.color}`}}>
                <div className="class-icon" style={{background: `${cls.color}20`, color: cls.color}}>
                  <HiOutlineBookOpen />
                </div>
                <div className="class-info">
                  <h3>{cls.name}</h3>
                  <p className="class-code">{cls.code}</p>
                </div>
              </div>

              <div className="class-details">
                <div className="detail-item">
                  <span className="badge" style={{background: `${cls.color}20`, color: cls.color}}>
                    {cls.level}
                  </span>
                  <span>{cls.class}</span>
                </div>
                <div className="detail-item">
                  <FaUsers className="icon" />
                  <span>{cls.students} students</span>
                </div>
                <div className="detail-item">
                  <FaClock className="icon" />
                  <span>{cls.schedule}</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt className="icon" />
                  <span>{cls.room}</span>
                </div>
                <div className="detail-item">
                  <MdOutlineAssignment className="icon" />
                  <span>{cls.assignments} assignments</span>
                </div>
              </div>

              <div className="class-stats">
                <div className="stat">
                  <div className="stat-header">
                    <span className="label">Avg. Grade</span>
                    <span className="value">{cls.avgGrade}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress" style={{width: `${cls.avgGrade}%`, background: cls.color}}></div>
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-header">
                    <span className="label">Attendance</span>
                    <span className="value">{cls.attendance}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress" style={{width: `${cls.attendance}%`, background: cls.color}}></div>
                  </div>
                </div>
              </div>

              <div className="class-actions">
                <button className="btn-primary" style={{background: cls.color}}>Manage Class</button>
                <button className="btn-secondary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
