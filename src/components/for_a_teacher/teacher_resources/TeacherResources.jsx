import React from 'react';
import './TeacherResources.css';
import { FaFilePdf, FaVideo, FaUpload, FaDownload } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';

export const TeacherResources = () => {
  const resources = [
    { id: 1, title: 'Web Development Lecture 1', type: 'pdf', course: 'Web Development', size: '2.5 MB', date: '2024-10-25', color: '#3b82f6' },
    { id: 2, title: 'React Tutorial Series', type: 'video', course: 'Web Development', size: '150 MB', date: '2024-10-24', color: '#3b82f6' },
    { id: 3, title: 'Database Design Guide', type: 'pdf', course: 'Database Systems', size: '1.8 MB', date: '2024-10-23', color: '#10b981' },
    { id: 4, title: 'SQL Cheat Sheet', type: 'pdf', course: 'Database Systems', size: '500 KB', date: '2024-10-22', color: '#10b981' }
  ];

  return (
    <div className='teacherResources'>
      <div className="box">
        <div className="upper">
          <h2>Resources Library</h2>
          <p>Upload and manage course materials</p>
        </div>

        <button className="upload-btn">
          <MdAdd className="icon" /> Upload Resource
        </button>

        <div className="resources-grid">
          {resources.map((resource) => (
            <div className="resource-card" key={resource.id}>
              <div className="resource-icon" style={{background: `${resource.color}20`, color: resource.color}}>
                {resource.type === 'pdf' ? <FaFilePdf /> : <FaVideo />}
              </div>
              <div className="resource-info">
                <h3>{resource.title}</h3>
                <p className="course">{resource.course}</p>
                <div className="meta">
                  <span>{resource.size}</span>
                  <span>{new Date(resource.date).toLocaleDateString()}</span>
                </div>
              </div>
              <button className="download-btn" style={{background: resource.color}}><FaDownload /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
