import axios from "axios";
import nlp from "compromise/three";

export const customParticlesOptions = {
    particles: {
      number: {
        // value: 150,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#09aff4",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 5,
          size_min: 0.3,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: false,
          mode: "bubble",
        },
        onclick: {
          enable: false,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 250,
          size: 0,
          duration: 2,
          opacity: 0,
          speed: 3,
        },
        repulse: {
          distance: 400,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };


  export const getUser = () => {
    return JSON.parse(localStorage.getItem('sb-vzzoeejjqkzixagyqcsy-auth-token'));
  }

  export const setUser = (user) => {
    localStorage.setItem('sb-vzzoeejjqkzixagyqcsy-auth-token', JSON.stringify(user));
  }

  export const sginout = async () => {
    const token = getUser();
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signout`, { token: token?.access_token });
    localStorage.removeItem('sb-vzzoeejjqkzixagyqcsy-auth-token');
  }

  export const uuid_generate_v4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

export function generateTitleUsingCompromise(question) {
  // Use NLP to parse the sentence and identify nouns and key phrases
  let doc = nlp(question);
  
  // Step 1: Get the key nouns and terms
  const nouns = doc.nouns().out('array'); // Extract only the nouns
  const topics = doc.topics().out('array'); // Extract main topics if available
  
  // Step 2: Merge results to get the main words (you can tweak this step as needed)
  const keywords = [...new Set([...nouns, ...topics])];

  // Step 3: Capitalize each keyword and join them as a title
  const title = keywords.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return removeSpecialCharacters(title || question);
}


export const removeSpecialCharacters = (text) => {
  return text?.replace(/[^a-zA-Z0-9 ]/g, '');
}

