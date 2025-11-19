import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/public_pages/home/Home_page';
import { Features } from './pages/public_pages/features/features_page';
import { Schools } from './pages/public_pages/schools/Schools';
import { Books } from './pages/public_pages/books/Books';
import { AuthFlow } from './components/public_components/auth/AuthFlow';
import ClickSpark from './components/public_components/animations/ClickSpark';
import { Not_found } from './pages/public_pages/Not_Found/Not_found';
import { Admin_dashboard } from './pages/admin/admin_dashboard/admin_dashboard';
import { Admin_settings } from './pages/admin/admin_settings/admin_settings';
import { Developers } from './pages/public_pages/Developers/Developers';
import { Admin_notifications } from './pages/admin/Admin_notifications/admin_notifications';
import { Admin_student_management } from './pages/admin/admin_student_management/admin_student_management';
import { Admin_classes_management } from './pages/admin/admin_classes_management/admin_classes_management';
import { Admin_teachers_management } from './pages/admin/admin_teachers_management/admin_teachers_management';
import { Admin_admissions_management } from './pages/admin/admin_admissions_management/admin_admissions_management';
import { Admin_resources_management } from './pages/admin/admin_resources_management/admin_resources_management';
import { Admin_academic_setup } from './pages/admin/admin_academic_setup/admin_academic_setup';
import { Admin_communications } from './pages/admin/admin_communications/admin_communications';
import { AccessDenied } from './pages/public_pages/access_denied/AccessDenied';
import { Admin_profile } from './pages/admin/admin_profile/admin_profile';
import { Email_Verification_Page } from './pages/public_pages/email_verification/email_verification';
import { School_Registration_Page } from './pages/public_pages/school_registration/school_registration';
import { StudentApplication } from './pages/public_pages/student_application/StudentApplication';

// Student Pages
import { Student_Dashboard_Page } from './pages/student/student_dashboard/student_dashboard';
import { Student_Assignments_Page } from './pages/student/student_assignments/student_assignments';
import { Student_Resources_Page } from './pages/student/student_resources/student_resources';
import { Student_Announcements_Page } from './pages/student/student_announcements/student_announcements';
import { Student_Notifications_Page } from './pages/student/student_notifications/student_notifications';
import { Student_Settings_Page } from './pages/student/student_settings/student_settings';
import { Student_profile } from './pages/student/student_profile/student_profile';

// Teacher Pages
import { Teacher_Dashboard_Page } from './pages/teacher/teacher_dashboard_page';
import { Teacher_Classes_Page } from './pages/teacher/teacher_classes_page';
import { Teacher_Students_Page } from './pages/teacher/teacher_students_page';
import { Teacher_Assignments_Page } from './pages/teacher/teacher_assignments_page';
import { Teacher_Grades_Page } from './pages/teacher/teacher_grades_page';
import { Teacher_Attendance_Page } from './pages/teacher/teacher_attendance_page';
import { Teacher_Schedule_Page } from './pages/teacher/teacher_schedule_page';
import { Teacher_Resources_Page } from './pages/teacher/teacher_resources_page';
import { Teacher_Announcements_Page } from './pages/teacher/teacher_announcements_page';
import { Teacher_Settings_Page } from './pages/teacher/teacher_settings_page';
import { Teacher_profile } from './pages/teacher/teacher_profile/teacher_profile';
import { Teacher_Assignment_Submissions_Page } from './pages/teacher/teacher_assignment_submissions_page';

