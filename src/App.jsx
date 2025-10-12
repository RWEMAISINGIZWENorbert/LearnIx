import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/home/Home_page';
import { Features } from './pages/features/features_page';
import { Login_page } from './pages/Login/login_page';
import ClickSpark from './components/animations/ClickSpark';
import { Not_found } from './pages/Not_Found/Not_found';
import { Admin_dashboard } from './pages/admin/admin_dashboard/admin_dashboard';
import { Admin_settings } from './pages/admin/admin_settings/admin_settings';
import { Developers } from './pages/Developers/Developers';

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
