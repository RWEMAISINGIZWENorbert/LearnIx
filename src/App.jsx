import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/public_pages/home/Home_page';
import { Features } from './pages/public_pages/features/features_page';
import { Login_page } from './pages/public_pages/Login/login_page';
import ClickSpark from './components/for_an_admin/animations/ClickSpark';
import { Not_found } from './pages/public_pages/Not_Found/Not_found';
import { Admin_dashboard } from './pages/admin/admin_dashboard/admin_dashboard';
import { Admin_settings } from './pages/admin/admin_settings/admin_settings';
import { Developers } from './pages/public_pages/Developers/Developers';
import { Admin_notifications } from './pages/admin/Admin_notifications/admin_notifications';
import { Admin_user_management } from './pages/admin/admin_user_management/admin_user_management';
import { Admin_student_management } from './pages/admin/admin_student_management/admin_student_management';
import { Admin_classes_management } from './pages/admin/admin_classes_management/admin_classes_management';
import { Admin_teachers_management } from './pages/admin/admin_teachers_management/admin_teachers_management';
import { Admin_admissions_management } from './pages/admin/admin_admissions_management/admin_admissions_management';
import { Admin_resources_management } from './pages/admin/admin_resources_management/admin_resources_management';
import { Admin_academic_setup } from './pages/admin/admin_academic_setup/admin_academic_setup';

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
        <Route path='/signup' element={<Login_page/>}/>
        <Route path='/dev_team' element={<Developers/>}/>

        {/* Admin page routes */}
        <Route path='/admin'>
            <Route path='' element={<Admin_dashboard/>}/>
            <Route path='dashboard' element={<Admin_dashboard/>}/>
            <Route path='settings' element={<Admin_settings/>}/>
            <Route path='notifications' element={<Admin_notifications/>}/>
            <Route path='user_management' element={<Admin_user_management/>}/>
            <Route path='user_management' >
                <Route path='students' element={<Admin_student_management/>}/>
                <Route path='classes' element={<Admin_classes_management/>}/>
                <Route path='teachers' element={<Admin_teachers_management/>}/>
            </Route>
            <Route path='admissions' element={<Admin_admissions_management/>}/>
            <Route path='resources' element={<Admin_resources_management/>}/>
            <Route path='academic_setup' element={<Admin_academic_setup/>}/>
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
