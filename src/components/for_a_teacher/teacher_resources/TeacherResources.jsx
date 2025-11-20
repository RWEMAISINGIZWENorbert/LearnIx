import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import './TeacherResources.css';
import { DeleteConfirmation } from '../../shared/DeleteConfirmation';
import { LuBookOpen, LuFileText, LuDownload, LuUpload, LuEye, LuTrash, LuPlus } from 'react-icons/lu';
import { MdOutlineSubject } from 'react-icons/md';
import { FaFilePdf, FaFileWord, FaFileImage, FaFileVideo } from "react-icons/fa";
import { fetchAllResources, createResource, selectResources, selectResourcesLoading, selectResourcesError } from '../../../features/resources/resourcesSlice';
import FileViewer from '../../Docs/FileViewer';

export const TeacherResources = () => {
  const [viewedDocument, setViewedDocument] = useState(null);
  const [activeTab, setActiveTab] = useState('documents');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileCategory, setFileCategory] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  
  const dispatch = useDispatch();
  const resources = useSelector(selectResources);
  const loading = useSelector(selectResourcesLoading);
  const error = useSelector(selectResourcesError);
  
  // Transform API data to match the UI structure
  const documents = (resources || []).map(resource => ({
    id: resource?._id,
    name: resource?.title || 'Untitled',
    // type: getFileTypeFromUrl(resource?.fileUrl),
    type: '.pdf',
    size: "N/A", // This would need to come from the server
    uploaded: resource?.createdAt ? formatDistanceToNow(new Date(resource.createdAt), { addSuffix: true }) : 'Unknown',
    downloads: 0, // This would need to come from the server
    category: resource?.category || 'Other',
    description: resource?.description || '',
    fileUrl: resource?.fileUrl
  }));
  
  useEffect(() => {
    dispatch(fetchAllResources());
  }, [dispatch]);
  
  // Helper function to get file type from URL
  const getFileTypeFromUrl = (url) => {
    if (!url) return 'file';
    const extension = url.split('.').pop().toLowerCase();
    if (['pdf'].includes(extension)) return 'pdf';
    if (['doc', 'docx'].includes(extension)) return 'docx';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
    if (['mp4', 'webm', 'ogg'].includes(extension)) return 'video';
    return 'file';
  };

  const categories = [
    { name: "Lecture Notes", count: 45, color: "#3b82f6" },
    { name: "Tutorial", count: 32, color: "#22c55e" },
    { name: "Reference", count: 25, color: "#ef4444" },
    { name: "Assignment", count: 18, color: "#f59e0b" },
    { name: "Past Papers", count: 12, color: "#8b5cf6" },
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

  const handleDelete = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // Here you would call your delete API endpoint
    // For now, we'll just remove it from the local state
    // In a real app, you would dispatch a delete action here
    // dispatch(deleteResource(itemToDelete.id));
    
    setShowDeleteConfirm(false);
    setItemToDelete(null);
    setDeleteType('');
  };



  // const handleFileSelect = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Reset form
  //     setFileName('');
  //     setFileCategory('');
  //     setFileDescription('');
      
  //     // Set the file name for display
  //     setFileName(file.name);
      
  //     // You can add file validation here if needed
  //     const formData = new FormData();
  //     formData.append('image', file);
  //     formData.append('title', file.name.split('.')[0]); // Use filename as title
  //     if (fileCategory) formData.append('category', fileCategory);
  //     if (fileDescription) formData.append('description', fileDescription);
      
  //     // Dispatch the createResource action
  //     dispatch(createResource(formData))
  //       .unwrap()
  //       .then(() => {
  //         // Refresh the resources list
  //         dispatch(fetchAllResources());
  //         // Reset form
  //         setFileName('');
  //         setFileCategory('');
  //         setFileDescription('');
  //         setUploadedFile(null);
  //       })
  //       .catch(error => {
  //         console.error('Error uploading file:', error);
  //         // Handle error (show error message to user)
  //       });
  //     setUploadedFile(file);
  //     setFileName(file.name);
  //   }
  // };
   
  
  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Set the file name if no title is entered
      if (!fileName) {
        setFileName(file.name.split('.')[0]);
      }
    }
  };

  // Handle form submission
  const handleFileUpload = async () => {
    if (!uploadedFile || !fileName || !fileCategory) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);
      formData.append('title', fileName);
      formData.append('category', fileCategory);
      
      if (fileDescription) {
        formData.append('description', fileDescription);
      }

      // Log the data being sent
      console.group('Sending Resource Data');
      console.log('File:', uploadedFile);
      console.log('Title:', fileName);
      console.log('Category:', fileCategory);
      console.log('Description:', fileDescription || 'Not provided');
      console.log('FormData entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ', pair[1]);
      }
      console.groupEnd();

      const resultAction = await dispatch(createResource(formData));
      
      if (createResource.fulfilled.match(resultAction)) {
        // Refresh the resources list
        await dispatch(fetchAllResources());
        
        // Show success message
        alert('Resource uploaded successfully!');
        
        // Reset the form
        setFileName('');
        setFileCategory('');
        setFileDescription('');
        setUploadedFile(null);
        
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        // throw new Error(resultAction.error?.message || 'Failed to upload resource');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // The form submission is now handled by the handleFileUpload function above
      
  //     setActiveTab('documents');
      
  //     alert('File uploaded successfully!');
  //   } else {
  //     alert('Please fill in all required fields and select a file.');
  //   }
  // };

  const handleViewDocument = (document) => {
    if (document.fileUrl) {
      setViewedDocument(document);
    } else {
      alert(`Viewing: ${document.name}\nThis would open the document in a viewer.`);
    }
  };

// Add this near the top of your renderContent function
  if (viewedDocument) {
    return (
    <div style={{ width: '70%', height: '100vh', padding: '20px', transform: 'translateX(20vw)' }}>
      <button 
        onClick={() => setViewedDocument(null)} 
        style={{ marginBottom: '10px', padding: '5px 10px' }}
      >
        ← Back to Documents
      </button>
      <FileViewer url={viewedDocument.fileUrl} />
    </div>
   );
  }

  const handleDownloadDocument = (doc) => {
    console.log(`The Document Data ${doc}`)
    if (doc.fileUrl) {
      // const fileURL = URL.createObjectURL(doc.fileUrl);
      const link = window.document.createElement('a');
      link.href = doc.fileUrl;
      link.download = doc.title;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      
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
                <button className="upload_button" onClick={() => setActiveTab('uploads')}>
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
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Reference">Reference</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Past Papers">Past Papers</option>
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
      default:
        return null;
    }
  };

  return (
    <div className='teacherResources resources_management'>
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
