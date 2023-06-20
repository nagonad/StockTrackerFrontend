import "./App.css";
import { Routes, Route } from "react-router-dom";

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
