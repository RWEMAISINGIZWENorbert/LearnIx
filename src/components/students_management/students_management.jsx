import React from 'react';
import './students_management.css'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export const Students_management = () => {
  let navigate = useNavigate();
  return (
    <div className='students_management'>
        <div className="box">
          <div className="up">
            <div className="button">
              <button  onClick={() =>navigate(-1)}><FaArrowLeft className='icon'/><span>Back</span></button>
            </div>
          </div>
          <div className="upper">
            <h4>Student Management Page</h4>
            <p>Add, edit, and organize student with ease. Keep enrollment records up to date and maintain a clean, searchable student database.</p>
          </div>
        </div>
    </div>
  )
}
