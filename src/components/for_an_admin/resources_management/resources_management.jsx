import React, { useState } from 'react';
import './resources_management.css'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirmation } from '../../shared/DeleteConfirmation';
import { LuBookOpen, LuFileText, LuDownload, LuUpload, LuEye, LuTrash, LuPlus } from 'react-icons/lu';
import { MdOutlineSubject } from 'react-icons/md';
import { FaFilePdf, FaFileWord, FaFileImage, FaFileVideo } from "react-icons/fa";

export const Resources_management = () => {
  let navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('documents');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileCategory, setFileCategory] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [documents, setDocuments] = useState([
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
  ]);

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

  const handleDelete = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // Handle actual deletion logic here
    setDocuments(documents.filter(doc => doc.id !== itemToDelete.id));
    console.log(`Deleting ${deleteType}:`, itemToDelete);
    setShowDeleteConfirm(false);
    setItemToDelete(null);
    setDeleteType('');
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
    }
  };

  const handleFileUpload = () => {
    if (uploadedFile && fileName && fileCategory) {
      const newDocument = {
        id: documents.length + 1,
        name: fileName,
        type: uploadedFile.name.split('.').pop(),
        size: `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB`,
        uploaded: 'Just now',
        downloads: 0,
        category: fileCategory,
        file: uploadedFile
      };
      
      setDocuments([newDocument, ...documents]);
      
      // Reset form
      setUploadedFile(null);
      setFileName('');
      setFileCategory('');
      setFileDescription('');
      
      // Switch to documents tab to see the uploaded file
      setActiveTab('documents');
      
      alert('File uploaded successfully!');
    } else {
      alert('Please fill in all required fields and select a file.');
    }
  };

  const handleViewDocument = (document) => {
    // In a real application, this would open the document in a new tab or modal
    if (document.file) {
      const fileURL = URL.createObjectURL(document.file);
      window.open(fileURL, '_blank');
    } else {
      alert(`Viewing: ${document.name}\nThis would open the document in a viewer.`);
    }
  };

  const handleDownloadDocument = (doc) => {
    // In a real application, this would trigger a file download
    if (doc.file) {
      const fileURL = URL.createObjectURL(doc.file);
      const link = window.document.createElement('a');
      link.href = fileURL;
      link.download = doc.name;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      
      // Update download count
      setDocuments(documents.map(d => 
        d.id === doc.id 
          ? { ...d, downloads: d.downloads + 1 }
          : d
      ));
    } else {
      alert(`Downloading: ${doc.name}`);
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
                    <button className="view" onClick={() => handleViewDocument(document)} title="View document"><LuEye /></button>
                    <button className="download" onClick={() => handleDownloadDocument(document)} title="Download document"><LuDownload /></button>
                    <button className="delete" onClick={() => handleDelete(document, 'document')} title="Delete document"><LuTrash /></button>
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
                <p>Click the button below to select a file</p>
                <input 
                  type="file" 
                  id="fileInput" 
                  style={{ display: 'none' }} 
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.mp4,.avi"
                />
                <button className="browse_button" onClick={() => document.getElementById('fileInput').click()}>
                  {uploadedFile ? `Selected: ${uploadedFile.name}` : 'Browse Files'}
                </button>
              </div>
              
              <div className="upload_form">
                <div className="form_group">
                  <label>File Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter file name" 
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
                <div className="form_group">
                  <label>Category <span className="required">*</span></label>
                  <select 
                    value={fileCategory}
                    onChange={(e) => setFileCategory(e.target.value)}
                  >
                    <option value="" hidden>Select file category</option>
                    <option value="Learning notes">Learning notes</option>
                    <option value="Past papers">Past papers</option>
                    <option value="Rules and regulations">Rules and regulations</option>
                    <option value="Reading books">Reading books</option>
                    <option value="Novels">Novels</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form_group">
                  <label>Description</label>
                  <textarea 
                    placeholder="Enter file description (optional)"
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                  ></textarea>
                </div>
                <button 
                  className="submit_button" 
                  onClick={handleFileUpload}
                  disabled={!uploadedFile || !fileName || !fileCategory}
                >
                  Upload File
                </button>
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

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmation
          isOpen={showDeleteConfirm}
          onClose={() => {
            setShowDeleteConfirm(false);
            setItemToDelete(null);
            setDeleteType('');
          }}
          onConfirm={confirmDelete}
          itemName={itemToDelete?.name}
          itemType={deleteType}
        />
    </div>
  )
}
