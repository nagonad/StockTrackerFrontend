import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

import loginimage from "../images/loginimage.png";
import Typography from "@mui/material/Typography";
import logo from "../images/logo_removebg.png";
import { Checkbox, Button, FormGroup, FormControlLabel } from "@mui/material";

function ResetPassword() {
  const { resetToken } = useParams(); // get the token from the URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlerts, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log(password, resetToken);

    const response = await fetch(
      `https://stocktrackerbackend.onrender.com/user/resetpassword/${resetToken}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, resetToken }),
      }
    );

    console.log(response);

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
    }
    if (response.ok) {
      setIsLoading(false);

      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (showAlerts) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showAlerts, navigate]);

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
          <form className="loginform" onSubmit={handleSubmit}>
            <label>New password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="email"
            />
            <label>Confirm new password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              name="email"
            />
            {error && <div className="error">{error}</div>}
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "1rem", boxShadow: "none", width: "100%" }}
            >
              Submit
            </Button>
            {showAlerts && (
              <div className="success-alert">
                <Alert
                  severity="success"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  <AlertTitle>Success</AlertTitle>
                  Password updated successfully
                </Alert>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
