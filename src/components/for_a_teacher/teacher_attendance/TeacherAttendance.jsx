import React, { useState } from 'react';
import './TeacherAttendance.css';
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa';
import { MdSave } from 'react-icons/md';
import { FaXmark,FaCheck  } from "react-icons/fa6";

export const TeacherAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([
    { id: 'STU001', name: 'John Doe', status: 'present' },
    { id: 'STU002', name: 'Emma Wilson', status: 'present' },
    { id: 'STU003', name: 'Michael Brown', status: 'present' },
    { id: 'STU004', name: 'Sarah Davis', status: 'absent' },
    { id: 'STU005', name: 'James Johnson', status: 'present' },
    { id: 'STU006', name: 'Lisa Martinez', status: 'present' },
    { id: 'STU007', name: 'David Lee', status: 'present' },
    { id: 'STU008', name: 'Anna Taylor', status: 'absent' }
  ]);

  const toggleAttendance = (studentId) => {
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
        : student
    ));
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;

  return (
    <div className='teacherAttendance'>
      <div className="box">
        <div className="upper">
          <div>
            <h2>Attendance Management</h2>
            <p>Mark and track student attendance</p>
          </div>
          <button className="save-btn">
            <MdSave className="icon" /> Save Attendance
          </button>
        </div>

        <div className="controls">
          <div className="date-selector">
            <FaCalendarAlt className="icon" />
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </div>
          <div className="summary-cards">
            <div className="summary-card present">
              <FaCheck  className="icon" />
              <div>
                <h3>{presentCount}</h3>
                <p>Present</p>
              </div>
            </div>
            <div className="summary-card absent">
              <FaXmark className="icon" />
              <div>
                <h3>{absentCount}</h3>
                <p>Absent</p>
              </div>
            </div>
          </div>
        </div>

        <div className="students-list">
          {students.map((student) => (
            <div className={`student-row ${student.status}`} key={student.id}>
              <div className="student-info">
                <div className="avatar">{student.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <h4>{student.name}</h4>
                  <p className="student-id">{student.id}</p>
                </div>
              </div>
              <div className="attendance-toggle">
                <button
                  className={`toggle-btn ${student.status === 'present' ? 'active-present' : ''}`}
                  onClick={() => toggleAttendance(student.id)}
                >
                  <FaCheck  className="icon" /> Present
                </button>
                <button
                  className={`toggle-btn ${student.status === 'absent' ? 'active-absent' : ''}`}
                  onClick={() => toggleAttendance(student.id)}
                >
                  <FaXmark className="icon" /> Absent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
