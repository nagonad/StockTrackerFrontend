import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import EditProducts from "./components/EditProducts";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Editprofile from "./components/Editprofile";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  return (
    <>
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
          </Routes>
        </>
      ) : (
        <>

          <Navbar user={user}></Navbar>
          <div className="bodyContent">
            <Sidebar></Sidebar>
            <div id="bodyContentRight">
              <Routes>
                <Route path="/" element={<Dashboard></Dashboard>}></Route>
                <Route path="/users" element={<User></User>}></Route>
                <Route
                  path="/Editproducts"
                  element={<EditProducts></EditProducts>}
                ></Route>
              <Route
              path="/editprofile"
              element={<Editprofile user={user}></Editprofile>}
            ></Route>
              </Routes>
            </div>
          </div>

        </>
      )}
    </>
  );
}

export default App;
