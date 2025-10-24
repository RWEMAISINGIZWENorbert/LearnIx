import React, { useState } from 'react';
import './resources_management.css'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { LuBookOpen, LuFileText, LuDownload, LuUpload, LuEye, LuTrash, LuPlus } from 'react-icons/lu';
import { MdOutlineSubject, MdOutlineClass, MdOutlineSchedule } from 'react-icons/md';
import { FaLongArrowAltRight, FaFilePdf, FaFileWord, FaFileImage, FaFileVideo, FaEdit } from "react-icons/fa";

export const Resources_management = () => {
  let navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('documents');

  const documents = [
    {
      id: 1,
      name: "Mathematics Past Papers 2023",
      type: "pdf",
      size: "2.4 MB",
      uploaded: "2 days ago",
      downloads: 156,
      category: "Past Papers"
    },
    {
      id: 2,
      name: "Our school new rules and regulations",
      type: "pdf",
      size: "1.8 MB",
      uploaded: "1 week ago",
      downloads: 89,
      category: "Rules and regulations"
    },
    {
      id: 3,
      name: "English Literature Notes",
      type: "docx",
      size: "3.2 MB",
      uploaded: "3 days ago",
      downloads: 234,
      category: "Learning notes"
    },
    {
      id: 4,
      name: "Chemistry Periodic Table",
      type: "png",
      size: "456 KB",
      uploaded: "5 days ago",
      downloads: 78,
      category: "other"
    },
    {
      id: 5,
      name: "Mathematics notes",
      type: "mp4",
      size: "45.6 MB",
      uploaded: "1 week ago",
      downloads: 123,
      category: "Learning notes"
    }
  ];

  const categories = [
    { name: "Learning notes", count: 45, color: "#3b82f6" },
    { name: "Past papers", count: 32, color: "#22c55e" },
    { name: "Rules and regulations", count: 25, color: "#ef4444" },
    { name: "Reading books", count: 18, color: "#f59e0b" },
    { name: "Novels", count: 12, color: "#8b5cf6" },
    { name: "Other", count: 2, color: "#e45cf6ff" }
  ];

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FaFilePdf className="icon pdf" />;
      case 'docx': return <FaFileWord className="icon word" />;
      case 'png': case 'jpg': case 'jpeg': return <FaFileImage className="icon image" />;
      case 'mp4': case 'avi': return <FaFileVideo className="icon video" />;
      default: return <LuFileText className="icon default" />;
    }
  };

  const getFileColor = (type) => {
    switch(type) {
      case 'pdf': return '#ef4444';
      case 'docx': return '#3b82f6';
      case 'png': case 'jpg': case 'jpeg': return '#22c55e';
      case 'mp4': case 'avi': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const tabs = [
    { id: 'documents', label: 'Documents', icon: <LuFileText /> },
    { id: 'categories', label: 'Categories', icon: <MdOutlineSubject /> },
    { id: 'uploads', label: 'Upload', icon: <LuUpload /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'documents':
        return (
          <div className="content_section">
            <div className="section_header">
              <h3>Document Library</h3>
              <div className="header_actions">
                <button className="upload_button">
                  <LuUpload className="icon" />
                  <span>Upload File</span>
                </button>
                <button className="filter_button">Filter</button>
              </div>
            </div>
            <div className="documents_list">
              {documents.map(document => (
                <div key={document.id} className="document_card">
                  <div className="document_icon">
                    {getFileIcon(document.type)}
                  </div>
                  <div className="document_info">
                    <h4>{document.name}</h4>
                    <div className="document_meta">
                      <span className="category">{document.category}</span>
                      <span className="size">{document.size}</span>
                      <span className="uploaded">{document.uploaded}</span>
                    </div>
                    <div className="document_stats">
                      <span className="downloads">{document.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="document_actions">
                    <button className="view"><LuEye /></button>
                    <button className="download"><LuDownload /></button>
                    <button className="edit"><FaEdit /></button>
                    <button className="delete"><LuTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'categories':
        return (
          <div className="content_section">
            <div className="section_header">
              <h3>Resource Categories</h3>
              <button className="add_button">
                <LuPlus className="icon" />
                <span>Add Category</span>
              </button>
            </div>
            <div className="categories_grid">
              {categories.map((category, index) => (
                <div key={index} className="category_card">
                  <div className="category_header">
                    <div className="category_icon" style={{ backgroundColor: category.color }}>
                      <LuBookOpen />
                    </div>
                    <div className="category_info">
                      <h4>{category.name}</h4>
                      <p>{category.count} files</p>
                    </div>
                  </div>
                  <div className="category_actions">
                    <button className="view">View Files</button>
                    <button className="edit">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'uploads':
        return (
          <div className="content_section">
            <div className="upload_section">
              <div className="upload_area">
                <div className="upload_icon">
                  <LuUpload />
                </div>
                <h3>Upload Resources</h3>
                <p>Drag and drop files here or click to browse</p>
                <button className="browse_button">Browse Files</button>
              </div>
              
              <div className="upload_form">
                <div className="form_group">
                  <label>File Name</label>
                  <input type="text" placeholder="Enter file name" />
                </div>
                <div className="form_group">
                  <label>Category</label>
                  <select>
                    <option value="category" hidden disabled>Select file category</option>
                    <option value="category">Learning notes</option>
                    <option value="category">Past papers</option>
                    <option value="category">Rules and regulations</option>
                    <option value="category">Reading books</option>
                    <option value="category">Novels</option>
                    <option value="category">Other</option>
                  </select>
                </div>
                <div className="form_group">
                  <label>Description</label>
                  <textarea placeholder="Enter file description"></textarea>
                </div>
                <button className="submit_button">Upload File</button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className='resources_management'>
        <div className="box">
          <div className="whole_up">
            <div className="upper">
              <h4>Resources Management</h4>
              <p>Manage educational resources, documents, and learning materials. Organize files by category and track usage analytics.</p>
            </div>
          </div>
          
          <div className="middle">
            <div className="tabs">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            
            <div className="content">
              {renderContent()}
            </div>
          </div>
        </div>
    </div>
  )
}
