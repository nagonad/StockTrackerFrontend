import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import EditProducts from "./components/EditProducts";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path="/users" element={<User></User>}></Route>
        <Route
          path="/Editproducts"
          element={<EditProducts></EditProducts>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
