import React, { useState, useEffect } from "react";
import logo from "../images/logo.svg";
import RefreshIcon from '@mui/icons-material/Refresh';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Navbar({ user }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  




  



  
  function refreshPage() { 
    window.parent.location = window.parent.location.href;
  }

  return (
    <div className="navbar">
      <div className={`navbar ${theme}`}>
        <div className="logo">
          <img src={logo} alt="logo" className="logo" />
          <h1>Stock Tracker</h1>
        </div>

        <div className="refresdark">
          <button className="but" onClick={refreshPage}>
            <RefreshIcon /> Refresh
          </button>

          <button className="but" onClick={toggleTheme}>
            <DarkModeIcon />Dark Mode
          </button>

          <h2 className="user"></h2>
        </div>
      </div>
    </div>
  );
}
