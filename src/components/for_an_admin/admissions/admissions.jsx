import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './admissions.css';
import { FaArrowLeft, FaCircleXmark, FaEye, FaTrash } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdEmail, MdOutlinePhone } from 'react-icons/md';
import { LuCalendar, LuClock, LuFileText } from 'react-icons/lu';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { 
  fetchApplicationsBySchool, 
  selectApplications, 
  selectApplicationsLoading, 
  selectApplicationsError,
  acceptApplication,
  rejectApplication
} from '../../../features/applications/applicationsSlice';

export const Aadmissions = () => {
    const dispatch = useDispatch();
    const applicationsData = useSelector(selectApplications);
    const loading = useSelector(selectApplicationsLoading);
    const error = useSelector(selectApplicationsError);
    
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        // Fetch applications when component mounts
        // You might want to pass a specific school ID here if needed
        dispatch(fetchApplicationsBySchool());
    }, [dispatch]);
      // console.log(`The applicationsData ${applicationsData.length}`);
    // Transform the API data to match your UI structure
    const transformedApplications = applicationsData.map(app => ({
        id: app._id,
        name: `${app.firstName || ''} ${app.lastName || ''}`.trim() || 'N/A',
        email: app.studentEmail || app.guardianEmail || 'N/A',
        phone: app.stutendTel || app.guardianTel || 'N/A',
        class: app.applyingClass || 'N/A',
        submitted: new Date(app.createdAt).toLocaleDateString(),
        status: app.status || 'pending',
        documents: [
            app.progressReport ? 'Progress Report' : null,
            app.resultSlip ? 'Result Slip' : null
        ].filter(Boolean)
    }));
      
    // Filter applications based on status and search term
    const filteredApplications = transformedApplications.filter(app => {
        const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            app.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && (searchTerm === '' || matchesSearch);
    });
    
    if (loading) return <div>Loading applications...</div>;
    if (error) return <div>Error loading applications: {error}</div>;

    const handleApprove = async (id) => {
        try {
            await dispatch(acceptApplication(id)).unwrap();
            // Show success message or update UI as needed
            alert('Application approved successfully');
        } catch (error) {
            console.error('Failed to approve application:', error);
            alert(`Failed to approve application: ${error}`);
        }
    };

    const handleReject = async (id) => {
        if (window.confirm('Are you sure you want to reject this application?')) {
            try {
                await dispatch(rejectApplication(id)).unwrap();
                // Show success message or update UI as needed
                alert('Application rejected successfully');
            } catch (error) {
                console.error('Failed to reject application:', error);
                alert(`Failed to reject application: ${error}`);
            }
        }
    };

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
                  <button className={selectedStatus === 'approved' ? 'approved active' : ''}  onClick={() => setSelectedStatus('approved')}>approved</button>
                  <button className={selectedStatus === 'pending' ? 'pending active' : ''}  onClick={() => setSelectedStatus('pending')}>pending</button>
                  <button className={selectedStatus === 'rejected' ? 'rejected active' : ''}  onClick={() => setSelectedStatus('rejected')}>rejected</button>
                </div>
              </div>
              <div className="new">
                <div className="left"><div className="icon"><AiOutlineUsergroupAdd/></div></div>
                <div className="right">
                  <span> {applicationsData.length}</span>
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
                  
                  {application.status === 'pending' && (
                    <div className="actions">
                      <button className='view' onClick={() => handleApprove(application.id)}><IoMdCheckmarkCircleOutline className="icon" /><span>Approve</span></button>
                      <button className='delete' onClick={() => handleReject(application.id)}><FaTrash className="icon" /><span>Reject</span></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}
