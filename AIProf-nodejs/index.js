import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./supabase.config.js";
import SupabaseSessionStore from "./supabaseSessionStore.js";
import auth from "./auth.js";
import { handleChat } from "./chat.js";
import conversations from "./conversations.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3090", // Change to the URL of your frontend
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Use custom Supabase session store
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SupabaseSessionStore({
      client: supabase,
      tableName: "user_sessions",
    }), // Use SupabaseSessionStore
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    },
  })
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    code: 0,
    message: "Welcome to the chat",
  });
});

app.post("/chat", handleChat);

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  await auth.signUpWithEmail(email, password);
  res.status(200).json({ message: "Signup successful", code: 0 });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await auth.signInWithEmail(email, password);
  res.status(200).json({ message: "Signin successful", code: 0, user });
});

app.post("/signingoogle", async (req, res) => {
  await auth.signInWithGoogle(req, res);
});

app.get("/user", async (req, res) => {
  const user = await auth.getUser();
  res.status(200).json({ message: "User fetched successfully", code: 0, user });
});

app.get("/userwithtoken", async (req, res) => {
  const user = await auth.getUserWithToken(req, res);
  res.status(200).json({ message: "User fetched successfully", code: 0, user });
});

app.post("/signout", async (req, res) => {
  await auth.signOut();
  res.status(200).json({ message: "Signout successful", code: 0 });
});

app.get("/conversations", async (req, res) => {
  if (req?.query?.user_id) {
    const result = await conversations.getConversationsByUser(req.query.user_id);
    res.status(200).json({ message: "Conversations fetched successfully", code: 0, result });
  } else if (req?.query?.id) {
    const result = await conversations.getConversationById(req.query.id);
    res.status(200).json({ message: "Conversation fetched successfully", code: 0, result });
  } else {
    res.status(401).json({ message: "Unauthorized", code: 1 });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
