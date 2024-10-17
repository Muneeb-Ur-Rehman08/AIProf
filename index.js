import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./supabase.config.js";
import SupabaseSessionStore from "./supabaseSessionStore.js";
import auth from "./auth.js";
import { handleChat } from "./chat.js";
import conversations from "./conversations.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(express.json());

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the parent directory of the current directory
const parentDir = path.resolve(__dirname, '');

// Serve static files from the React app
app.use(express.static(path.join(parentDir, 'client', 'build')));

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Change to the URL of your frontend
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

app.post("/chat_ai", async (req, res) => {
  try {
    await handleChat(req, res);
  } catch (error) {
    console.error("Error handling chat:", error);
    res.status(500).json({ message: "Internal Server Error", code: 1 });
  }
});

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
  await auth.signOut(req, res);
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

app.get("/conversationbyuserandconversationid", async (req, res) => {
  if (req?.query?.user_id && req?.query?.conversation_id) {
    const result = await conversations.getConversationByUserAndConversationId(req.query.user_id, req.query.conversation_id);
    res.status(200).json({ message: "Conversation fetched successfully", code: 0, result });
  } else {
    res.status(401).json({ message: "Unauthorized", code: 1 });
  }
});


// Catch all other routes and return the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(parentDir, 'client', 'build', 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
