import express from "express";
// import cors from "cors";

const app = express();

// app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/v1/login", (req, res) => {
  const user_data = [
    {
      id: 1,
      username: "john_doe",
      email: "john.doe@example.com",
      age: 28,
      gender: "male",
      isActive: true,
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane.smith@example.com",
      age: 34,
      gender: "female",
      isActive: true,
    },
    {
      id: 3,
      username: "sam_brown",
      email: "sam.brown@example.com",
      age: 23,
      gender: "male",
      isActive: false,
    },
    {
      id: 4,
      username: "lisa_jones",
      email: "lisa.jones@example.com",
      age: 29,
      gender: "female",
      isActive: true,
    },
  ];
  res.send(user_data);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is listning on port ${PORT}`);
});
