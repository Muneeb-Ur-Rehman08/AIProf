import './css/main-LTR.css';
import './css/home.css';
import './css/vendors/flaticon/flaticon.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MainPage from './app/pages/main';
import { useEffect, React } from 'react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { WOW } from 'wowjs';  // Fixed import
import './css/vendors/animate.css';

const themeStoredKey = "ThemeColor";
const darkThemeClass = "dark-theme";
const lightThemeClass = "light-theme";
const themeStoredItem = localStorage.getItem(themeStoredKey);

function App() {
  useEffect(() => {
    const pageBody = document.body;

    function setThemeMode(themeColor) {
      if (themeColor !== darkThemeClass) {
        pageBody.classList.add(darkThemeClass);
        localStorage.setItem(themeStoredKey, darkThemeClass);
        localStorage.removeItem(lightThemeClass);
      }
    }

    // Set the theme according to the local storage value
    if (!themeStoredItem && !pageBody.classList.contains(darkThemeClass)) {
      setThemeMode(darkThemeClass);
    }

    if (themeStoredItem === darkThemeClass || pageBody.classList.contains(darkThemeClass)) {
      setThemeMode(darkThemeClass);
    }
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      localStorage.setItem('particles-js', 'true');
    });

    new WOW().init();
  }, []);

  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
