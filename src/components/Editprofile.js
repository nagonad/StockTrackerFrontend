import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router-dom";
import { Create } from "@material-ui/icons";
import CreateUser from "./CreateUser";


export default function Editprofile({ setUser ,user }) {
  const [currentpassword, setCurrentpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const userId = user.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userId, currentpassword, newpassword);

    setIsLoading(true);
    setError(null);
    console.log(userId, currentpassword, newpassword);
    const response = await fetch("http://localhost:8080/user/updatepassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({ userId, currentpassword, newpassword }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
    }
    if (response.ok) {
      setIsLoading(false);
      alert("Password updated successfully");
      // navigate("/");
    }
  };

  return (
    <div className="Editprofile">
      <Tabs className="tabsHeader">
        <TabList className="tablist">
          <Tab
            style={{
              height: "100%",
              marginLeft: "1rem",
            }}
          >
            Edit profile
          </Tab>
          <Tab style={{ height: "100%" }}>Create new user</Tab>
        </TabList>
        <div className="tabs">
          <TabPanel className="tab-panel">
            <div className="user-info">
              <label className="label">User Name</label>
              <div className="value">{user.username}</div>
            </div>
            <div className="user-info">
              <label className="label">Email</label>
              <div className="value">{user.userEmail}</div>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="label">Change password</label>
              <input
                onChange={(e) => setCurrentpassword(e.target.value)}
                placeholder="Current password"
                type="password"
                name="password"
                value={currentpassword}
              />
              <input
                onChange={(e) => setNewpassword(e.target.value)}
                placeholder="New password"
                type="password"
                name="password"
                value={newpassword}
              />

              <input type="submit" value="Submit" />
            </form>
          </TabPanel>
          {error && <div className="error">{error}</div>}
        </div>

        
        <TabPanel>
      <CreateUser setUser={setUser}/>
        </TabPanel>
      </Tabs>
    </div>
  );
}
