import { useState } from "react";

export default function CreateUser({ themeMode, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://stocktrackerbackend.onrender.com/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      setUser(data);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      {/* <h3>Create User</h3> */}

      <label className={`label ${themeMode}`}>User name</label>
      <input
        type="text" // Corrected the input type to "text"
        onChange={(e) => setUsername(e.target.value)} // Changed setEmail to setUsername for the username field
        value={username}
        className={`value ${themeMode}`}
        placeholder="User name"
      />

      <label className={`label ${themeMode}`}>Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)} // Changed setEmail to setEmail for the email field
        value={email}
        className={`value ${themeMode}`}
        placeholder="Email"
      />

      <label className={`label ${themeMode}`}>Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className={`value ${themeMode}`}
        placeholder="Password"
      />

      <button class="submitcreateuser" type="submit">
        Create
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
