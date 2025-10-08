import React from 'react'
import { Dashboard } from '../../components/dashboard_page/dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export const Admin = () => {
  return (
    <Router>
      <Routes>
        <div className="admin">
          <Route path='dashboard' element={<Dashboard />} />
        </div>
      </Routes>
    </Router>
  )
}
  