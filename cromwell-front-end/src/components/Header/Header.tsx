import './Header.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Squash as Hamburger } from 'hamburger-react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <>
      <section className={`sidebar__container${menuOpen ? '--active' : ''}`}>
        <nav className='sidebar__nav'>
          <div className='sidebar__nav-item'><Link to='/home' onClick={() => setMenuOpen(false)}>Home</Link></div>
          <div className='sidebar__nav-item'><Link to='/register' onClick={() => setMenuOpen(false)}>Register</Link></div>
          <div className='sidebar__nav-item'><Link to='/login' onClick={() => setMenuOpen(false)}>Login</Link></div>
          <div className='sidebar__nav-item'><Link to='/landing' onClick={() => setMenuOpen(false)}>Landing</Link></div>
        </nav>
      </section>
      <header className='header'>
        <button className={`header__hamburger-button${menuOpen ? '--active' : ''}`}>
          <Hamburger
            toggled={menuOpen}
            toggle={setMenuOpen}
            size={30}
            color='#1c355e'
          />
        </button>
        <nav className='header__nav'>
          <ul className='header__navlist'>
            <li className='header__navlist-item'><Link to='/home'>Home</Link></li>
            <li className='header__navlist-item'><Link to='/register'>Register</Link></li>
            <li className='header__navlist-item'><Link to='/login'>Login</Link></li>
            <li className='header__navlist-item'><Link to='/landing'>Landing</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header