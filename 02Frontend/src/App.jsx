import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [user_data, setuser_data] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/login")
      .then((response) => {
        setuser_data(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>chai and fullstack</h1>
      <p>user_data strength : {user_data.length}</p>
      {user_data.map((user_data) => {
        <div key={user_data.id}>
          <h1>{user_data.username}</h1>
          <p>{username.age}</p>
        </div>;
      })}
    </>
  );
}

export default App;
