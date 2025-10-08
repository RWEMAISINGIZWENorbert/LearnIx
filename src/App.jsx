import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/home/Home_page';
import { Features } from './pages/features/features_page';
import { Login_page } from './pages/Login/login_page';
import ClickSpark from './components/animations/ClickSpark';
import { Admin } from './pages/admin/admin';



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
        <Route path='/' element={<Home/>}/>
        <Route path='/features' element={<Features/>}/>
        <Route path='/signup' element={<Login_page/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </div>
    </Router>

</ClickSpark>
    
  )
}

export default App;
