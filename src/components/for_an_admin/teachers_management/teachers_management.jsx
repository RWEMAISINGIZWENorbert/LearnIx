
import React, { useState } from 'react'; 
import './teachers_management.css'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { LuNotebookText  } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import { FaLongArrowAltRight,FaWhatsapp  } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import { MdOutlinePhone } from "react-icons/md";

export const Teachers_management = () => {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([
    { id: "T1001", name: "SHEMA Valentin", email: "valentinshema@gmail.com", phone: "+250 795 207 569", status: "active", subjects: ["Mathematics","Mobile application development","NoSQL database development","Extra lesson 1"], created: "Mon, August 12, 2025 8:34:12 a.m", avatar: "shema.jpeg" },
    { id: "T1002", name: "Franco Nelly", email: "franconelly@gmail.com", phone: "+250 795 207 569", status: "active", subjects: ["Physics","Python development","Chemistry"], created: "Mon, August 12, 2025 8:34:12 a.m", avatar: "franco.png" },
    { id: "T1003", name: "RWEMA Norbert", email: "rwemanobii@gmail.com", phone: "+250 795 207 569", status: "active", subjects: ["Computer science","Basics of networking","NoSQL database development","Extra lesson 2","Extra lesson 3"], created: "Mon, August 12, 2025 8:34:12 a.m", avatar: "rwema.jpg" },
    { id: "T1004", name: "SHEMA Valentin", email: "valentinshema@gmail.com", phone: "+250 795 207 569", status: "active", subjects: ["Mathematics","Mobile application development","NoSQL database development","Extra lesson 1"], created: "Mon, August 12, 2025 8:34:12 a.m", avatar: "shema.jpeg" },
    { id: "T1005", name: "Franco Nelly", email: "franconelly@gmail.com", phone: "+250 795 207 569", status: "active", subjects: ["Physics","Python development","Chemistry"], created: "Mon, August 12, 2025 8:34:12 a.m", avatar: "franco.png" },
    { id: "T1006", name: "RWEMA Norbert", email: "rwemanobii@gmail.com", phone: "+250 795 207 569", status: "active", subjects: ["Computer science","Basics of networking","NoSQL database development","Extra lesson 2","Extra lesson 3"], created: "Mon, August 12, 2025 8:34:12 a.m", avatar: "rwema.jpg" },
 ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSubjects, setExpandedSubjects] = useState({}); // store which teacher's subjects are expanded

  const handleAddClick = () => {
    setEditingTeacher(null);
    setModalOpen(true);
  };

  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  const handleSave = (teacher) => {
    if (editingTeacher) {
      setTeachers(teachers.map(t => t.id === teacher.id ? teacher : t));
    } else {
      setTeachers([...teachers, teacher]);
    }
    setModalOpen(false);
  };

  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSubjects = (id) => {
    setExpandedSubjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className='teachers_management'>
      <div className="box">
        <div className="whole_up">
          <div className="up">
            <div className="button">
              <button onClick={() => navigate(-1)}><FaArrowLeft className='icon'/><span>Back</span></button>
            </div>
          </div>
          <div className="upper">
            <h4>Manage teachers</h4>
            <p>Add, edit, and organize teachers. Keep enrollment records up to date and maintain a clean, searchable teachers database.</p>
          </div>
          <div className="mini_up">
            <div className="search_box">
              <div className="search">
                <div className="icon"><CiSearch /></div>
                <input type="text" placeholder='Search for teachers . . .' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <div className="button">
                <button>Search</button>
              </div>
            </div>
            <div className="new" onClick={handleAddClick}>
              <div className="left"><div className="icon"><BiEdit/></div></div>
              <div className="right">
                <span>Create new teacher</span>
                <p>current : {teachers.length} teacher{teachers.length > 1 ? "s" : ""}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="middle">
          {filteredTeachers.map(teacher => (
            <div className="teacher" key={teacher.id}>
              <div className="up">
                <div className="profile">
                  <div className="img">
                    <img src={`${import.meta.env.BASE_URL}assets/${teacher.avatar}`} alt="Teacher profile pic" />
                  </div>
                  <div className="data">
                    <p className='name'>Teacher {teacher.name}</p>
                    <p className='email'>{teacher.email}</p>
                    <p className='teacherId'>ID: {teacher.id}</p>
                  </div>
                </div>
                <p className={`active_status ${teacher.status}`}>{teacher.status}</p>
              </div>
              <div className="details">
                <p><div className="icon"><MdOutlinePhone /></div><span>{teacher.phone}</span></p>
                <p><div className="icon"><FaWhatsapp  /></div><span>{teacher.phone}</span></p>
                <p><div className="icon"><IoTimeOutline/></div><span>created <span>{teacher.created}</span></span></p>
                <p>
                  <div className="icon"><LuNotebookText /></div>
                  <ul>
                    {(expandedSubjects[teacher.id] ? teacher.subjects : teacher.subjects.slice(0,3)).map((sub,i) => <li key={i}>{sub}</li>)}
                  </ul>
                </p>
              </div>
                  {teacher.subjects.length > 3 && (
                    <button className="view-more" onClick={() => toggleSubjects(teacher.id)}>
                      {expandedSubjects[teacher.id] ? "View less" : "View more"}
                    </button>
                  )}
              <div className="down">
                <button className='more' onClick={() => handleEditClick(teacher)}><span>Edit</span><div className="icon"><FaLongArrowAltRight/></div></button>
                <button className='archive' onClick={() => handleDelete(teacher.id)}><span>Delete</span><div className="icon"><GoTrash/></div></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingTeacher ? "Edit Teacher" : "New Teacher"}</h3>
              <button onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const teacher = {
                    id: editingTeacher ? editingTeacher.id : `T${Math.floor(Math.random() * 10000)}`,
                    name: form.name.value,
                    email: form.email.value,
                    phone: form.phone.value,
                    status: form.status.value,
                    subjects: form.subjects.value.split(",").map(s => s.trim()),
                    created: editingTeacher ? editingTeacher.created : new Date().toLocaleString(),
                    avatar: editingTeacher ? editingTeacher.avatar : "default.png"
                  };
                  handleSave(teacher);
                }}
              >
                <div className="form-group">
                  <label>Teacher ID</label>
                  <input type="text" placeholder='Teacher ID' name="id" defaultValue={editingTeacher?.id || ""} disabled={!!editingTeacher}/>
                </div>
                <div className="form-group">
                  <label>Full name</label>
                  <input type="text" placeholder="Enter teacher's full name" name="name" defaultValue={editingTeacher?.name || ""} required/>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter teacher's Email" name="email" defaultValue={editingTeacher?.email || ""} required/>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" placeholder="Enter teacher's phone number" name="phone" defaultValue={editingTeacher?.phone || ""} required/>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" defaultValue={editingTeacher?.status || "active"}>
                    <option value="active" hidden>Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Subjects (comma separated)</label>
                  <input type="text" placeholder='e.g : Mathematics, Physics' name="subjects" defaultValue={editingTeacher?.subjects.join(", ") || ""} required/>
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
                  <button type="submit">{editingTeacher ? "Save Changes" : "Add Teacher"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
