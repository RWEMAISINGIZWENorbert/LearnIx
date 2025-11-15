import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSchoolProfile } from '../../../features/school/schoolSlice';
import { fetchUserProfile } from '../../../features/auth/authSlice';
import './AdminProfile.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaCamera, FaEdit, FaSave, FaGlobe } from 'react-icons/fa';
import { MdSchool, MdSecurity } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const AdminProfile = () => {
  const dispatch = useDispatch();
  const { school, loading } = useSelector((state) => state.school);
  const [isEditing, setIsEditing] = useState(false);
  const { userProfile, profileLoading, profileError } = useSelector((state) => state.auth);
  // const [profileData, setProfileData] = useState({
  //   schoolName: 'Green Hills Academy',
  //   adminId: 'ADGHA001',
  //   email: 'info@greenhillsacademy.edu',
  //   phone: '+250 788 123 456',
  //   website: 'www.greenhillsacademy.rw',
  //   address: 'KN 5 Rd, Kigali, Rwanda',
  //   established: '2005',
  //   schoolType: 'International School',
  //   curriculum: 'Cambridge & IB',
  //   totalStudents: '1,500+',
  //   totalTeachers: '120+',
  //   adminName: 'John Smith',
  //   adminRole: 'School Administrator',
  //   profileImage: `${import.meta.env.BASE_URL}assets/greenhills.png`
  // });
  const [profileData, setProfileData] = useState({
    schoolName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    established: '',
    schoolType: '',
    curriculum: '',
    totalStudents: '',
    totalTeachers: '',
    adminName: 'Admin', // I will replace this with the real na,e from the user prfofilr onw implmented
    adminRole: 'School Administrator',
    profileImage: ''
  });

   useEffect(() => {
    if (school || userProfile) {
    setProfileData(prevData => {
      const updatedData = {
        ...prevData,
        // Update school-related fields if school exists
        ...(school ? {
          schoolName: school.name || '',
          website: school.website || '',
          address: school.address || '',
          established: school.establishedYear || '',
          schoolType: school.type || '',
          curriculum: school.curriculum || '',
          totalStudents: school.totalStudents || '',
          totalTeachers: school.totalTeachers || '',
          profileImage: school.schoolLogo || `${import.meta.env.BASE_URL}assets/greenhills.png`
        } : {}),
        // Update user-related fields if userProfile exists
        ...(userProfile ? {
          email: userProfile.email || '',  // Changed from userProfile.name to userProfile.email
          phone: userProfile.tel || '',
        } : {})
      };
      return updatedData;
    });
  }
  }, [school,userProfile]);
  const navigate = useNavigate();
   useEffect(() => {
    dispatch(getSchoolProfile());
    dispatch(fetchUserProfile(navigate));
  }, [dispatch, navigate]);

   if (loading) {
    return <div>Loading school profile...</div>;
  }
 

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

   if(profileLoading){
    return <div>Loading profile...</div>;
   }
  //  console.log(`User Profile ${userProfile.email}`)
  console.log(`The Profile Email is ${userProfile.email}`)

  return (
    <div className='admin-profile-page'>
      <div className="container">
        <div className="profile-header">
          <h1>School Profile</h1>
          <button className="edit-btn" onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? <><FaSave /> Save Changes</> : <><FaEdit /> Edit Profile</>}
          </button>
        </div>

        <div className="profile-content">
          {/* Left Section - Profile Card */}
          <div className="profile-card">
            <div className="profile-image-section">
              <div className="profile-image">
                <img src={profileData.profileImage} alt="School Logo" />
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
              <h2>{profileData.schoolName}</h2>
              <p className="admin-id">{profileData.adminId}</p>
              <p className="school-badge">{profileData.schoolType}</p>
            </div>

            <div className="quick-info">
              <div className="info-item">
                <MdSchool className="icon" />
                <div>
                  <span className="label">Curriculum</span>
                  <p>{profileData.curriculum}</p>
                </div>
              </div>
              <div className="info-item">
                <FaCalendar className="icon" />
                <div>
                  <span className="label">Established</span>
                  <p>{profileData.established}</p>
                </div>
              </div>
              <div className="info-item">
                <MdSecurity className="icon" />
                <div>
                  <span className="label">Students</span>
                  <p>{profileData.totalStudents}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Details */}
          <div className="profile-details">
            <div className="details-section">
              <h3>School Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>School Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="schoolName"
                      value={profileData.schoolName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.schoolName}</p>
                  )}
                </div>

                <div className="detail-item">
                  <label>School Type</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="schoolType"
                      value={profileData.schoolType}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.schoolType}</p>
                  )}
                </div>

                <div className="detail-item">
                  <label>Curriculum</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="curriculum"
                      value={profileData.curriculum}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.curriculum}</p>
                  )}
                </div>

                <div className="detail-item">
                  <label>Established Year</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="established"
                      value={profileData.established}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.established}</p>
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
                  {/* { console.log(`The Profile Email is ${userProfile.tel}`)} */}
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value= {profileData.email}
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

                <div className="detail-item">
                  <label>Website</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="website"
                      value={profileData.website}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.website}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Statistics</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{profileData.totalStudents}</div>
                  <div className="stat-label">Total Students</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{profileData.totalTeachers}</div>
                  <div className="stat-label">Total Teachers</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">45+</div>
                  <div className="stat-label">Classes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">98%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Administrator Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Admin Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="adminName"
                      value={profileData.adminName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.adminName}</p>
                  )}
                </div>

                <div className="detail-item">
                  <label>Role</label>
                  <p>{profileData.adminRole}</p>
                </div>

                <div className="detail-item">
                  <label>Admin ID</label>
                  <p>{profileData.adminId}</p>
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
