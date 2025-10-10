import React from 'react'
import './Not_Found_page.css'
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export const Not_Found_page = () => {
    let navigate = useNavigate();
  return (
    <div className='not_Found_page'>
        <div className="whole_box">
            <div className="box">
                <div className="left">
                    <div className="img">
                        <img src={`${import.meta.env.BASE_URL}assets/404.png`} alt="Not Found" />
                    </div>
                </div>
                <div className="right">
                    <div className="up">
                        <h1>Ooops! Error <span style={{background:'var(--main-color)'}}>404</span>!</h1>
                        <h2>Page Not Found</h2>
                        <p>We're sorry, but the page you were looking for doesn't exist.</p>
                        <p> Please double-check the URL.</p>
                        <p>Click button below to be redirected to your page.</p>
                    </div>
                    <div className="down">
                        <button onClick={() =>navigate(-1)}><span>Redirect</span> <MdArrowForwardIos className='icon'/></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
