import React, { useState } from 'react';
import './academic_setup.css'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { LuBookOpen, LuCalendar, LuUsers, LuGraduationCap, LuSettings, LuPlus, LuTrash, LuSearch, LuFilter, LuClock, LuMapPin, LuUserCheck, LuAward, LuBookMarked, LuFileText } from 'react-icons/lu';
import { MdOutlineSubject, MdOutlineClass, MdOutlineSchedule, MdOutlineGrade, MdOutlineAssignment } from 'react-icons/md';
import { FaEdit, FaLongArrowAltRight, FaTimes, FaSave, FaPlus } from "react-icons/fa";
import { CiSearch } from 'react-icons/ci';

export const Academic_setup = () => {
  let navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('subjects');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Sample data
  const subjects = [
    { id: 1, name: "Mathematics", code: "MATH", level: "L5", teacher: "SHEMA Valentin", hours: 6, credits: 4, type: "Core" },
    { id: 2, name: "Physics", code: "PHYS", level: "L5", teacher: "Franco Nelly", hours: 5, credits: 3, type: "Core" },
    { id: 3, name: "Computer Science", code: "CS", level: "L5", teacher: "RWEMA Nobii", hours: 4, credits: 3, type: "Core" },
    { id: 4, name: "English", code: "ENG", level: "L4", teacher: "MUKAMANA Grace", hours: 3, credits: 2, type: "Core" },
    { id: 5, name: "Chemistry", code: "CHEM", level: "L4", teacher: "UWIMANA Jean", hours: 4, credits: 3, type: "Core" },
    { id: 6, name: "French", code: "FR", level: "L3", teacher: "MUKAMANA Grace", hours: 2, credits: 2, type: "Elective" }
  ];

  const academicYears = [
    { id: 1, year: "2024-2025", status: "Active", startDate: "Sep 1, 2024", endDate: "Jun 30, 2025", students: 1247, terms: 3 },
    { id: 2, year: "2023-2024", status: "Completed", startDate: "Sep 1, 2023", endDate: "Jun 30, 2024", students: 1156, terms: 3 },
    { id: 3, year: "2022-2023", status: "Archived", startDate: "Sep 1, 2022", endDate: "Jun 30, 2023", students: 1089, terms: 3 }
  ];

  const terms = [
    { id: 1, name: "Term 1", year: "2024-2025", startDate: "Sep 1, 2024", endDate: "Dec 15, 2024", status: "Active", weeks: 15 },
    { id: 2, name: "Term 2", year: "2024-2025", startDate: "Jan 8, 2025", endDate: "Mar 28, 2025", status: "Upcoming", weeks: 12 },
    { id: 3, name: "Term 3", year: "2024-2025", startDate: "Apr 7, 2025", endDate: "Jun 30, 2025", status: "Upcoming", weeks: 12 }
  ];

  const schedules = [
    { id: 1, subject: "Mathematics", class: "L3 SOD A", teacher: "SHEMA Valentin", day: "Monday", time: "08:00-10:00", type: "Lecture" },
    { id: 2, subject: "Computer Science", class: "L3 SOD A", teacher: "SHEMA Valentin",day: "Monday", time: "10:30-12:30", type: "Practical" },
    { id: 3, subject: "Mobile Development", class: "L3 SOD A", teacher: "SHEMA Valentin",  day: "Tuesday", time: "08:00-10:00", type: "Practical" },
    { id: 4, subject: "Physics", class: "L3 ELT A", teacher: "Franco Nelly",  day: "Monday", time: "08:00-10:00", type: "Lecture" }
  ];

  const gradingSystems = [
    { id: 1, name: "Percentage", scale: "0-100", gradeA: "80-100", gradeB: "70-89", gradeC: "60-79", gradeD: "50-69", gradeF: "0-49" },
    { id: 2, name: "Letter Grade", scale: "A-F", gradeA: "A", gradeB: "B", gradeC: "C", gradeD: "D", gradeF: "F" },
  ];

  const curricula = [
    { id: 1, name: "Computer Science Curriculum", level: "L3-L5", subjects: 12, credits: 120, duration: "3 years", status: "Active" },
    { id: 2, name: "Electronics Curriculum", level: "L3-L5", subjects: 10, credits: 100, duration: "3 years", status: "Active" },
    { id: 3, name: "General Science Curriculum", level: "L3-L4", subjects: 8, credits: 80, duration: "2 years", status: "Draft" }
  ];

  const tabs = [
    { id: 'subjects', label: 'Subjects', icon: <MdOutlineSubject /> },
    { id: 'years', label: 'Academic Years', icon: <LuCalendar /> },
    { id: 'terms', label: 'Terms', icon: <LuBookOpen /> },
    { id: 'schedule', label: 'Schedule', icon: <MdOutlineSchedule /> },
    { id: 'grading', label: 'Grading System', icon: <MdOutlineGrade /> },
    { id: 'curriculum', label: 'Curriculum', icon: <LuBookMarked /> }
  ];

  // Helper functions
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
  };

  const filteredData = (data, searchTerm) => {
    if (!searchTerm) return data;
    return data.filter(item => 
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'subjects':
        return (
          <div className="content_section">
            <div className="section_header">
              <h3>Subject Management</h3>
              <div className="header_actions">
                <div className="search_box">
                  <CiSearch className="search_icon" />
                  <input 
                    type="text" 
                    placeholder="Search subjects..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="add_button" onClick={() => openModal('subject')}>
                <LuPlus className="icon" />
                <span>Add Subject</span>
              </button>
              </div>
            </div>
            <div className="subjects_list">
              {filteredData(subjects, searchTerm).map(subject => (
                <div key={subject.id} className="subject_card">
                  <div className="subject_info">
                    <div className="subject_header">
                      <h4>{subject.name}</h4>
                      <div className="subject_badges">
                      <span className="code">{subject.code}</span>
                        <span className={`type ${subject.type.toLowerCase()}`}>{subject.type}</span>
                      </div>
                    </div>
                    <div className="subject_details">
                      <p><LuGraduationCap className="icon" />Level: {subject.level}</p>
                      <p><LuUsers className="icon" />Teacher: {subject.teacher}</p>
                      <p><LuClock className="icon" />Hours: {subject.hours}/week</p>
                      <p><LuAward className="icon" />Credits: {subject.credits}</p>
                    </div>
                  </div>
                  <div className="subject_actions">
                    <button className="edit" onClick={() => openModal('subject', subject)}><FaEdit /></button>
                    <button className="delete"><LuTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'years':
        return (
          <div className="content_section">
            <div className="section_header">
              <h3>Academic Years</h3>
              <div className="header_actions">
                <div className="search_box">
                  <CiSearch className="search_icon" />
                  <input 
                    type="text" 
                    placeholder="Search years..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="add_button" onClick={() => openModal('year')}>
                <LuPlus className="icon" />
                <span>Add Academic Year</span>
              </button>
              </div>
            </div>
            <div className="years_list">
              {filteredData(academicYears, searchTerm).map(year => (
                <div key={year.id} className="year_card">
                  <div className="year_info">
                    <div className="year_header">
                      <h4>{year.year}</h4>
                      <span className={`status ${year.status.toLowerCase()}`}>{year.status}</span>
                    </div>
                    <div className="year_details">
                      <p><LuCalendar className="icon" />Start: {year.startDate}</p>
                      <p><LuCalendar className="icon" />End: {year.endDate}</p>
                      <p><LuUsers className="icon" />Students: {year.students}</p>
                      <p><LuBookOpen className="icon" />Terms: {year.terms}</p>
                    </div>
                  </div>
                  <div className="year_actions">
                    <button className="edit" onClick={() => openModal('year', year)}><FaEdit /></button>
                    <button className="delete"><LuTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'terms':
        return (
          <div className="content_section">
            <div className="section_header">
              <h3>Academic Terms</h3>
              <div className="header_actions">
                <div className="search_box">
                  <CiSearch className="search_icon" />
                  <input 
                    type="text" 
                    placeholder="Search terms..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="add_button" onClick={() => openModal('term')}>
                <LuPlus className="icon" />
                <span>Add Term</span>
              </button>
              </div>
            </div>
            <div className="terms_list">
              {filteredData(terms, searchTerm).map(term => (
                <div key={term.id} className="term_card">
                  <div className="term_info">
                    <div className="term_header">
                      <h4>{term.name}</h4>
                      <div className="term_badges">
                      <span className="year">{term.year}</span>
                        <span className={`status ${term.status.toLowerCase()}`}>{term.status}</span>
                      </div>
                    </div>
                    <div className="term_details">
                      <p><LuCalendar className="icon" />Start: {term.startDate}</p>
                      <p><LuCalendar className="icon" />End: {term.endDate}</p>
                      <p><LuClock className="icon" />Duration: {term.weeks} weeks</p>
                    </div>
                  </div>
                  <div className="term_actions">
                    <button className="edit" onClick={() => openModal('term', term)}><FaEdit /></button>
                    <button className="delete"><LuTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="content_section">
            <div className="section_header">
              <h3>Schedule Management</h3>
              <div className="header_actions">
                <div className="search_box">
                  <CiSearch className="search_icon" />
                  <input 
                    type="text" 
                    placeholder="Search schedules..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="add_button" onClick={() => openModal('schedule')}>
                  <LuPlus className="icon" />
                  <span>Add Schedule</span>
                </button>
              </div>
            </div>
            <div className="schedule_table">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Class</th>
                    <th>Teacher</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData(schedules, searchTerm).map(schedule => (
                    <tr key={schedule.id}>
                      <td>{schedule.subject}</td>
                      <td>{schedule.class}</td>
                      <td>{schedule.teacher}</td>
                      <td>{schedule.day}</td>
                      <td>{schedule.time}</td>
                      <td><span className={`type ${schedule.type.toLowerCase()}`}>{schedule.type}</span></td>
                      <td>
                        <div className="table_actions">
                          <button className="edit" onClick={() => openModal('schedule', schedule)}><FaEdit /></button>
                          <button className="delete"><LuTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'grading':
        return (
          <div className="content_section">
            <div className="section_header">
              <h3>Grading System</h3>
              <div className="header_actions">
                <div className="search_box">
                  <CiSearch className="search_icon" />
                  <input 
                    type="text" 
                    placeholder="Search grading systems..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="add_button" onClick={() => openModal('grading')}>
                  <LuPlus className="icon" />
                  <span>Add Grading System</span>
                </button>
              </div>
            </div>
            <div className="grading_list">
              {filteredData(gradingSystems, searchTerm).map(system => (
                <div key={system.id} className="grading_card">
                  <div className="grading_info">
                    <div className="grading_header">
                      <h4>{system.name}</h4>
                      <span className="scale">Scale: {system.scale}</span>
                    </div>
                    <div className="grading_details">
                      <div className="grade_row">
                        <span className="grade_label">A Grade:</span>
                        <span className="grade_value">{system.gradeA}</span>
                      </div>
                      <div className="grade_row">
                        <span className="grade_label">B Grade:</span>
                        <span className="grade_value">{system.gradeB}</span>
                      </div>
                      <div className="grade_row">
                        <span className="grade_label">C Grade:</span>
                        <span className="grade_value">{system.gradeC}</span>
                      </div>
                      <div className="grade_row">
                        <span className="grade_label">D Grade:</span>
                        <span className="grade_value">{system.gradeD}</span>
                      </div>
                      <div className="grade_row">
                        <span className="grade_label">F Grade:</span>
                        <span className="grade_value">{system.gradeF}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grading_actions">
                    <button className="edit" onClick={() => openModal('grading', system)}><FaEdit /></button>
                    <button className="delete"><LuTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'curriculum':
        return (
          <div className="content_section">
            <div className="section_header">
              <h3>Curriculum Management</h3>
              <div className="header_actions">
                <div className="search_box">
                  <CiSearch className="search_icon" />
                  <input 
                    type="text" 
                    placeholder="Search curricula..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="add_button" onClick={() => openModal('curriculum')}>
                  <LuPlus className="icon" />
                  <span>Add Curriculum</span>
                </button>
              </div>
            </div>
            <div className="curriculum_list">
              {filteredData(curricula, searchTerm).map(curriculum => (
                <div key={curriculum.id} className="curriculum_card">
                  <div className="curriculum_info">
                    <div className="curriculum_header">
                      <h4>{curriculum.name}</h4>
                      <span className={`status ${curriculum.status.toLowerCase()}`}>{curriculum.status}</span>
                    </div>
                    <div className="curriculum_details">
                      <p><LuGraduationCap className="icon" />Level: {curriculum.level}</p>
                      <p><LuBookOpen className="icon" />Subjects: {curriculum.subjects}</p>
                      <p><LuAward className="icon" />Credits: {curriculum.credits}</p>
                      <p><LuClock className="icon" />Duration: {curriculum.duration}</p>
                    </div>
                  </div>
                  <div className="curriculum_actions">
                    <button className="edit" onClick={() => openModal('curriculum', curriculum)}><FaEdit /></button>
                    <button className="delete"><LuTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return <div className="content_section"><h3>Coming Soon</h3></div>;
    }
  };

  const renderModal = () => {
    if (!showModal) return null;

    const modalTitles = {
      subject: editingItem ? 'Edit Subject' : 'Add New Subject',
      year: editingItem ? 'Edit Academic Year' : 'Add New Academic Year',
      term: editingItem ? 'Edit Term' : 'Add New Term',
      class: editingItem ? 'Edit Class' : 'Add New Class',
      schedule: editingItem ? 'Edit Schedule' : 'Add New Schedule',
      grading: editingItem ? 'Edit Grading System' : 'Add New Grading System',
      curriculum: editingItem ? 'Edit Curriculum' : 'Add New Curriculum'
    };

    return (
      <div className="modal_overlay" onClick={closeModal}>
        <div className="modal_content" onClick={(e) => e.stopPropagation()}>
          <div className="modal_header">
            <h3>{modalTitles[modalType]}</h3>
            <button className="close_button" onClick={closeModal}>
              <FaTimes />
            </button>
          </div>
          
          <div className="modal_body">
            {modalType === 'subject' && (
              <div className="form_group">
                <div className="form_row">
                  <div className="form_field">
                    <label>Subject Name</label>
                    <input type="text" defaultValue={editingItem?.name || ''} />
                  </div>
                  <div className="form_field">
                    <label>Subject Code</label>
                    <input type="text" defaultValue={editingItem?.code || ''} />
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Level</label>
                    <select defaultValue={editingItem?.level || ''}>
                      <option value="">Select Level</option>
                      <option value="L3">L3</option>
                      <option value="L4">L4</option>
                      <option value="L5">L5</option>
                    </select>
                  </div>
                  <div className="form_field">
                    <label>Type</label>
                    <select defaultValue={editingItem?.type || ''}>
                      <option value="">Select Type</option>
                      <option value="Core">Core</option>
                      <option value="Elective">Elective</option>
                      <option value="Optional">Optional</option>
                    </select>
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Teacher</label>
                    <input type="text" defaultValue={editingItem?.teacher || ''} />
                  </div>
                  <div className="form_field">
                    <label>Hours per Week</label>
                    <input type="number" defaultValue={editingItem?.hours || ''} />
                  </div>
                </div>
                <div className="form_field">
                  <label>Credits</label>
                  <input type="number" defaultValue={editingItem?.credits || ''} />
                </div>
              </div>
            )}

            {modalType === 'year' && (
              <div className="form_group">
                <div className="form_row">
                  <div className="form_field">
                    <label>Academic Year</label>
                    <input type="text" defaultValue={editingItem?.year || ''} placeholder="e.g., 2024-2025" />
                  </div>
                  <div className="form_field">
                    <label>Status</label>
                    <select defaultValue={editingItem?.status || ''}>
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Start Date</label>
                    <input type="date" defaultValue={editingItem?.startDate || ''} />
                  </div>
                  <div className="form_field">
                    <label>End Date</label>
                    <input type="date" defaultValue={editingItem?.endDate || ''} />
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Number of Students</label>
                    <input type="number" defaultValue={editingItem?.students || ''} />
                  </div>
                  <div className="form_field">
                    <label>Number of Terms</label>
                    <input type="number" defaultValue={editingItem?.terms || ''} />
                  </div>
                </div>
              </div>
            )}

            {modalType === 'term' && (
              <div className="form_group">
                <div className="form_row">
                  <div className="form_field">
                    <label>Term Name</label>
                    <input type="text" defaultValue={editingItem?.name || ''} placeholder="e.g., Term 1" />
                  </div>
                  <div className="form_field">
                    <label>Academic Year</label>
                    <input type="text" defaultValue={editingItem?.year || ''} placeholder="e.g., 2024-2025" />
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Start Date</label>
                    <input type="date" defaultValue={editingItem?.startDate || ''} />
                  </div>
                  <div className="form_field">
                    <label>End Date</label>
                    <input type="date" defaultValue={editingItem?.endDate || ''} />
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Status</label>
                    <select defaultValue={editingItem?.status || ''}>
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="form_field">
                    <label>Duration (weeks)</label>
                    <input type="number" defaultValue={editingItem?.weeks || ''} />
                  </div>
                </div>
              </div>
            )}

            {modalType === 'class' && (
              <div className="form_group">
                <div className="form_row">
                  <div className="form_field">
                    <label>Class Name</label>
                    <input type="text" defaultValue={editingItem?.name || ''} placeholder="e.g., L3 SOD A" />
                  </div>
                  <div className="form_field">
                    <label>Level</label>
                    <select defaultValue={editingItem?.level || ''}>
                      <option value="">Select Level</option>
                      <option value="L3">L3</option>
                      <option value="L4">L4</option>
                      <option value="L5">L5</option>
                    </select>
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Teacher</label>
                    <input type="text" defaultValue={editingItem?.teacher || ''} />
                  </div>
                  <div className="form_field">
                    <label>Room</label>
                    <input type="text" defaultValue={editingItem?.room || ''} />
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Capacity</label>
                    <input type="number" defaultValue={editingItem?.capacity || ''} />
                  </div>
                  <div className="form_field">
                    <label>Current Students</label>
                    <input type="number" defaultValue={editingItem?.students || ''} />
                  </div>
                </div>
                <div className="form_field">
                  <label>Schedule</label>
                  <input type="text" defaultValue={editingItem?.schedule || ''} placeholder="e.g., Mon-Fri 8:00-16:00" />
                </div>
                <div className="form_field">
                  <label>Subjects (comma separated)</label>
                  <input type="text" defaultValue={editingItem?.subjects?.join(', ') || ''} placeholder="e.g., Mathematics, Computer Science" />
                </div>
              </div>
            )}

            {modalType === 'schedule' && (
              <div className="form_group">
                <div className="form_row">
                  <div className="form_field">
                    <label>Subject</label>
                    <input type="text" defaultValue={editingItem?.subject || ''} />
                  </div>
                  <div className="form_field">
                    <label>Class</label>
                    <input type="text" defaultValue={editingItem?.class || ''} />
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Teacher</label>
                    <input type="text" defaultValue={editingItem?.teacher || ''} />
                  </div>
                  <div className="form_field">
                    <label>Room</label>
                    <input type="text" defaultValue={editingItem?.room || ''} />
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Day</label>
                    <select defaultValue={editingItem?.day || ''}>
                      <option value="">Select Day</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                  <div className="form_field">
                    <label>Time</label>
                    <input type="text" defaultValue={editingItem?.time || ''} placeholder="e.g., 08:00-10:00" />
                  </div>
                </div>
                <div className="form_field">
                  <label>Type</label>
                  <select defaultValue={editingItem?.type || ''}>
                    <option value="">Select Type</option>
                    <option value="Lecture">Lecture</option>
                    <option value="Practical">Practical</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Lab">Lab</option>
                  </select>
                </div>
              </div>
            )}

            {modalType === 'grading' && (
              <div className="form_group">
                <div className="form_row">
                  <div className="form_field">
                    <label>System Name</label>
                    <input type="text" defaultValue={editingItem?.name || ''} />
                  </div>
                  <div className="form_field">
                    <label>Scale</label>
                    <input type="text" defaultValue={editingItem?.scale || ''} placeholder="e.g., 0-100" />
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>A Grade</label>
                    <input type="text" defaultValue={editingItem?.gradeA || ''} />
                  </div>
                  <div className="form_field">
                    <label>B Grade</label>
                    <input type="text" defaultValue={editingItem?.gradeB || ''} />
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>C Grade</label>
                    <input type="text" defaultValue={editingItem?.gradeC || ''} />
                  </div>
                  <div className="form_field">
                    <label>D Grade</label>
                    <input type="text" defaultValue={editingItem?.gradeD || ''} />
                  </div>
                </div>
                <div className="form_field">
                  <label>F Grade</label>
                  <input type="text" defaultValue={editingItem?.gradeF || ''} />
                </div>
              </div>
            )}

            {modalType === 'curriculum' && (
              <div className="form_group">
                <div className="form_row">
                  <div className="form_field">
                    <label>Curriculum Name</label>
                    <input type="text" defaultValue={editingItem?.name || ''} />
                  </div>
                  <div className="form_field">
                    <label>Level</label>
                    <input type="text" defaultValue={editingItem?.level || ''} placeholder="e.g., L3-L5" />
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Number of Subjects</label>
                    <input type="number" defaultValue={editingItem?.subjects || ''} />
                  </div>
                  <div className="form_field">
                    <label>Total Credits</label>
                    <input type="number" defaultValue={editingItem?.credits || ''} />
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_field">
                    <label>Duration</label>
                    <input type="text" defaultValue={editingItem?.duration || ''} placeholder="e.g., 3 years" />
                  </div>
                  <div className="form_field">
                    <label>Status</label>
                    <select defaultValue={editingItem?.status || ''}>
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="modal_footer">
            <button className="cancel_button" onClick={closeModal}>Cancel</button>
            <button className="save_button">
              <FaSave className="icon" />
              <span>{editingItem ? 'Update' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='academic_setup'>
        <div className="box">
          <div className="whole_up">
            <div className="upper">
              <h4>Academic Setup</h4>
              <p>Configure academic years, terms, subjects, classes, schedules, grading systems, and curricula. Manage the complete academic structure of your institution.</p>
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
        
        {renderModal()}
    </div>
  )
}
