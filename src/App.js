import "./css/main-LTR.css";
import "./css/home.css";
import "./css/vendors/flaticon/flaticon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/vendors/animate.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { WOW } from "wowjs";
import MainPage from "./app/pages/main";
import MultilingualVoiceChat from "./app/pages/chat.ai.tsx";
import { createClient } from "@supabase/supabase-js";

const themeStoredKey = "ThemeColor";
const darkThemeClass = "dark-theme";
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const pageBody = document.body;

    function setThemeMode(themeColor) {
      if (themeColor !== darkThemeClass) {
        pageBody.classList.add(darkThemeClass);
        localStorage.setItem(themeStoredKey, darkThemeClass);
      }
    }

    if (!localStorage.getItem(themeStoredKey) && !pageBody.classList.contains(darkThemeClass)) {
      setThemeMode(darkThemeClass);
    }

    if (localStorage.getItem(themeStoredKey) === darkThemeClass || pageBody.classList.contains(darkThemeClass)) {
      setThemeMode(darkThemeClass);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      localStorage.setItem("particles-js", "true");
    });

    new WOW().init();
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/chat" element={<MultilingualVoiceChat />} />
      </Routes>
    </Router>
  );
}

export default App;
