import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [user_data, setuser_data] = useState([]);

  return (
    <>
      <h1>chai and fullstack</h1>
      <p>user_data strength : {user_data.length}</p>
      {user_data.map((item) => {
        <div key={user_data.id}>
          <h1>{user_data.username}</h1>
          <p>{username.age}</p>
        </div>;
      })}
    </>
  );
}

export default App;
