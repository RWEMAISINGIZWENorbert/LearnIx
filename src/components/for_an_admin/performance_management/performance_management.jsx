import React, { useState } from 'react';
import './performance_management.css';
import { FaSearch, FaDownload, FaFilter, FaChartLine, FaUserGraduate, FaCalendarCheck } from 'react-icons/fa';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';

export const Performance_management = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const performanceData = [
    {
      id: 1,
      studentId: 'STUGHASOD046',
      name: 'John Doe',
      class: 'L5 SOD A',
      averageGrade: 85,
      attendance: 95,
      trend: 'up',
      subjects: [
        { name: 'Mathematics', grade: 88 },
        { name: 'Physics', grade: 82 },
        { name: 'Programming', grade: 90 }
      ]
    },
    {
      id: 2,
      studentId: 'STUGHASOD047',
      name: 'Jane Smith',
      class: 'L5 SOD A',
      averageGrade: 92,
      attendance: 98,
      trend: 'up',
      subjects: [
        { name: 'Mathematics', grade: 95 },
        { name: 'Physics', grade: 90 },
        { name: 'Programming', grade: 91 }
      ]
    },
    {
      id: 3,
      studentId: 'STUGHANET023',
      name: 'Mike Johnson',
      class: 'L5 NET B',
      averageGrade: 78,
      attendance: 88,
      trend: 'down',
      subjects: [
        { name: 'Networking', grade: 75 },
        { name: 'Security', grade: 80 },
        { name: 'Systems', grade: 79 }
      ]
    }
  ];

  const stats = [
    { title: 'Average Performance', value: '85%', icon: <FaChartLine />, color: '#A05AC8' },
    { title: 'Total Students', value: '1,500', icon: <FaUserGraduate />, color: '#10b981' },
    { title: 'Avg Attendance', value: '94%', icon: <FaCalendarCheck />, color: '#f59e0b' },
    { title: 'Top Performers', value: '245', icon: <MdTrendingUp />, color: '#3b82f6' }
  ];

  const filteredData = performanceData.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='performance_management'>
      <div className="performance_management_header">
        <div className="performance_management_title">
          <h1>Performance & Attendance</h1>
          <p>Track and analyze student academic performance and attendance records</p>
        </div>
        <button className="performance_management_export_btn">
          <FaDownload /> Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="performance_management_stats_grid">
        {stats.map((stat, index) => (
          <div className="performance_management_stat_card" key={index} style={{ borderColor: stat.color }}>
            <div className="performance_management_stat_icon" style={{ background: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="performance_management_stat_info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="performance_management_controls">
        <div className="performance_management_search_box">
          <FaSearch className="performance_management_search_icon" />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="performance_management_filters">
          <button
            className={selectedFilter === 'all' ? 'active' : ''}
            onClick={() => setSelectedFilter('all')}
          >
            All Students
          </button>
          <button
            className={selectedFilter === 'high' ? 'active' : ''}
            onClick={() => setSelectedFilter('high')}
          >
            High Performers
          </button>
          <button
            className={selectedFilter === 'low' ? 'active' : ''}
            onClick={() => setSelectedFilter('low')}
          >
            Need Attention
          </button>
        </div>
      </div>

      {/* Performance Table */}
      <div className="performance_management_table_container">
        <table className="performance_management_table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Average Grade</th>
              <th>Attendance</th>
              <th>Trend</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(student => (
              <tr key={student.id}>
                <td className="performance_management_student_id">{student.studentId}</td>
                <td className="performance_management_student_name">{student.name}</td>
                <td>{student.class}</td>
                <td>
                  <div className="performance_management_grade_cell">
                    <div className="performance_management_progress_bar">
                      <div 
                        className="performance_management_progress_fill"
                        style={{ 
                          width: `${student.averageGrade}%`,
                          background: student.averageGrade >= 80 ? '#10b981' : student.averageGrade >= 60 ? '#f59e0b' : '#ef4444'
                        }}
                      ></div>
                    </div>
                    <span>{student.averageGrade}%</span>
                  </div>
                </td>
                <td>
                  <span className={`performance_management_attendance_badge ${student.attendance >= 90 ? 'high' : 'low'}`}>
                    {student.attendance}%
                  </span>
                </td>
                <td>
                  <span className={`performance_management_trend ${student.trend}`}>
                    {student.trend === 'up' ? <MdTrendingUp /> : <MdTrendingDown />}
                  </span>
                </td>
                <td>
                  <button className="performance_management_view_btn">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
