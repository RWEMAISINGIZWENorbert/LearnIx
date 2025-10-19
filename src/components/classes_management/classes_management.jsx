import React from 'react';
import './classes_management.css'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { LuUser, LuUsers } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { BiEdit } from "react-icons/bi";


export const Classes_management = () => {
  let navigate = useNavigate();
  return (
    <div className='classes_management'>
          <div className="box">
            <div className="whole_up">
              <div className="up">
                <div className="button">
                  <button  onClick={() =>navigate(-1)}><FaArrowLeft className='icon'/><span>Back</span></button>
                </div>
              </div>
              <div className="upper">
                <h4>Manage classes</h4>
                <p>Add, edit, and organize classes with ease. Keep enrollment records up to date and maintain a clean, searchable classes database.</p>
              </div>
              <div className="mini_up">
                <div className="search_box">
                    <div className="search">
                      <div className="icon"><CiSearch /></div>
                      <input type="text" placeholder='Search for classes . . .' />
                    </div>
                    <div className="button">
                      <button>Search</button>
                    </div>
                  </div>
                  <div className="new">
                    <div className="left"><div className="icon"><BiEdit/></div></div>
                    <div className="right">
                      <span>Create new class</span>
                      <p>current : 23 classes</p>
                    </div>
                  </div>
                </div>
            </div>
            <div className="middle">
              <div className="class">
                <div className="up">
                  <h4 className="name">L3 SOD A</h4>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><LuUser/></div><span>Teacher SHEMA Valentin</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p><div className="icon"><LuUsers/></div><span>39 students</span></p>
                </div>
                <div className="down">
                  <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div></button>
                </div>
              </div>
              <div className="class">
                <div className="up">
                  <h4 className="name">L3 SOD B</h4>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><LuUser/></div><span>Teacher SHEMA Valentin</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p><div className="icon"><LuUsers/></div><span>39 students</span></p>
                </div>
                <div className="down">
                  <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div></button>
                </div>
              </div>
              <div className="class">
                <div className="up">
                  <h4 className="name">L3 ELT A</h4>
                  <p className='active_status inactive'>inactive</p>
                </div>
                <div className="details">
                  <p><div className="icon"><LuUser/></div><span>Teacher SHEMA Valentin</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p><div className="icon"><LuUsers/></div><span>39 students</span></p>
                </div>
                <div className="down">
                  <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div></button>
                </div>
              </div>
              <div className="class">
                <div className="up">
                  <h4 className="name">L4 SOD A</h4>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><LuUser/></div><span>Teacher SHEMA Valentin</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p><div className="icon"><LuUsers/></div><span>39 students</span></p>
                </div>
                <div className="down">
                  <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div></button>
                </div>
              </div>
              <div className="class">
                <div className="up">
                  <h4 className="name">S4 MCB A</h4>
                  <p className='active_status inactive'>inactive</p>
                </div>
                <div className="details">
                  <p><div className="icon"><LuUser/></div><span>Teacher SHEMA Valentin</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p><div className="icon"><LuUsers/></div><span>39 students</span></p>
                </div>
                <div className="down">
                  <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div></button>
                </div>
              </div>
              <div className="class">
                <div className="up">
                  <h4 className="name">L4 SOD B</h4>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><LuUser/></div><span>Teacher SHEMA Valentin</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p><div className="icon"><LuUsers/></div><span>39 students</span></p>
                </div>
                <div className="down">
                  <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div></button>
                </div>
              </div>
              <div className="class">
                <div className="up">
                  <h4 className="name">S3A</h4>
                  <p className='active_status inactive'>inactive</p>
                </div>
                <div className="details">
                  <p><div className="icon"><LuUser/></div><span>Teacher SHEMA Valentin</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p><div className="icon"><LuUsers/></div><span>39 students</span></p>
                </div>
                <div className="down">
                  <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div></button>
                </div>
              </div>
              <div className="class">
                <div className="up">
                  <h4 className="name">S5 PCB A</h4>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><LuUser/></div><span>Teacher SHEMA Valentin</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p><div className="icon"><LuUsers/></div><span>39 students</span></p>
                </div>
                <div className="down">
                  <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div></button>
                </div>
              </div>
              <div className="class">
                <div className="up">
                  <h4 className="name">L5 SOD A</h4>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><LuUser/></div><span>Teacher SHEMA Valentin</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p><div className="icon"><LuUsers/></div><span>39 students</span></p>
                </div>
                <div className="down">
                  <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div></button>
                </div>
              </div>
              <div className="class">
                <div className="up">
                  <h4 className="name">L5 SOD B</h4>
                  <p className='active_status inactive'>inactive</p>
                </div>
                <div className="details">
                  <p><div className="icon"><LuUser/></div><span>Teacher SHEMA Valentin</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p><div className="icon"><LuUsers/></div><span>39 students</span></p>
                </div>
                <div className="down">
                  <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div></button>
                </div>
              </div>
              <div className="class">
                <div className="up">
                  <h4 className="name">L5 SOD A</h4>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><LuUser/></div><span>Teacher SHEMA Valentin</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p><div className="icon"><LuUsers/></div><span>39 students</span></p>
                </div>
                <div className="down">
                  <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div></button>
                </div>
              </div>
            </div>
          </div>
      </div>
  )
}
