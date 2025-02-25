import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // all the requests from this origin will be allowed.
    credentials: true, // to allow cookies from the frontend to be sent to the backend.
  })
);

// express middleware config.
app.use(express.json({ limit: "16kb" })); //This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.

//URL Encoded Data (for form submissions)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//Static Files (Serve Images, CSS, JS)
app.use(express.static("public"));      //This is a built-in middleware function in Express. It serves static files and is based on serve-static.

app.use(cookieParser());

//after doing above config we will write routers.

// routes
import userRouter from "./routes/user.routes.js";

// routes declaration   , we have to awake it like middleware.
app.use("/api/v1/users", userRouter);

// http://localhost:3000/users/register , /users ke bad it will aytomatically append.

export default app;
