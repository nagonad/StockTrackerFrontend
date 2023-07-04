import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router-dom";
import { Create } from "@material-ui/icons";
import CreateUser from "./CreateUser";

export default function Editprofile({ setUser, user, themeMode }) {
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
    const response = await fetch(
      "https://stocktrackerbackend.onrender.com/user/updatepassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ userId, currentpassword, newpassword }),
      }
    );

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
        <TabList className={`tablist ${themeMode}`}>
          <Tab
            style={{
              height: "100%",
            }}
          >
            Edit profile
          </Tab>
          <Tab style={{ height: "100%" }}>Create new user</Tab>
        </TabList>
        <div className="tabs">
          <TabPanel className="tab-panel">
            <div className="user-info">
              <label className={`label ${themeMode}`}>User name</label>
              <div className={`value ${themeMode}`}>{user.username}</div>
            </div>
            <div className="user-info">
              <label className={`label ${themeMode}`}>Email</label>
              <div className={`value ${themeMode}`}>{user.userEmail}</div>
            </div>
            <form onSubmit={handleSubmit} className="editform loginform">
              <label className={`label ${themeMode}`}>Change password</label>
              <input
                onChange={(e) => setCurrentpassword(e.target.value)}
                placeholder="Current password"
                type="password"
                name="password"
                value={currentpassword}
                className={`panel ${themeMode}`}
                id="password"
              />
              <input
                onChange={(e) => setNewpassword(e.target.value)}
                placeholder="New password"
                type="password"
                name="password"
                value={newpassword}
                className={`panel ${themeMode}`}
                id="password"
              />

              <input type="submit" value="Submit" className="editsubmit" />
            </form>
          </TabPanel>
          {error && <div className="error">{error}</div>}
        </div>

        <TabPanel>
          <CreateUser themeMode={themeMode} setUser={setUser} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
