import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { FaSpinner } from "react-icons/fa";

import { 
  fetchClasses, 
  createNewClass, 
  selectAllClasses, 
  selectClassesLoading, 
  selectClassesError, 
  selectCreateStatus, 
  selectCreateError, 
  resetCreateStatus 
} from '../../../features/classes/classesSlice';
import { fetchTeachers, selectAllTeachers } from '../../../features/teachers/teachersSlice';


export const Classes_management = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const classes = useSelector(selectAllClasses);
  const teachers = useSelector(selectAllTeachers);
  const loading = useSelector(selectClassesLoading);
  const error = useSelector(selectClassesError);
  const createStatus = useSelector(selectCreateStatus);
  const createError = useSelector(selectCreateError);

  const [activeTab, setActiveTab] = useState('active');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const [classToArchive, setClassToArchive] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    teacherId: '',
    teacherName: '',
    status: 'active'
  });


   // Fetch classes and teachers on component mount
  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchTeachers());
  }, [dispatch]);

  // Reset create status when modal is opened/closed
  useEffect(() => {
    if (!showAddModal && createStatus !== 'idle') {
      dispatch(resetCreateStatus());
    }
  }, [showAddModal, createStatus, dispatch]);

  
  // const [classes, setClasses] = useState([
  //   { id: 1, name: "L3 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 2, name: "L3 SOD B", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 3, name: "L3 ELT A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
  //   { id: 4, name: "L4 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 5, name: "S4 MCB A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
  //   { id: 6, name: "L4 SOD B", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 7, name: "S3A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
  //   { id: 8, name: "S5 PCB A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 9, name: "L5 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 10, name: "L5 SOD B", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
  //   { id: 11, name: "L5 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" }
  // ]);

  const handleArchiveClass = (classItem) => {
    setClassToArchive(classItem);
    setShowArchiveConfirm(true);
  };

  // const confirmArchive = () => {
  //   if (classToArchive) {
  //     setClasses(classes.map(c => 
  //       c.id === classToArchive.id ? { ...c, status: 'archived' } : c
  //     ));
  //     setShowArchiveConfirm(false);
  //     setClassToArchive(null);
  //   }
  // };
   
  const confirmArchive = () => {
    // I Wiil Handle this Later
    // In this Version not ready 
    setShowArchiveConfirm(false);
    setClassToArchive(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.teacherId) return;
    
    try {
      await dispatch(createNewClass({
        name: formData.name,
        teacherName: teachers.find(t => t.id || t._id === formData.teacherId)?.name || 'Unknown',
        teacherId: formData.teacherId,
        status: formData.status
      })).unwrap();
      
      // If successful, close the modal and reset form
      setShowAddModal(false);
      setFormData({
        name: '',
        teacherId: '',
        status: 'active'
      });
      setUploadedFile(null);
      
      // Refresh classes list
      dispatch(fetchClasses());
    } catch (error) {
      console.error('Failed to create class:', error);
    }
  };

   // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const filteredClasses = classes.filter(c => {
    if (activeTab === 'active') return c.status === 'active' || c.status == null;
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
                      <p>current : {classes?.length || 0} classes</p>
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
                {/* Active Classes ({classes.filter(c => c.status === 'active').length}) */}
                Active Classes ({classes.length})
              </button>
              <button 
                className={activeTab === 'archived' ? 'active' : ''} 
                onClick={() => setActiveTab('archived')}
              >
                Archived Classes ({classes.filter(c => c.status === 'archived').length})
              </button>
            </div>

            <div className="middle">
              {loading ? (
                <div className="loading-state">
                   Loading classes...
                </div>
              ) : error ? (
                <div className="error-state">
                  Error loading classes: {error}
                </div>
              ) : filteredClasses.length === 0 ? (
                <div className="empty-state">
                  No {activeTab === 'active' ? 'active' : 'archived'} classes found.
                </div>
              ) : (
                filteredClasses.map(classItem => (
                <div className="class" key={classItem.id}>
                  <div className="up">
                    <h4 className="name">{classItem.name}</h4>
                    <p className={`active_status ${classItem.status || 'active'}`}>{classItem.status || 'active'}</p>
                  </div>
                  <div className="details">
                    <p><div className="icon"><LuUser/></div><span>Teacher {classItem.teacherName || 'Not assigned'}</span></p>
                    <p><div className="icon"><IoTimeOutline/></div><span>created <span>{formatDate(classItem.createdAt || classItem.created)}</span></span></p>
                    <p><div className="icon"><LuUsers/></div><span>{classItem.students || 0} students</span></p>
                  </div>
                  <div className="down">
                    <Link to={`/admin/students?class=${classItem.name}`} style={{ textDecoration: 'none', flex: 1 }}>
                      <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                    </Link>
                    <button 
                    className='archive'
                    disabled={classItem.status === 'archived'}
                    onClick={() => handleArchiveClass(classItem)}>
                      <span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div>
                    </button>
                  </div>
                </div>
              )))}
            </div>
          </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="add_class_modal_overlay" onClick={() => setShowAddModal(false)}>
          <div className="add_class_modal" onClick={(e) => e.stopPropagation()}>
            <div className="add_class_modal_header">
              <h3>Create New Class</h3>
              <button 
              className="add_class_modal_close" 
              onClick={() => setShowAddModal(false)}
              disabled={createStatus === 'loading'}
              >×</button>
            </div>
            
            {/* <div className="add_class_modal_body">
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
            </div> */}
            {/* <div className="add_class_modal_footer">
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
            </div> */}
            <form onSubmit={handleSubmit}>
              <div className="add_class_modal_body">
                {createError && (
                  <div className="error-message">
                    {createError}
                  </div>
                )}
                
                <div className="add_class_form_group">
                  <label>Class Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter class name (e.g., L5 SOD A)" 
                    required
                    disabled={createStatus === 'loading'}
                  />
                </div>

                <div className="add_class_form_group">
                  <label>Assign Teacher *</label>
                  <select
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={
                      (e) => {
                        const selectedTeacher = teachers.find(t =>  t._id === e.target.value);
                        setFormData(prev => ({
                          ...prev,
                          teacherId: e.target.value,
                          teacherName: selectedTeacher?.name || ''
                        }));
                        }
                    }
                    required
                    disabled={createStatus === 'loading' || !teachers?.length}
                  >
                    <option value="">Select a teacher</option>
                    {teachers?.map(teacher => (
                      <option key={teacher._id} value={teacher._id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="add_class_form_group">
                  <label>Class Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={createStatus === 'loading'}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="add_class_form_group">
                  <label>Import Students (CSV or Excel) - Optional</label>
                  <div 
                    className="file_upload_area" 
                    onClick={() => document.getElementById('file-input').click()}
                  >
                    <input 
                      id="file-input"
                      type="file" 
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => setUploadedFile(e.target.files[0])}
                      disabled={createStatus === 'loading'}
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
                <button 
                  type="button"
                  className="cancel_btn" 
                  onClick={() => setShowAddModal(false)}
                  disabled={createStatus === 'loading'}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit_btn" 
                  disabled={!formData.name || !formData.teacherId || createStatus === 'loading'}
                >
                  {createStatus === 'loading' ? (
                    <>
                      <FaSpinner className="spinner" /> Creating...
                    </>
                  ) : 'Create Class'}
                </button>
              </div>
            </form>
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
