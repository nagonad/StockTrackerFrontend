import React, { useState } from "react";
import loginimage from "../images/loginimage.png";
import Typography from "@mui/material/Typography";
import logo from "../images/logo_removebg.png";
import { Checkbox, Button, FormGroup, FormControlLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://stocktrackerbackend.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="logincontainer">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
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
              Login to your Account
            </Typography>
            <Typography
              sx={{ fontFamily: "Nunito", fontSize: "16px", color: "#525252" }}
            >
              See what is going on with your business
            </Typography>
          </div>

          <form className="loginform" onSubmit={handleSubmit}>
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
            <div>
              <div
                className="loginflex"
                style={{ justifyContent: "space-between" }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remember Me"
                  />
                </FormGroup>
                <Link to="forgotpassword" style={{ textDecoration: "none" }}>
                  <Typography sx={{ color: "#1976d2" }}>
                    Forgot Password?
                  </Typography>
                </Link>
              </div>
            </div>

            {error && <div className="error">{error}</div>}
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "1rem", boxShadow: "none", width: "100%" }}
            >
              Login
            </Button>
          </form>
          <div
            className="loginflex"
            style={{ justifyContent: "center", marginTop: "4rem" }}
          >
            <Typography sx={{ color: "#828282" }}>
              Not Registered Yet?
            </Typography>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography sx={{ marginLeft: "1rem", color: "#1976d2" }}>
                Create an Account
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
