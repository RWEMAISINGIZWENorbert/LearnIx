import React from 'react';
import './TeacherGrades.css';
import { BiBarChart } from 'react-icons/bi';
import { FaEdit, FaSave } from 'react-icons/fa';

export const TeacherGrades = () => {
  const grades = [
    { id: 'STU001', name: 'John Doe', class: 'L5 SOD A', midterm: 85, assignments: 88, quizzes: 90, final: 87, total: 87.5 },
    { id: 'STU002', name: 'Emma Wilson', class: 'L5 SOD A', midterm: 92, assignments: 90, quizzes: 95, final: 91, total: 92 },
    { id: 'STU003', name: 'Michael Brown', class: 'L5 SOD B', midterm: 70, assignments: 75, quizzes: 72, final: 73, total: 72.5 },
    { id: 'STU004', name: 'Sarah Davis', class: 'L6 SOD A', midterm: 95, assignments: 93, quizzes: 97, final: 94, total: 94.75 },
    { id: 'STU005', name: 'James Johnson', class: 'L5 SOD C', midterm: 80, assignments: 82, quizzes: 85, final: 81, total: 82 }
  ];

  return (
    <div className='teacherGrades'>
      <div className="box">
        <div className="upper">
          <h2>Grade Management</h2>
          <p>Enter and manage student grades</p>
        </div>

        <div className="table-container">
          <table className="grades-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Midterm (30%)</th>
                <th>Assignments (20%)</th>
                <th>Quizzes (20%)</th>
                <th>Final (30%)</th>
                <th>Total</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td className="student-name">{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.midterm}</td>
                  <td>{student.assignments}</td>
                  <td>{student.quizzes}</td>
                  <td>{student.final}</td>
                  <td className="total-grade">{student.total}</td>
                  <td>
                    <span className={`grade-badge ${student.total >= 90 ? 'excellent' : student.total >= 80 ? 'good' : 'average'}`}>
                      {student.total >= 90 ? 'A' : student.total >= 80 ? 'B' : student.total >= 70 ? 'C' : 'D'}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn"><FaEdit /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
