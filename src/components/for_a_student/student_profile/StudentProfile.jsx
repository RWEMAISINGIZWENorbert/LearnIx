import React, { useState, useEffect } from 'react';
import './StudentProfile.css';
import { FaCalendar } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../../features/auth/authSlice';
import { getSchoolProfile } from '../../../features/school/schoolSlice'
import { useNavigate } from 'react-router-dom';

export const StudentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, profileLoading, profileError } = useSelector((state) => state.auth);
  const { school, loading: schoolLoading } = useSelector((state) => state.school);
  // const [profileData] = useState({
  //   name: 'John Doe',
  //   studentId: 'STU001',
  //   email: 'john.doe@student.com',
  //   phone: '+250 788 123 456',
  //   class: 'L5 SOD A',
  //   school: 'Green Hills Academy',
  //   guardianName: 'Jane Doe',
  //   guardianPhone: '+250 788 987 654',
  //   address: 'Kigali, Rwanda',
  //   enrollmentDate: 'August 12, 2022',
  //   profileImage: `${import.meta.env.BASE_URL}assets/profile_pic_blank.png`
  // });
  const [profileData, setProfileData] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    class: '',
    school: '',
    guardianName: '',
    guardianPhone: '',
    address: '',
    enrollmentDate: '',
    profileImage: ``
  });

   useEffect(() => {
    dispatch(fetchUserProfile(navigate));
    dispatch(getSchoolProfile());
  }, [dispatch, navigate])


  useEffect(() => {
    if (userProfile || school) {
      setProfileData(prevData => ({
        ...prevData,
        // Update user-related fields
        ...(userProfile ? {
          name: userProfile.name || '',
          email: userProfile.email || '',
          phone: userProfile.tel || '',
          studentId: userProfile.studentId || '',
          className: userProfile.className || userProfile.class || '',
          address: userProfile.address || '',
          enrollmentDate: userProfile.enrollmentDate 
            ? new Date(userProfile.enrollmentDate).toLocaleDateString() 
            : '',
          profileImage: userProfile.profileImage || `${import.meta.env.BASE_URL}assets/profile_pic_blank.png`,
          // Guardian information might be in a nested object or separate fields
          ...(userProfile.guardian ? {
            guardianName: userProfile.guardian.name || '',
            guardianPhone: userProfile.guardian.phone || ''
          } : {})
        } : {}),
        // Update school-related fields
        ...(school ? {
          school: school.name || ''
        } : {})
      }));
    }
  }, [userProfile, school]);

  return (
    <div className='student-profile-page'>
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p className="read-only-notice">Profile information is read-only. Contact administration to update your details.</p>
        </div>

        <div className="profile-content">
          {/* Left Section - Profile Card */}
          <div className="profile-card">
            <div className="profile-image-section">
              <div className="profile-image">
                <img src={profileData.profileImage} alt="Profile" />
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
                  <p>{profileData.name}</p>
                </div>

                <div className="detail-item">
                  <label>Address</label>
                  <p>{profileData.address}</p>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Contact Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Email Address</label>
                  <p>{profileData.email}</p>
                </div>

                <div className="detail-item">
                  <label>Phone Number</label>
                  <p>{profileData.phone}</p>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Guardian Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Guardian Name</label>
                  <p>{profileData.guardianName}</p>
                </div>

                <div className="detail-item">
                  <label>Guardian Phone</label>
                  <p>{profileData.guardianPhone}</p>
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

          </div>
        </div>
      </div>
    </div>
  );
};
