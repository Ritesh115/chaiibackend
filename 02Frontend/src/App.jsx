import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [user_data, setuser_data] = useState([]); //1

  useEffect(() => {
    axios
      .get("/api/login")
      .then((response) => {
        setuser_data(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <h1>chai and fullstack</h1>
      <p>user_data strength : {user_data.length}</p>

      {user_data.map((user, index) => (
        <div key={"user.id"}>
          <h3>{user.username}</h3>
          <p> {user.email} </p>
        </div>
      ))}
    </>
  );
}

export default App;
