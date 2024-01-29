import React, { useState,useEffect } from 'react';
import { BsClockHistory, BsFillCloudMoonFill, BsSun } from 'react-icons/bs';
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css';

const Header = props => {
 
  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    window.location.href = '/Home';
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <nav className={`nav-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="nav-content nav-bar-large-container">
        <ul className="nav-menu">
          <li className="nav-menu-item">
         Home
              </li>
          <li className="nav-menu-item">
            History
          </li>

          <li className="nav-menu-item-mobile">
            <button
              type="button"
              className="btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <BsSun /> : <BsFillCloudMoonFill />}
            </button>
          </li>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
          <Link to="/" className="nav-link">
                <BsClockHistory />
</Link>
            
          </li>
          <li className="nav-menu-item-mobile">
            <button
              type="button"
              className="btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <BsSun /> : <BsFillCloudMoonFill />}
            </button>
          </li>
          <li>
            <button type="button" className="logout-btn"  onClick={onClickLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
