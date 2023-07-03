import React from "react";
import Box from "@mui/material/Box";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PeopleIcon from "@mui/icons-material/People";

export default function Sidebar({ themeMode }) {
  return (
    <Box className={`sidebar ${themeMode}`} sx={{ boxShadow: 3 }}>
      <List sx={{ padding: "0" }}>
        <ListItem sx={{ padding: "0" }}>
          <NavLink className="sidebarNavlink" to="/">
            <LeaderboardIcon className="sidebarListitem"></LeaderboardIcon>
            <ListItemText
              sx={{
                color: themeMode === "dark" ? "#ffffff" : "#1f2937",
              }}
            >
              Dashboard
            </ListItemText>
          </NavLink>
        </ListItem>
        <Divider />
        <ListItem sx={{ padding: "0" }}>
          <NavLink className="sidebarNavlink" to="/Editproducts">
            <WidgetsIcon></WidgetsIcon>
            <ListItemText
              sx={{
                color: themeMode === "dark" ? "#ffffff" : "#1f2937",
              }}
            >
              Edit Products
            </ListItemText>
          </NavLink>
        </ListItem>
        <Divider />
        <ListItem sx={{ padding: "0" }}>
          <NavLink className="sidebarNavlink" to="/editprofile">
            <PeopleIcon></PeopleIcon>
            <ListItemText
              sx={{
                color: themeMode === "dark" ? "#ffffff" : "#000000",
              }}
            >
              User Profile
            </ListItemText>
          </NavLink>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );
}
