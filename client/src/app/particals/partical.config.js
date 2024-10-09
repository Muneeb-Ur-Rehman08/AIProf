const particalConfig = {
  fullScreen: { enable: false }, // Optional to enable full-screen mode
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        area: 500,
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
        sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: { enable: true, minimumValue: 0.1 },
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 3 }, // Adjusted for `tsparticles` size range
      random: { enable: true, minimumValue: 0.3 },
      animation: {
        enable: true,
        speed: 5,
        minimumValue: 0.3,
        sync: false,
      },
    },
    links: {
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
      outModes: {
        default: "out",
      },
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: false,
        mode: "bubble",
      },
      onClick: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        links: {
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
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
    },
  },
  detectRetina: true,
};

export default particalConfig;