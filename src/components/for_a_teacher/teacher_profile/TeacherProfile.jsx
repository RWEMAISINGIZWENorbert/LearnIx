import React, { useState, useEffect } from 'react';
import './TeacherProfile.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaUser, FaCamera, FaEdit, FaSave, FaGraduationCap } from 'react-icons/fa';
import { MdSchool, MdPerson } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getSchoolProfile } from '../../../features/school/schoolSlice';
import { fetchUserProfile } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const TeacherProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { userProfile, profileLoading, profileError } = useSelector((state) => state.auth);
  const { school, loading: schoolLoading } = useSelector((state) => state.school);
  // const [profileData, setProfileData] = useState({
  //   name: 'Dr. Sarah Johnson',
  //   teacherId: 'TRGHASOD042',
  //   email: 'sarah.johnson@learnix.edu',
  //   phone: '+250 788 654 321',
  //   department: 'Software Development',
  //   school: 'Green Hills Academy',
  //   specialization: 'Computer Science',
  //   qualification: 'PhD in Computer Science',
  //   address: 'Kigali, Rwanda',
  //   dateOfBirth: '1985-07-22',
  //   joinDate: 'January 10, 2019',
  //   employmentType: 'Full-time',
  //   subjects: ['Advanced Programming', 'Data Structures', 'Web Development'],
  //   profileImage: `${import.meta.env.BASE_URL}assets/profile_pic_blank.png`
  // });
   const [profileData, setProfileData] = useState({
    name: '',
    teacherId: '',
    email: '',
    phone: '',
    department: '',
    school: '',
    specialization: '',
    qualification: '',
    address: '',
    dateOfBirth: '',
    joinDate: '',
    employmentType: '',
    subjects: [],
    profileImage: `${import.meta.env.BASE_URL}assets/profile_pic_blank.png`
  });
 const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUserProfile(navigate));
    dispatch(getSchoolProfile());
  }, [dispatch, navigate]);

   useEffect(() => {
    if (userProfile || school) {
      setProfileData(prevData => ({
        ...prevData,
        // Update user-related fields
        ...(userProfile ? {
          name: userProfile.name || '',
          email: userProfile.email || '',
          phone: userProfile.tel || '',
          teacherId: userProfile.teacherId || '',
          specialization: userProfile.specialization || '',
          qualification: userProfile.qualification || '',
          dateOfBirth: userProfile.dateOfBirth || '',
          joinDate: userProfile.joinDate ? new Date(userProfile.joinDate).toLocaleDateString() : '',
          address: userProfile.address || '',
          profileImage: userProfile.profileImage || `${import.meta.env.BASE_URL}assets/profile_pic_blank.png`
        } : {}),
        // Update school-related fields
        ...(school ? {
          school: school.name || '',
          department: school.department || ''
        } : {})
      }));
    }
  }, [userProfile, school]);

  
  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  if (profileLoading || schoolLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (profileError) {
    return <div className="error">Error: {profileError}</div>;
  }

  return (
    <div className='teacher-profile-page'>
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button className="edit-btn" onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? <><FaSave /> Save Changes</> : <><FaEdit /> Edit Profile</>}
          </button>
        </div>

        <div className="profile-content">
          {/* Left Section - Profile Card */}
          <div className="profile-card">
            <div className="profile-image-section">
              <div className="profile-image">
                <img src={profileData.profileImage} alt="Profile" />
                {isEditing && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="profile-upload"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="profile-upload" className="upload-overlay">
                      <FaCamera />
                    </label>
                  </>
                )}
              </div>
              <h2>{profileData.name}</h2>
              <p className="teacher-id">{profileData.teacherId}</p>
              <p className="dept-badge">{profileData.department}</p>
            </div>

            <div className="quick-info">
              <div className="info-item">
                <MdSchool className="icon" />
                <div>
                  <span className="label">School</span>
                  <p>{profileData.school}</p>
                </div>
              </div>
              <div className="info-item">
                <FaGraduationCap className="icon" />
                <div>
                  <span className="label">Qualification</span>
                  <p>{profileData.qualification}</p>
                </div>
              </div>
              <div className="info-item">
                <FaCalendar className="icon" />
                <div>
                  <span className="label">Joined Since</span>
                  <p>{profileData.joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Details */}
          <div className="profile-details">
            <div className="details-section">
              <h3>Personal Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.name}</p>
                  )}
                </div>

                <div className="detail-item">
                  <label>Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                  )}
                </div>

                <div className="detail-item">
                  <label>Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.address}</p>
                  )}
                </div>

                <div className="detail-item">
                  <label>Specialization</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="specialization"
                      value={profileData.specialization}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.specialization}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Contact Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.email}</p>
                  )}
                </div>

                <div className="detail-item">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Professional Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Teacher ID</label>
                  <p>{profileData.teacherId}</p>
                </div>

                <div className="detail-item">
                  <label>School</label>
                  <p>{profileData.school}</p>
                </div>

                <div className="detail-item">
                  <label>Department</label>
                  <p>{profileData.department}</p>
                </div>

                <div className="detail-item">
                  <label>Employment Type</label>
                  <p>{profileData.employmentType}</p>
                </div>

                <div className="detail-item">
                  <label>Join Date</label>
                  <p>{profileData.joinDate}</p>
                </div>

                <div className="detail-item">
                  <label>Qualification</label>
                  <p>{profileData.qualification}</p>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Teaching Subjects</h3>
              <div className="subjects-list">
                {profileData.subjects.map((subject, index) => (
                  <span key={index} className="subject-badge">{subject}</span>
                ))}
              </div>
            </div>

            {isEditing && (
              <div className="action-buttons">
                <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button className="btn-save" onClick={handleSave}>
                  <FaSave /> Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
