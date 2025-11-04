import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/public_pages/home/Home_page';
import { Features } from './pages/public_pages/features/features_page';
import { Schools } from './pages/public_pages/schools/Schools';
import { Books } from './pages/public_pages/books/Books';
import { Login_page } from './pages/public_pages/Login/login_page';
import { Auth } from './components/public_components/auth/Auth';
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

// Student Pages
import { Student_Dashboard_Page } from './pages/student/student_dashboard/student_dashboard';
import { Student_Courses_Page } from './pages/student/student_courses/student_courses';
import { Student_Assignments_Page } from './pages/student/student_assignments/student_assignments';
import { Student_Grades_Page } from './pages/student/student_grades/student_grades';
import { Student_Timetable_Page } from './pages/student/student_timetable/student_timetable';
import { Student_Attendance_Page } from './pages/student/student_attendance/student_attendance';
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

function App() {
  return (
      <ClickSpark
        sparkColor='#A05AC8'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={1000}
        zIndex={100}
      >
      <Router>
    <div className="app">
      <Routes>
        {/* Public page routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/features' element={<Features/>}/>
        <Route path='/schools' element={<Schools/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/dev_team' element={<Developers/>}/>
        <Route path='/signup' element={<AuthFlow/>}/>
        <Route path='/login' element={<AuthFlow/>}/>

        {/* Admin page routes */}
        <Route path='/admin'>
            <Route path='' element={<Admin_dashboard/>}/>
            <Route path='dashboard' element={<Admin_dashboard/>}/>
            <Route path='settings' element={<Admin_settings/>}/>
            <Route path='notifications' element={<Admin_notifications/>}/>
            <Route path='students' element={<Admin_student_management/>}/>
            <Route path='classes' element={<Admin_classes_management/>}/>
            <Route path='teachers' element={<Admin_teachers_management/>}/>
            <Route path='admissions' element={<Admin_admissions_management/>}/>
            <Route path='resources' element={<Admin_resources_management/>}/>
            <Route path='academic_setup' element={<Admin_academic_setup/>}/>
            <Route path='communications' element={<Admin_communications/>}/>
            <Route path='profile' element={<Admin_profile/>}/>
        </Route>

        {/* Access Denied */}
        <Route path='/access-denied' element={<AccessDenied/>}/>

        {/* Student page routes */}
        <Route path='/student'>
            <Route path='' element={<Student_Dashboard_Page/>}/>
            <Route path='dashboard' element={<Student_Dashboard_Page/>}/>
            <Route path='courses' element={<Student_Courses_Page/>}/>
            <Route path='assignments' element={<Student_Assignments_Page/>}/>
            <Route path='grades' element={<Student_Grades_Page/>}/>
            <Route path='timetable' element={<Student_Timetable_Page/>}/>
            <Route path='attendance' element={<Student_Attendance_Page/>}/>
            <Route path='resources' element={<Student_Resources_Page/>}/>
            <Route path='announcements' element={<Student_Announcements_Page/>}/>
            <Route path='notifications' element={<Student_Notifications_Page/>}/>
            <Route path='settings' element={<Student_Settings_Page/>}/>
            <Route path='profile' element={<Student_profile/>}/>
        </Route>

        {/* Teacher page routes */}
        <Route path='/teacher'>
            <Route path='' element={<Teacher_Dashboard_Page/>}/>
            <Route path='dashboard' element={<Teacher_Dashboard_Page/>}/>
            <Route path='classes' element={<Teacher_Classes_Page/>}/>
            <Route path='students' element={<Teacher_Students_Page/>}/>
            <Route path='assignments' element={<Teacher_Assignments_Page/>}/>
            <Route path='grades' element={<Teacher_Grades_Page/>}/>
            <Route path='attendance' element={<Teacher_Attendance_Page/>}/>
            <Route path='schedule' element={<Teacher_Schedule_Page/>}/>
            <Route path='resources' element={<Teacher_Resources_Page/>}/>
            <Route path='announcements' element={<Teacher_Announcements_Page/>}/>
            <Route path='settings' element={<Teacher_Settings_Page/>}/>
            <Route path='profile' element={<Teacher_profile/>}/>
        </Route>

          {/* Not Found Route */}
        <Route path='*' element={<Not_found/>}/>
      </Routes>
    </div>
    </Router>

</ClickSpark>
    
  )
}

export default App;
