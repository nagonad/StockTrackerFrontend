import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ProductDetailPage from "./components/ProductDetailPage";
import EditProducts from "./components/EditProducts";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Editprofile from "./components/Editprofile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [themeMode, setThemeMode] = useState("light");

  const toggleThemeMode = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      setThemeMode("light");
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  return (
    <div className={`app ${themeMode}`}>
      {!user ? (
        <>
          <Routes>
            <Route
              path="/"
              element={<Login user={user} setUser={setUser}></Login>}
            ></Route>
            <Route
              path="/signup"
              element={<Signup setUser={setUser}></Signup>}
            ></Route>
            <Route path="*" element={<Navigate to="/" />} />
            <Route
              path="forgotpassword"
              element={<ForgotPassword></ForgotPassword>}
            ></Route>
            <Route
              path="resetpassword/:resetToken"
              element={<ResetPassword></ResetPassword>}
            ></Route>
          </Routes>
        </>
      ) : (
        <>
          <Navbar
            user={user}
            setUser={setUser}
            button={<button onClick={toggleThemeMode}>Toggle Theme</button>}
            themeMode={themeMode}
            toggleThemeMode={toggleThemeMode}
          ></Navbar>

          <>
            <Sidebar themeMode={themeMode}></Sidebar>
            <div id="bodyContentRight">
              <Routes>
                <Route
                  path="/"
                  element={<Dashboard themeMode={themeMode}></Dashboard>}
                ></Route>
                <Route
                  path="/product/:id/:color/:size"
                  element={<ProductDetailPage></ProductDetailPage>}
                ></Route>
                <Route
                  path="/Editproducts"
                  element={<EditProducts themeMode={themeMode}></EditProducts>}
                ></Route>
                <Route
                  path="/editprofile"
                  element={
                    <Editprofile
                      themeMode={themeMode}
                      user={user}
                    ></Editprofile>
                  }
                ></Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        </>
      )}
    </div>
  );
}

export default App;
