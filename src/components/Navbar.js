import React, { useState, useEffect } from "react";
import logo from "../images/logo_removebg.png";
import RefreshIcon from "@mui/icons-material/Refresh";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

export default function Navbar({
  user,
  setUser,
  button,
  themeMode,
  toggleThemeMode,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function refreshPage() {
    window.parent.location = window.parent.location.href;
  }

  return (
    <div>
      <Box className={`navbar ${themeMode}`} sx={{ boxShadow: 3 }}>
        <div className="logoContainer">
          <img src={logo} alt="logo" className="logo" />
          <h1 className="navbarFredoka">Stock Tracker</h1>
        </div>

        <div className={`refresdark ${themeMode}`}>
          <button className="but" onClick={refreshPage}>
            <RefreshIcon sx={{ color: "#4b5563", marginRight: "0.5rem" }} />{" "}
            Refresh
          </button>
          <button className="but" onClick={toggleThemeMode}>
            <DarkModeIcon sx={{ color: "#4b5563", marginRight: "0.5rem" }} />{" "}
            Dark Mode
          </button>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: "40px", height: "40px" }}>
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                padding: "10px",
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Box>
    </div>
  );
}
