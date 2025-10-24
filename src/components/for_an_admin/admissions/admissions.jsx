import React,{useState} from 'react'
import './admissions.css'
import { FaArrowLeft, FaCircleXmark, FaEye, FaTrash } from 'react-icons/fa6'
import { CiSearch } from 'react-icons/ci'
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { MdEmail, MdOutlinePhone } from 'react-icons/md'
import { LuCalendar, LuClock, LuFileText } from 'react-icons/lu'
import { FaCheckCircle } from 'react-icons/fa'
import { IoMdCheckmarkCircleOutline } from "react-icons/io"

export const Aadmissions = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');

  const applications = [
    {
      id: 1,
      name: "Franco Nelly",
      email: "franconelly@gmail.com",
      phone: "+250 795 207 569",
      class: "L5 SOD",
      submitted: "2 days ago",
      status: "approved",
      documents: ["Result slip"]
    },
    {
      id: 2,
      name: "RWEMA Nobii",
      email: "rwemanobii@gmail.com",
      phone: "+250 795 207 569",
      class: "L5 ELT",
      submitted: "1 day ago",
      status: "pending",
      documents: ["Result slip"]
    },
    {
      id: 3,
      name: "SHEMA Valentin",
      email: "valentinshema@gmail.com",
      phone: "+250 795 207 569",
      class: "S4 MCB",
      submitted: "4 days ago",
      status: "rejected",
      documents: ["Result slip"]
    },
    {
      id: 4,
      name: "MUKAMANA Grace",
      email: "mukamanagrace@gmail.com",
      phone: "+250 795 207 569",
      class: "S5 PCB",
      submitted: "3 days ago",
      status: "pending",
      documents: ["Result slip"]
    },
    {
      id: 5,
      name: "UWIMANA Jean",
      email: "uwimanajean@gmail.com",
      phone: "+250 795 207 569",
      class: "L5 PCM",
      submitted: "5 days ago",
      status: "approved",
      documents: ["Result slip"]
    },
    {
      id: 6,
      name: "UWIMANA Jean",
      email: "uwimanajean@gmail.com",
      phone: "+250 795 207 569",
      class: "L3 SOD",
      submitted: "5 days ago",
      status: "approved",
      documents: ["Result slip"]
    },
    {
      id: 7,
      name: "UWIMANA Jean",
      email: "uwimanajean@gmail.com",
      phone: "+250 795 207 569",
      class: "S6 MEG",
      submitted: "5 days ago",
      status: "approved",
      documents: ["Result slip"]
    }
  ];

    const filteredApplications = selectedStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === selectedStatus);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <FaCheckCircle className="icon approved" />;
      case 'rejected': return <FaCircleXmark className="icon rejected" />;
      case 'pending': return <LuClock className="icon pending" />;
      default: return <LuClock className="icon pending" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'approved';
      case 'rejected': return 'rejected';
      case 'pending': return 'pending';
      default: return 'pending';
    }
  };


  return (

    <div className='admissions_management'>
        <div className="box">
            <div className="whole_up">
            <div className="upper">
              <h4>Admissions & Registration Management</h4>
              <p>Manage student applications, review documents, and process admissions. Track application status and maintain enrollment records.</p>
            </div>
            <div className="mini_up">
              <div className="search_box">
                <div className="search">
                  <div className="icon"><CiSearch /></div>
                  <input type="text" placeholder='Search applications...' />
                </div>
                <div className="button">
                  <button>Search</button>
                </div>
              </div>
              <div className="filters">
                <div className="filter_buttons">
                  <button className={selectedStatus === 'all' ? 'all active' : ''}  onClick={() => setSelectedStatus('all')}>All</button>
                  <button className={selectedStatus === 'approved' ? 'approved active' : ''}  onClick={() => setSelectedStatus('all')}>approved</button>
                  <button className={selectedStatus === 'pending' ? 'pending active' : ''}  onClick={() => setSelectedStatus('all')}>pending</button>
                  <button className={selectedStatus === 'rejected' ? 'rejected active' : ''}  onClick={() => setSelectedStatus('all')}>rejected</button>
                </div>
              </div>
              <div className="new">
                <div className="left"><div className="icon"><AiOutlineUsergroupAdd/></div></div>
                <div className="right">
                  <span> {applications.length}</span>
                  <p>applications</p>
                </div>
              </div>
            </div>
          </div>
          <div className="applications_list">
              {filteredApplications.map((application) => (
                <div key={application.id} className="application">
                  <div className="up">
                    <div className="profile">
                      <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/profile_pic_blank.png`} alt="Student profile" />
                      </div>
                      <div className="data">
                        <p className='name'>{application.name}</p>
                        <p className='email'>{application.email}</p>
                        <p className='class'>{application.class}</p>
                      </div>
                    </div>
                    <div className="status">
                      <div className={`status_badge ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span>{application.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="details">
                    <div className="contact_info">
                      <p><MdOutlinePhone className="icon" /><span>{application.phone}</span></p>
                      <p><MdEmail className="icon" /><span>{application.email}</span></p>
                      <p><LuCalendar className="icon" /><span>Submitted {application.submitted}</span></p>
                    </div>
                    
                    <div className="documents">
                      <h5><LuFileText className="icon" />Documents ({application.documents.length})</h5>
                      <div className="documents_list">
                        {application.documents.map((doc, index) => (
                          <span key={index} className="document_tag">{doc}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="actions">
                    <button className='view'><IoMdCheckmarkCircleOutline className="icon" /><span>Approve</span></button>
                    <button className='delete'><FaTrash className="icon" /><span>Reject</span></button>
                  </div>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}
