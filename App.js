import "dotenv/config";
import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import QuestionRoutes from "./Questions/routes.js";
import QuizRoutes from "./quizes/routes.js";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
    }
));
app.use(express.json());
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

QuestionRoutes(app);
QuizRoutes(app);

app.get("/health_check", (req, res) => {
    res.json({ message: "Life is good!!!" });
    }
);

app.listen(4000);