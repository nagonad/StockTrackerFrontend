import React, { useState, useEffect } from "react";
import logo from "../images/logo_removebg.png";
import RefreshIcon from "@mui/icons-material/Refresh";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Box from "@mui/material/Box";

export default function Navbar({ user }) {
  function refreshPage() {
    window.parent.location = window.parent.location.href;
  }

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <Box className={`navbar ${theme}`} sx={{ boxShadow: 3 }}>
        <div className="logoContainer">
          <img src={logo} alt="logo" className="logo" />
          <h1 className="navbarFredoka">Stock Tracker</h1>
        </div>

        <div className="refresdark">
          <button className="but" onClick={refreshPage}>
            <RefreshIcon sx={{ color: "#4b5563", marginRight: "0.5rem" }} />{" "}
            Refresh
          </button>

          <button className="but" onClick={toggleTheme}>
            <DarkModeIcon sx={{ color: "#4b5563", marginRight: "0.5rem" }} />
            Dark Mode
          </button>

          <div className="user">{user.username.charAt(0).toUpperCase()}</div>
        </div>
      </Box>
    </div>
  );
}
