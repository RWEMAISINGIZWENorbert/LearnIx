import { NavLink, Link } from 'react-router-dom'
import './navbar.css'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="header">
            <div className="box">
                <div className="leftsection">
                <h1><Link className='all-links' to='/'><span className='learn'>Learn</span>Ix</Link></h1>
            </div>
            <div className="middlesection">
                <div className="links">
                    <div className="link home "><NavLink className={({ isActive }) => isActive ? 'nav-item hover' : 'nav-item'} to='/'>home</NavLink></div>
                    <div className="link schools">schools</div>
                    <div className="link books">books</div>
                    <div className="link features"><NavLink className={({ isActive }) => isActive ? 'nav-item hover' : 'nav-item'} to="/features">features</NavLink></div>
                </div>
            </div>
            <div className="rightsection">
                <div className="button">
                    <Link className='all-links' to='/signup'><button>Register</button></Link>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}
