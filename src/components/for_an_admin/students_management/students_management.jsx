import React, { useState } from 'react';
import './students_management.css'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DeleteConfirmation } from '../../shared/DeleteConfirmation';
import { CiSearch } from 'react-icons/ci';
import { LuUser, LuUsers, LuGraduationCap } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import { FaLongArrowAltRight, FaWhatsapp } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import { MdOutlinePhone, MdOutlineEmail } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi2";

export const Students_management = () => {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classFilter = searchParams.get('class');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@student.com",
      guardian_name: "John Doe",
      guardian_phone: "+250 795 123 456",
      whatsapp: "+250 795 123 456",
      studentId: "STU001",
      class: "L3 SOD A",
      status: "active",
      enrollmentDate: "Mon, August 12, 2025 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@student.com",
      guardian_name: "Jane Smith",
      guardian_phone: "+250 795 234 567",
      whatsapp: "+250 795 234 567",
      studentId: "STU002",
      class: "L3 SOD B",
      status: "active",
      enrollmentDate: "Mon, August 12, 2025 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@student.com",
      guardian_name: "Mike Johnson",
      guardian_phone: "+250 795 345 678",
      whatsapp: "+250 795 345 678",
      studentId: "STU003",
      class: "L4 SOD A",
      status: "inactive",
      enrollmentDate: "Mon, August 12, 2025 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@student.com",
      guardian_name: "Sarah Wilson",
      guardian_phone: "+250 795 456 789",
      whatsapp: "+250 795 456 789",
      studentId: "STU004",
      class: "L3 SOD A",
      status: "active",
      enrollmentDate: "Mon, August 12, 2025 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@student.com",
      guardian_name: "David Brown",
      guardian_phone: "+250 795 567 890",
      whatsapp: "+250 795 567 890",
      studentId: "STU005",
      class: "L4 SOD B",
      status: "active",
      enrollmentDate: "Mon, August 12, 2025 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily.davis@student.com",
      guardian_name: "Emily Davis",
      guardian_phone: "+250 795 678 901",
      whatsapp: "+250 795 678 901",
      studentId: "STU006",
      class: "L5 SOD A",
      status: "active",
      enrollmentDate: "Mon, August 12, 2025 8:34:12 a.m",
      profilePic: "profile_pic_blank.png"
    }
  ]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    guardian_name: '',
    guardian_phone: '',
    whatsapp: '',
    studentId: '',
    class: '',
    subjects: []
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = classFilter ? student.class === classFilter : true;
    
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.studentId) {
      const student = {
        ...newStudent,
        id: students.length + 1,
        status: 'active',
        enrollmentDate: new Date().toLocaleString(),
        profilePic: 'profile_pic_blank.png'
      };
      setStudents([...students, student]);
      setNewStudent({
        name: '',
        email: '',
        guardian_name: '',
        guardian_phone: '',
        whatsapp: '',
        studentId: '',
        class: '',
        subjects: []
      });
      setShowAddModal(false);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowEditModal(true);
  };

  const handleUpdateStudent = () => {
    if (editingStudent) {
      setStudents(students.map(student => 
        student.id === editingStudent.id ? editingStudent : student
      ));
      setShowEditModal(false);
      setEditingStudent(null);
    }
  };

  const handleDeleteStudent = (student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter(student => student.id !== studentToDelete.id));
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
    }
  };

  const availableClasses = ["L3 SOD A", "L3 SOD B", "L4 SOD A", "L4 SOD B", "L5 SOD A", "L5 SOD B", "S3A", "S4 MCB A", "S5 PCB A"];

  return (
    <div className='students_management'>
      <div className="box">
        <div className="whole_up">
          <div className="up">
            <div className="button">
              <button onClick={() => navigate(-1)}><FaArrowLeft className='icon'/><span>Back</span></button>
            </div>
          </div>
          <div className="upper">
            <h4>{classFilter ? `All students in ${classFilter}` : 'Student Management'}</h4>
            <p>{classFilter ? `Showing ${filteredStudents.length} students available in ${classFilter}` : 'Add, edit, and organize students with ease. Keep enrollment records up to date and maintain a clean, searchable student database.'}</p>
          </div>
          <div className="mini_up">
            <div className="search_box">
              <div className="search">
                <div className="icon"><CiSearch /></div>
                <input 
                  type="text" 
                  placeholder='Search for students...' 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="button">
                <button>Search</button>
              </div>
            </div>
            <div className="new" onClick={() => setShowAddModal(true)}>
              <div className="left"><div className="icon"><BiEdit/></div></div>
              <div className="right">
                <span>Add new student</span>
                <p>current: {students.length} students</p>
              </div>
            </div>
          </div>
        </div>
        <div className="middle">
          {filteredStudents.map(student => (
            <div key={student.id} className="student">
              <div className="up">
                <div className="profile">
                  <div className="img">
                    <img src={`${import.meta.env.BASE_URL}assets/${student.profilePic}`} alt="Student profile pic" />
                  </div>
                  <div className="data">
                    <p className='name'>{student.name}</p>
                    <p className='email'>{student.email}</p>
                    <p className='studentId'>ID: {student.studentId}</p>
                  </div>
                </div>
                <p className={`active_status ${student.status}`}>{student.status}</p>
              </div>
              <div className="details">
                <p><div className="icon"><MdOutlineEmail /></div><span>{student.email}</span></p>
                <p><div className="icon"><IoTimeOutline/></div><span>enrolled <span>{student.enrollmentDate}</span></span></p>
                <p><div className="icon"><HiOutlineAcademicCap /></div><span>Class: {student.class}</span></p>
              </div>
              <div className="down">
                <button className='more' onClick={() => handleEditStudent(student)}>
                  <span>Edit</span><div className="icon"><BiEdit/></div>
                </button>
                <button className='archive' onClick={() => handleDeleteStudent(student)}>
                  <span>Delete</span><div className="icon"><GoTrash/></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Student</h3>
              <button onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="Enter student's full name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div className="form-group">
                <label>Student ID</label>
                <input 
                  type="text" 
                  value={newStudent.studentId}
                  onChange={(e) => setNewStudent({...newStudent, studentId: e.target.value})}
                  placeholder="Enter student ID"
                />
              </div>
              <div className="form-group">
                <label>Guardian's full name</label>
                <input 
                  type="text" 
                  value={newStudent.guardian_name}
                  onChange={(e) => setNewStudent({...newStudent, guardian_name: e.target.value})}
                  placeholder="Enter guardian's full name"
                />
              </div>
              <div className="form-group">
                <label>Guardian's phone number</label>
                <input 
                  type="tel" 
                  value={newStudent.guardian_phone}
                  onChange={(e) => setNewStudent({...newStudent, guardian_phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Guardian's WhatsApp number</label>
                <input 
                  type="tel" 
                  value={newStudent.whatsapp}
                  onChange={(e) => setNewStudent({...newStudent, whatsapp: e.target.value})}
                  placeholder="Enter WhatsApp number"
                />
              </div>
              <div className="form-group">
                <label>Class</label>
                <select 
                  value={newStudent.class}
                  onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                >
                  <option value="" hidden disabled>Select a class</option>
                  {availableClasses.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
              <button onClick={handleAddStudent}>Add Student</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && editingStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Student</h3>
              <button onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Student ID</label>
                <input 
                  type="text" 
                  value={editingStudent.studentId}
                  onChange={(e) => setEditingStudent({...editingStudent, studentId: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Guardian's full name</label>
                <input 
                  type="text" 
                  value={editingStudent.guardian_name}
                  onChange={(e) => setEditingStudent({...editingStudent, guardian_name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Guardian's phone number</label>
                <input 
                  type="tel" 
                  value={editingStudent.guardian_phone}
                  onChange={(e) => setEditingStudent({...editingStudent, guardian_phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Guardian's WhatsApp number</label>
                <input 
                  type="tel" 
                  value={editingStudent.whatsapp}
                  onChange={(e) => setEditingStudent({...editingStudent, whatsapp: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Class</label>
                <select 
                  value={editingStudent.class}
                  onChange={(e) => setEditingStudent({...editingStudent, class: e.target.value})}
                >
                  {availableClasses.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={editingStudent.status}
                  onChange={(e) => setEditingStudent({...editingStudent, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
              <button onClick={handleUpdateStudent}>Update Student</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setStudentToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={studentToDelete?.name}
        itemType="student"
      />
    </div>
  )
}
