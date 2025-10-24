import React from 'react';
import './teachers_management.css'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { LuNotebookText  } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import { FaLongArrowAltRight,FaWhatsapp  } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import { MdOutlinePhone } from "react-icons/md";




export const Teachers_management = () => {
  let navigate = useNavigate();
  return (
    <div className='teachers_management'>
          <div className="box">
            <div className="whole_up">
              <div className="up">
                <div className="button">
                  <button  onClick={() =>navigate(-1)}><FaArrowLeft className='icon'/><span>Back</span></button>
                </div>
              </div>
              <div className="upper">
                <h4>Manage teachers</h4>
                <p>Add, edit, and organize teachers. Keep enrollment records up to date and maintain a clean, searchable teachers database.</p>
              </div>
              <div className="mini_up">
                <div className="search_box">
                    <div className="search">
                      <div className="icon"><CiSearch /></div>
                      <input type="text" placeholder='Search for teachers . . .' />
                    </div>
                    <div className="button">
                      <button>Search</button>
                    </div>
                  </div>
                  <div className="new">
                    <div className="left"><div className="icon"><BiEdit/></div></div>
                    <div className="right">
                      <span>Create new teacher</span>
                      <p>current : 16 teacher</p>
                    </div>
                  </div>
                </div>
            </div>
            <div className="middle">
              <div className="teacher">
                <div className="up">
                  <div className="profile">
                      <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/shema.jpeg`} alt="Teacher profile pic" />
                      </div>
                      <div className="data">
                        <p className='name'>Teacher SHEMA Valentin</p>
                        <p className='email'>valentinshema@gmail.com</p>
                      </div>
                  </div>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><MdOutlinePhone /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><FaWhatsapp  /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p>
                    <div className="icon"><LuNotebookText /></div>
                    <ul>
                      <li>Mathematics</li>
                      <li>Mobile application development</li>
                      <li>NoSQL database development</li>
                    </ul>
                  </p>
                </div>
                <div className="down">
                  <button className='more'><span>View details</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Delete</span><div className="icon"><GoTrash/></div></button>
                </div>
              </div>
              <div className="teacher">
                <div className="up">
                  <div className="profile">
                      <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/franco.png`} alt="Teacher profile pic" />
                      </div>
                      <div className="data">
                        <p className='name'>Teacher Franco Nelly</p>
                        <p className='email'>franconelly@gmail.com</p>
                      </div>
                  </div>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><MdOutlinePhone /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><FaWhatsapp  /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p>
                    <div className="icon"><LuNotebookText /></div>
                    <ul>
                      <li>Physics</li>
                      <li>Pyhton development</li>
                      <li>chemistry</li>
                    </ul>
                  </p>
                </div>
                <div className="down">
                  <button className='more'><span>View details</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Delete</span><div className="icon"><GoTrash/></div></button>
                </div>
              </div>
              <div className="teacher">
                <div className="up">
                  <div className="profile">
                      <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/rwema.jpg`} alt="Teacher profile pic" />
                      </div>
                      <div className="data">
                        <p className='name'>Teacher RWEMA Norbert</p>
                        <p className='email'>rwemanobii@gmail.com</p>
                      </div>
                  </div>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><MdOutlinePhone /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><FaWhatsapp  /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p>
                    <div className="icon"><LuNotebookText /></div>
                    <ul>
                      <li>Computer science</li>
                      <li>Basics of networking</li>
                      <li>NoSQL database development</li>
                    </ul>
                  </p>
                </div>
                <div className="down">
                  <button className='more'><span>View details</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Delete</span><div className="icon"><GoTrash/></div></button>
                </div>
              </div>
              <div className="teacher">
                <div className="up">
                  <div className="profile">
                      <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/shema.jpeg`} alt="Teacher profile pic" />
                      </div>
                      <div className="data">
                        <p className='name'>Teacher SHEMA Valentin</p>
                        <p className='email'>valentinshema@gmail.com</p>
                      </div>
                  </div>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><MdOutlinePhone /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><FaWhatsapp  /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p>
                    <div className="icon"><LuNotebookText /></div>
                    <ul>
                      <li>Mathematics</li>
                      <li>Mobile application development</li>
                      <li>NoSQL database development</li>
                    </ul>
                  </p>
                </div>
                <div className="down">
                  <button className='more'><span>View details</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Delete</span><div className="icon"><GoTrash/></div></button>
                </div>
              </div>
              <div className="teacher">
                <div className="up">
                  <div className="profile">
                      <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/franco.png`} alt="Teacher profile pic" />
                      </div>
                      <div className="data">
                        <p className='name'>Teacher Franco Nelly</p>
                        <p className='email'>franconelly@gmail.com</p>
                      </div>
                  </div>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><MdOutlinePhone /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><FaWhatsapp  /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p>
                    <div className="icon"><LuNotebookText /></div>
                    <ul>
                      <li>Physics</li>
                      <li>Pyhton development</li>
                      <li>chemistry</li>
                    </ul>
                  </p>
                </div>
                <div className="down">
                  <button className='more'><span>View details</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Delete</span><div className="icon"><GoTrash/></div></button>
                </div>
              </div>
              <div className="teacher">
                <div className="up">
                  <div className="profile">
                      <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/rwema.jpg`} alt="Teacher profile pic" />
                      </div>
                      <div className="data">
                        <p className='name'>Teacher RWEMA Norbert</p>
                        <p className='email'>rwemanobii@gmail.com</p>
                      </div>
                  </div>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><MdOutlinePhone /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><FaWhatsapp  /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p>
                    <div className="icon"><LuNotebookText /></div>
                    <ul>
                      <li>Computer science</li>
                      <li>Basics of networking</li>
                      <li>NoSQL database development</li>
                    </ul>
                  </p>
                </div>
                <div className="down">
                  <button className='more'><span>View details</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Delete</span><div className="icon"><GoTrash/></div></button>
                </div>
              </div>
              <div className="teacher">
                <div className="up">
                  <div className="profile">
                      <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/shema.jpeg`} alt="Teacher profile pic" />
                      </div>
                      <div className="data">
                        <p className='name'>Teacher SHEMA Valentin</p>
                        <p className='email'>valentinshema@gmail.com</p>
                      </div>
                  </div>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><MdOutlinePhone /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><FaWhatsapp  /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p>
                    <div className="icon"><LuNotebookText /></div>
                    <ul>
                      <li>Mathematics</li>
                      <li>Mobile application development</li>
                      <li>NoSQL database development</li>
                    </ul>
                  </p>
                </div>
                <div className="down">
                  <button className='more'><span>View details</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Delete</span><div className="icon"><GoTrash/></div></button>
                </div>
              </div>
              <div className="teacher">
                <div className="up">
                  <div className="profile">
                      <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/franco.png`} alt="Teacher profile pic" />
                      </div>
                      <div className="data">
                        <p className='name'>Teacher Franco Nelly</p>
                        <p className='email'>franconelly@gmail.com</p>
                      </div>
                  </div>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><MdOutlinePhone /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><FaWhatsapp  /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p>
                    <div className="icon"><LuNotebookText /></div>
                    <ul>
                      <li>Physics</li>
                      <li>Pyhton development</li>
                      <li>chemistry</li>
                    </ul>
                  </p>
                </div>
                <div className="down">
                  <button className='more'><span>View details</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Delete</span><div className="icon"><GoTrash/></div></button>
                </div>
              </div>
              <div className="teacher">
                <div className="up">
                  <div className="profile">
                      <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/rwema.jpg`} alt="Teacher profile pic" />
                      </div>
                      <div className="data">
                        <p className='name'>Teacher RWEMA Norbert</p>
                        <p className='email'>rwemanobii@gmail.com</p>
                      </div>
                  </div>
                  <p className='active_status active'>active</p>
                </div>
                <div className="details">
                  <p><div className="icon"><MdOutlinePhone /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><FaWhatsapp  /></div><span>+250 795 207 569</span></p>
                  <p><div className="icon"><IoTimeOutline/></div><span>created <span>Mon, August 12, 2025 8:34:12 a.m</span></span></p>
                  <p>
                    <div className="icon"><LuNotebookText /></div>
                    <ul>
                      <li>Computer science</li>
                      <li>Basics of networking</li>
                      <li>NoSQL database development</li>
                    </ul>
                  </p>
                </div>
                <div className="down">
                  <button className='more'><span>View details</span><div className="icon"><FaLongArrowAltRight/></div></button>
                  <button className='archive'><span>Delete</span><div className="icon"><GoTrash/></div></button>
                </div>
              </div>
            </div>
          </div>
      </div>
  )
}
