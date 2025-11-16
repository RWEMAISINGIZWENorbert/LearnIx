import React, { useState, useEffect } from 'react';
import './communications_management.css';
import { DeleteConfirmation } from '../../shared/DeleteConfirmation';
import { FaPlus, FaBullhorn, FaEnvelope, FaSms, FaEdit, FaTrash, FaEye, FaPaperPlane } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllAnnouncements, 
  deleteAnnouncement,
  selectAnnouncements,
  selectAnnouncementsLoading,
  selectAnnouncementsError,
  resetAnnouncementState,
  createAnnouncement
} from '../../../features/announcements/announcementsSlice';

export const Communications_management = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [showNewModal, setShowNewModal] = useState(false);
  const [communicationType, setCommunicationType] = useState('announce');
  const [recipientType, setRecipientType] = useState('');
  const [specificRecipient, setSpecificRecipient] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState('');

  const dispatch = useDispatch();
  const announcements = useSelector(selectAnnouncements);
  const loading = useSelector(selectAnnouncementsLoading);
  const error = useSelector(selectAnnouncementsError);

  useEffect(() => {
    dispatch(fetchAllAnnouncements());
    return () => {
      dispatch(resetAnnouncementState());
    };
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      await dispatch(deleteAnnouncement(id));
    }
    // Show success message
    alert('Announcement deleted successfully!');
  };



  // const announcements = [
  //   {
  //     id: 1,
  //     title: 'Mid-Term Examinations Schedule',
  //     message: 'All students are reminded that mid-term examinations will commence on Monday, November 6th...',
  //     date: '2024-10-25',
  //     author: 'Academic Affairs',
  //     recipients: 'All Students',
  //     status: 'Published'
  //   },
  //   {
  //     id: 2,
  //     title: 'Parent-Teacher Conference',
  //     message: 'We are pleased to invite all parents to our annual parent-teacher conference...',
  //     date: '2024-10-24',
  //     author: 'Administration',
  //     recipients: 'Parents & Guardians',
  //     status: 'Published'
  //   },
  //   {
  //     id: 3,
  //     title: 'School Holiday Notice',
  //     message: 'The school will be closed for the public holiday on November 1st...',
  //     date: '2024-10-23',
  //     author: 'Administration',
  //     recipients: 'All',
  //     status: 'Draft'
  //   }
  // ];

  const messages = [
    // {
    //   id: 1,
    //   subject: 'Assignment Deadline Extension',
    //   preview: 'The deadline for the Programming assignment has been extended to...',
    //   sender: 'Dr. Sarah Johnson',
    //   recipient: 'L5 SOD A Students',
    //   date: '2024-10-25',
    //   read: false
    // },
    // {
    //   id: 2,
    //   subject: 'Library Books Return Reminder',
    //   preview: 'Please return all borrowed library books by Friday...',
    //   sender: 'Library Department',
    //   recipient: 'All Students',
    //   date: '2024-10-24',
    //   read: true
    // }
  ];

  const stats = [
    { title: 'Total Announcements', value: '45', icon: <FaBullhorn />, color: '#A05AC8' },
    { title: 'Messages Sent', value: '1,234', icon: <FaEnvelope />, color: '#10b981' },
    { title: 'SMS Notifications', value: '567', icon: <FaSms />, color: '#f59e0b' },
    { title: 'Active Recipients', value: '1,620', icon: <MdNotifications />, color: '#3b82f6' }
  ];

  const teachers = [
    { id: 1, name: 'SHEMA Valentin' },
    { id: 2, name: 'Franco Nelly' },
    { id: 3, name: 'RWEMA Nobii' },
    { id: 4, name: 'MUKAMANA Grace' },
    { id: 5, name: 'UWIMANA Jean' }
  ];

  const students = [
    { id: 1, name: 'John Doe', class: 'L5 SOD A' },
    { id: 2, name: 'Jane Smith', class: 'L5 SOD A' },
    { id: 3, name: 'Robert Johnson', class: 'L4 SOD B' },
    { id: 4, name: 'Emily Davis', class: 'L3 SOD C' },
    { id: 5, name: 'Michael Brown', class: 'L5 SOD B' }
  ];

  // const handleDelete = (item, type) => {
  //   setItemToDelete(item);
  //   setDeleteType(type);
  //   setShowDeleteConfirm(true);
  // };
   
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    recipients: 'all',  // Default to 'all' as per your API
    priority: 'normal', // Default priority
    author: 'admin',    // Default author as per your API
    status: 'draft'     // Default status
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const confirmDelete = () => {
    // Handle actual deletion logic here
    console.log(`Deleting ${deleteType}:`, itemToDelete);
    setShowDeleteConfirm(false);
    setItemToDelete(null);
    setDeleteType('');
  };

 

  const  handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Dispatch the createAnnouncement action with the form data
    await dispatch(createAnnouncement(formData)).unwrap();
    
    // Show success message
    alert('Announcement created successfully!');
    
    // Close the modal and reset form
    setShowNewModal(false);
    setFormData({
      title: '',
      message: '',
      recipients: 'all',
      priority: 'normal',
      author: 'admin',
      status: 'draft'
    });
    
    // Refresh the announcements list
    dispatch(fetchAllAnnouncements());
    
  } catch (error) {
    console.error('Failed to create announcement:', error);
    alert('Failed to create announcement. Please try again.');
  }
};

  if (loading) return <div className="loading">Loading announcements...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className='communications_management'>
      <div className="communications_management_header">
        <div className="communications_management_title">
          <h1>Communications Center</h1>
          <p>Manage announcements, messages, and notifications</p>
        </div>
        <button className="communications_management_new_btn" onClick={() => setShowNewModal(true)}>
          <FaPlus /> New Communication
        </button>
      </div>

      {/* Stats Grid */}
      <div className="communications_management_stats_grid">
        {stats.map((stat, index) => (
          <div className="communications_management_stat_card" key={index} style={{border:'none'}}>
            <div className="communications_management_stat_icon" style={{ background: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="communications_management_stat_info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="communications_management_tabs">
        <button
          className={activeTab === 'announcements' ? 'active' : ''}
          onClick={() => setActiveTab('announcements')}
        >
          <FaBullhorn /> Announcements
        </button>
        {/* <button
          className={activeTab === 'messages' ? 'active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          <FaEnvelope /> Messages
        </button> */}
      </div>

      {/* Content Area */}
      {activeTab === 'announcements' && (
        <div className="communications_management_content">
          <div className="communications_management_list">
            {announcements.length > 0 ? announcements.map(announcement => (
              <div className="communications_management_card" key={announcement._id || announcement.id}>
                <div className="communications_management_card_header">
                  <div>
                    <h3>{announcement.title}</h3>
                    <div className="communications_management_card_meta">
                      <span className="communications_management_author">{announcement.author}</span>
                      <span className="communications_management_date">{announcement.date}</span>
                      { announcement.status && <span className={`communications_management_status ${announcement.status.toLowerCase()}`}>
                        {announcement.status}
                        </span>}
                    </div>
                  </div>
                  <div className="communications_management_card_actions">
                    <button className="communications_management_action_btn view">
                      <FaEye />
                    </button>
                    <button className="communications_management_action_btn edit">
                      <FaEdit />
                    </button>
                    <button className="communications_management_action_btn delete" onClick={() => handleDelete(announcement._id || announcement.id, 'announcement')}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="communications_management_card_message">{announcement.message}</p>
                <div className="communications_management_card_footer">
                  <span className="communications_management_recipients">
                    👥 {announcement.recipients}
                  </span>
                  {announcement.status === 'Draft' && (
                    <button className="communications_management_publish_btn">
                      <FaPaperPlane /> Publish
                    </button>
                  )}
                </div>
              </div>
            )) : <p>No announcements found</p>}
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="communications_management_content">
          <div className="communications_management_list">
            {messages.map(message => (
              <div className="communications_management_card" key={message.id}>
                <div className="communications_management_card_header">
                  <div>
                    <h3>{message.subject} {!message.read && <span className="communications_management_unread_badge">New</span>}</h3>
                    <div className="communications_management_card_meta">
                      <span className="communications_management_author">{message.sender}</span>
                      <span className="communications_management_date">{message.date}</span>
                    </div>
                  </div>
                  <div className="communications_management_card_actions">
                    <button className="communications_management_action_btn view">
                      <FaEye />
                    </button>
                    <button className="communications_management_action_btn delete" onClick={() => handleDelete(message, 'message')}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="communications_management_card_message">{message.preview}</p>
                <div className="communications_management_card_footer">
                  <span className="communications_management_recipients">
                    📨 To: {message.recipient}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unified Communication Modal */}
      {
      showNewModal && (
        <form action="" onSubmit={handleSubmit}>
        <div className="modal_overlay" onClick={() => setShowNewModal(false)}>
           
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3>New Communication</h3>
              <button className="close_button" onClick={() => setShowNewModal(false)}>×</button>
            </div>
             
            <div className="modal_body">
              {/* Communication Type Selection */}
              {/* <div className="form_field">
                <label>Communication Type</label>
                <div className="type_selector">
                  <button 
                    className={`type_btn ${communicationType === 'announce' ? 'active' : ''}`}
                    onClick={() => {
                      setCommunicationType('announce');
                      setRecipientType('');
                      setSpecificRecipient('');
                    }}
                  >
                    <FaBullhorn /> Announcement
                  </button>
                  <button 
                    className={`type_btn ${communicationType === 'message' ? 'active' : ''}`}
                    onClick={() => {
                      setCommunicationType('message');
                      setRecipientType('');
                      setSpecificRecipient('');
                    }}
                  >
                    <FaEnvelope /> Message
                  </button>
                </div>
              </div> */}

              {/* Subject/Title */}
              <div className="form_field">
                <label>{communicationType === 'announce' ? 'Announcement Title' : 'Message Subject'}</label>
                <input 
                type="text"
                name="title" 
                value={formData.title}
                onChange={handleInputChange}
                placeholder={communicationType === 'announce' ? 'Enter announcement title' : 'Enter message subject'}
                 />
              </div>

              {/* Recipient Selection */}
              <div className="form_field">
                <label>Recipients</label>
                {communicationType === 'announce' ? (
                  <select 
                    value={recipientType} 
                    onChange={(e) => setRecipientType(e.target.value)}
                  >
                    <option value="">Select recipient group</option>
                    <option value="all_students">All Students</option>
                    <option value="all_teachers">All Teachers</option>
                    <option value="all">All (Students & Teachers)</option>
                  </select>
                ) : (
                  <>
                    <select 
                      // value={recipientType} 
                      // onChange={(e) => {
                      //   setRecipientType(e.target.value);
                      //   setSpecificRecipient('');
                      // }}
                      name="recipients"
                      value={formData.recipients}
                      onChange={handleInputChange}
                    >
                      {/* <option value="">Select recipient type</option> */}
                      <option value="all">All (Students & Teachers)</option>
                      <option value="students">Student</option>
                      <option value="teachers">Teacher</option>
                    </select>
                    
                    {recipientType && (
                      <select 
                        value={specificRecipient} 
                        onChange={(e) => setSpecificRecipient(e.target.value)}
                        style={{ marginTop: '10px' }}
                      >
                        <option value="">Select specific {recipientType}</option>
                        {recipientType === 'student' && students.map(student => (
                          <option key={student.id} value={student.id}>
                            {student.name} ({student.class})
                          </option>
                        ))}
                        {recipientType === 'teacher' && teachers.map(teacher => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </>
                )}
              </div>

              {/* Message Content */}
              <div className="form_field">
                <label>Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6" 
                  placeholder={communicationType === 'announce' ? 'Enter announcement content...' : 'Enter message content...'}
                ></textarea>
              </div>

              {/* Priority (for messages) */}
              {communicationType === 'message' && (
                <div className="form_field">
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                   >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              )}
            </div>

            <div className="modal_footer">
              <button className="cancel_btn" onClick={() => setShowNewModal(false)}>
                Cancel
              </button>
              <button className="send_btn">
                <FaPaperPlane /> Send {communicationType === 'announce' ? 'Announcement' : 'Message'}
              </button>
            </div>
          </div>
        </div>
        </form>
      )
      }

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setItemToDelete(null);
          setDeleteType('');
        }}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.title || itemToDelete?.subject}
        itemType={deleteType}
      />
    </div>
  );
};
