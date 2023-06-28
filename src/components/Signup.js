import React, { useState } from "react";
import loginimage from "../images/loginimage.png";
import Typography from "@mui/material/Typography";
import logo from "../images/logo_removebg.png";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://stocktrackerbackend.onrender.com/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    }
  };

  return (
    <div className="logincontainer">
      <div className="loginleftcontainer">
        <div className="loginleftinnercontainer">
          <img src={loginimage} alt="" />
          <Typography sx={{ fontFamily: "Codec", color: "white" }} variant="h3">
            StockTracker
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Arapey", color: "white" }}
          >
            Easy solution for your
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Arapey", color: "white" }}
          >
            inventory management problem
          </Typography>
        </div>
      </div>
      <div className="loginrightcontainer">
        <div className="loginrightinnercontainer">
          <div className="loginflex">
            <img src={logo} alt=""></img>
            <Typography
              sx={{
                fontFamily: "Fredoka",
                fontSize: "36px",
                fontWeight: "600",
                color: "#525252",
              }}
            >
              StockTracker
            </Typography>
          </div>
          <div>
            <Typography
              sx={{
                fontFamily: "Nunito",
                fontSize: "36px",
                color: "#525252",
                fontWeight: "bold",
              }}
            >
              Create a new Account
            </Typography>
            <Typography
              sx={{ fontFamily: "Nunito", fontSize: "16px", color: "#525252" }}
            >
              See what is going on with your bussiness
            </Typography>
          </div>

          <form className="loginform" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
            />
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
            />
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
            />
            {error && <div className="error">{error}</div>}
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "2rem", boxShadow: "none", width: "100%" }}
            >
              Signup
            </Button>
          </form>
          <div
            className="loginflex"
            style={{ justifyContent: "center", marginTop: "4rem" }}
          >
            <Typography sx={{ color: "#828282" }}>
              Already have an Account?
            </Typography>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography sx={{ marginLeft: "1rem", color: "#1976d2" }}>
                Login Now
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
