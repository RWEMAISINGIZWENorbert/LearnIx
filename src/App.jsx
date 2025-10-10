import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/home/Home_page';
import { Features } from './pages/features/features_page';
import { Login_page } from './pages/Login/login_page';
import ClickSpark from './components/animations/ClickSpark';
import { Admin } from './pages/admin/admin';
import { Dashboard } from './components/dashboard_page/dashboard';
import { Not_found } from './pages/Not_Found/Not_found';

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

        {/* Admin page routes */}
        <Route path='/admin' element={<Admin/>}>
            <Route path='dashboard' element={<Dashboard/>}/>
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
