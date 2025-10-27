import React, { useState } from 'react';
import './StudentProfile.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaUser, FaCamera, FaEdit, FaSave } from 'react-icons/fa';
import { MdSchool, MdPerson } from 'react-icons/md';

export const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    studentId: 'STU001',
    email: 'john.doe@student.com',
    phone: '+250 788 123 456',
    class: 'L5 SOD A',
    school: 'Green Hills Academy',
    guardianName: 'Jane Doe',
    guardianPhone: '+250 788 987 654',
    address: 'Kigali, Rwanda',
    dateOfBirth: '2005-03-15',
    enrollmentDate: 'August 12, 2022',
    profileImage: `${import.meta.env.BASE_URL}assets/profile_pic_blank.png`
  });

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
    // Save logic here
    alert('Profile updated successfully!');
  };

  return (
    <div className='student-profile-page'>
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
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
              <p className="student-id">{profileData.studentId}</p>
              <p className="class-badge">{profileData.class}</p>
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
                <FaCalendar className="icon" />
                <div>
                  <span className="label">Enrolled Since</span>
                  <p>{profileData.enrollmentDate}</p>
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
              <h3>Guardian Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Guardian Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="guardianName"
                      value={profileData.guardianName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.guardianName}</p>
                  )}
                </div>

                <div className="detail-item">
                  <label>Guardian Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="guardianPhone"
                      value={profileData.guardianPhone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.guardianPhone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Academic Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Class</label>
                  <p>{profileData.class}</p>
                </div>

                <div className="detail-item">
                  <label>School</label>
                  <p>{profileData.school}</p>
                </div>

                <div className="detail-item">
                  <label>Student ID</label>
                  <p>{profileData.studentId}</p>
                </div>

                <div className="detail-item">
                  <label>Enrollment Date</label>
                  <p>{profileData.enrollmentDate}</p>
                </div>
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