import { ProtectedRoute } from './features/ProtectedRoute';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectRole, selectLoading } from './features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);
  const loading = useSelector(selectLoading);
  const location = useLocation();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);

  // Handle initial redirect if user is authenticated
 useEffect(() => {
    const publicPaths = ['/login', '/signup', '/', '/features', '/schools', '/books', '/dev_team', '/school-registration', '/email-verification', '/student-application'];
    const isPublicPath = publicPaths.some(path => location.pathname.startsWith(path));
    
    if (isAuthenticated && isPublicPath) {
      const redirectPath = role ? `/${role}/dashboard` : '/';
      navigate(redirectPath, { replace: true });
    }
    
    // Set initialized to true after first check
    if (!initialized) {
      setInitialized(true);
    }
  }, [isAuthenticated, role, location.pathname, navigate, initialized]);

  // Show loading state while initializing
  if (!initialized || loading) {
    return <div>Loading...</div>; // Replace with your loading component
  }


  return (
      <ClickSpark
        sparkColor='#A05AC8'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={1000}
        zIndex={100}
      >
      {/* <Router> */}
    <div className="app">
      <Routes>
        {/* Public page routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/features' element={<Features/>}/>
        <Route path='/schools' element={<Schools/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/dev_team' element={<Developers/>}/>
        <Route 
              path="/signup" 
              element={
                // <ProtectedRoute requireAuth={false}>
                  <AuthFlow />
                // </ProtectedRoute>
              } 
            />
        <Route 
              path="/login" 
              element={
                // <ProtectedRoute requireAuth={false}>
                  <AuthFlow />
                // </ProtectedRoute>
              } 
            />
        <Route path='/school-registration' element={<School_Registration_Page/>}/>
        <Route path='/email-verification' element={<Email_Verification_Page/>}/>
        <Route path='/student-application' element={<StudentApplication/>}/>

        {/* Admin page routes */}
        <Route
              element={
                <ProtectedRoute allowedRoles={['admin']} />
              }
            >
              <Route path="admin">
                <Route index element={<Admin_dashboard />} />
                <Route path="dashboard" element={<Admin_dashboard />} />
                <Route path="settings" element={<Admin_settings />} />
                <Route path="notifications" element={<Admin_notifications />} />
                <Route path="students" element={<Admin_student_management />} />
                <Route path="classes" element={<Admin_classes_management />} />
                <Route path="teachers" element={<Admin_teachers_management />} />
                <Route path="admissions" element={<Admin_admissions_management />} />
                <Route path="resources" element={<Admin_resources_management />} />
                <Route path="academic_setup" element={<Admin_academic_setup />} />
                <Route path="communications" element={<Admin_communications />} />
                <Route path="profile" element={<Admin_profile />} />
              </Route>
            </Route>

        {/* Access Denied */}
        <Route path='/access-denied' element={<AccessDenied/>}/>

        {/* Student page routes */}
        <Route
              element={
                <ProtectedRoute allowedRoles={['student']} />
              }
            >
              <Route path="student">
                <Route index element={<Student_Dashboard_Page />} />
                <Route path="dashboard" element={<Student_Dashboard_Page />} />
                <Route path="assignments" element={<Student_Assignments_Page />} />
                <Route path="resources" element={<Student_Resources_Page />} />
                <Route path="announcements" element={<Student_Announcements_Page />} />
                <Route path="notifications" element={<Student_Notifications_Page />} />
                <Route path="settings" element={<Student_Settings_Page />} />
                <Route path="profile" element={<Student_profile />} />
              </Route>
            </Route>

        {/* Teacher page routes */}
         <Route
              element={
                <ProtectedRoute allowedRoles={['teacher']} />
              }
            >
              <Route path="teacher">
                <Route index element={<Teacher_Dashboard_Page />} />
                <Route path="dashboard" element={<Teacher_Dashboard_Page />} />
                <Route path="classes" element={<Teacher_Classes_Page />} />
                <Route path="students" element={<Teacher_Students_Page />} />
                <Route path="assignments" element={<Teacher_Assignments_Page />} />
                <Route path="submissions" element={<Teacher_Assignment_Submissions_Page />} />
                <Route path="grades" element={<Teacher_Grades_Page />} />
                <Route path="attendance" element={<Teacher_Attendance_Page />} />
                <Route path="schedule" element={<Teacher_Schedule_Page />} />
                <Route path="resources" element={<Teacher_Resources_Page />} />
                <Route path="announcements" element={<Teacher_Announcements_Page />} />
                <Route path="settings" element={<Teacher_Settings_Page />} />
                <Route path="profile" element={<Teacher_profile />} />
              </Route>
            </Route>

          {/* Not Found Route */}
        <Route path='*' element={<Not_found/>}/>
      </Routes>
    </div>
    {/* </Router> */}

</ClickSpark>
    
  )
}

export default App;
