import "dotenv/config";
import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import QuestionRoutes from "./Kanbas/Questions/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
    }
));
// app.use(express.json());
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };  
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }
  app.use(
    session(sessionOptions)
  );  

ModuleRoutes(app);
CourseRoutes(app);
QuestionRoutes(app);
QuizRoutes(app);
UserRoutes(app);

app.get("/health_check", (req, res) => {
    res.json({ message: "Life is good!!!" });
    }
);

app.listen(4000);