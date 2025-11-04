import React, { useState } from 'react';
import './classes_management.css'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';
import { DeleteConfirmation } from '../../shared/DeleteConfirmation';
import { CiSearch } from 'react-icons/ci';
import { LuUser, LuUsers } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import { FaLongArrowAltRight, FaUpload } from "react-icons/fa";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { BiEdit } from "react-icons/bi";


export const Classes_management = () => {
  let navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const [classToArchive, setClassToArchive] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  
  const [classes, setClasses] = useState([
    { id: 1, name: "L3 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
    { id: 2, name: "L3 SOD B", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
    { id: 3, name: "L3 ELT A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
    { id: 4, name: "L4 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
    { id: 5, name: "S4 MCB A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
    { id: 6, name: "L4 SOD B", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
    { id: 7, name: "S3A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
    { id: 8, name: "S5 PCB A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
    { id: 9, name: "L5 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
    { id: 10, name: "L5 SOD B", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
    { id: 11, name: "L5 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" }
  ]);

  const handleArchiveClass = (classItem) => {
    setClassToArchive(classItem);
    setShowArchiveConfirm(true);
  };

  const confirmArchive = () => {
    if (classToArchive) {
      setClasses(classes.map(c => 
        c.id === classToArchive.id ? { ...c, status: 'archived' } : c
      ));
      setShowArchiveConfirm(false);
      setClassToArchive(null);
    }
  };

  const filteredClasses = classes.filter(c => {
    if (activeTab === 'active') return c.status === 'active';
    if (activeTab === 'archived') return c.status === 'archived';
    return true;
  });

  return (
    <div className='classes_management'>
          <div className="box">
            <div className="whole_up">
              <div className="up">
                <div className="button">
                  <button  onClick={() =>navigate(-1)}><FaArrowLeft className='icon'/><span>Back</span></button>
                </div>
              </div>
              <div className="upper">
                <h4>Manage classes</h4>
                <p>Add, edit, and organize classes with ease. Keep enrollment records up to date and maintain a clean, searchable classes database.</p>
              </div>
              <div className="mini_up">
                <div className="search_box">
                    <div className="search">
                      <div className="icon"><CiSearch /></div>
                      <input type="text" placeholder='Search for classes . . .' />
                    </div>
                    <div className="button">
                      <button>Search</button>
                    </div>
                  </div>
                  <div className="new" onClick={() => setShowAddModal(true)}>
                    <div className="left"><div className="icon"><BiEdit/></div></div>
                    <div className="right">
                      <span>Create new class</span>
                      <p>current : {classes.length} classes</p>
                    </div>
                  </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              <button 
                className={activeTab === 'active' ? 'active' : ''} 
                onClick={() => setActiveTab('active')}
              >
                Active Classes ({classes.filter(c => c.status === 'active').length})
              </button>
              <button 
                className={activeTab === 'archived' ? 'active' : ''} 
                onClick={() => setActiveTab('archived')}
              >
                Archived Classes ({classes.filter(c => c.status === 'archived').length})
              </button>
            </div>

            <div className="middle">
              {filteredClasses.map(classItem => (
                <div className="class" key={classItem.id}>
                  <div className="up">
                    <h4 className="name">{classItem.name}</h4>
                    <p className={`active_status ${classItem.status}`}>{classItem.status}</p>
                  </div>
                  <div className="details">
                    <p><div className="icon"><LuUser/></div><span>Teacher {classItem.teacher}</span></p>
                    <p><div className="icon"><IoTimeOutline/></div><span>created <span>{classItem.created}</span></span></p>
                    <p><div className="icon"><LuUsers/></div><span>{classItem.students} students</span></p>
                  </div>
                  <div className="down">
                    <Link to={`/admin/students?class=${classItem.name}`} style={{ textDecoration: 'none', flex: 1 }}>
                      <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                    </Link>
                    <button className='archive' onClick={() => handleArchiveClass(classItem)}>
                      <span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="add_class_modal_overlay" onClick={() => setShowAddModal(false)}>
          <div className="add_class_modal" onClick={(e) => e.stopPropagation()}>
            <div className="add_class_modal_header">
              <h3>Create New Class</h3>
              <button className="add_class_modal_close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            
            <div className="add_class_modal_body">
              <div className="add_class_form_group">
                <label>Class Name</label>
                <input type="text" placeholder="Enter class name (e.g., L5 SOD A)" />
              </div>

              <div className="add_class_form_group">
                <label>Assign Teacher</label>
                <select>
                  <option value="">Select a teacher</option>
                  <option value="SHEMA Valentin">SHEMA Valentin</option>
                  <option value="Franco Nelly">Franco Nelly</option>
                  <option value="RWEMA Nobii">RWEMA Nobii</option>
                </select>
              </div>

              <div className="add_class_form_group">
                <label>Import Students (CSV or Excel)</label>
                <div 
                  className="file_upload_area" 
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <input 
                    id="file-input"
                    type="file" 
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => setUploadedFile(e.target.files[0])}
                  />
                  <div className="file_upload_icon">
                    <FaUpload />
                  </div>
                  <div className="file_upload_text">
                    <h4>Click to upload or drag and drop</h4>
                    <p>CSV or Excel files only (MAX. 5MB)</p>
                  </div>
                  {uploadedFile && (
                    <div className="file_upload_selected">
                      ✓ {uploadedFile.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="add_class_modal_footer">
              <button className="cancel_btn" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="submit_btn" onClick={() => {
                // Handle class creation logic here
                setShowAddModal(false);
                setUploadedFile(null);
              }}>
                Create Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Confirmation Dialog */}
      <DeleteConfirmation
        isOpen={showArchiveConfirm}
        onClose={() => {
          setShowArchiveConfirm(false);
          setClassToArchive(null);
        }}
        onConfirm={confirmArchive}
        itemName={classToArchive?.name}
        itemType="class"
      />
      </div>
  )
}
