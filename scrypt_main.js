const sun = document.getElementById("sun_baza");
  const sound_sun = document.getElementById("sun_ignite");

  sun.addEventListener("click", () => {
    sound_sun.currentTime = 0;
    sound_sun.play();
  });
  
  const venus = document.getElementById("venus");
  const sound_venus = document.getElementById("venus_sound");

  venus.addEventListener("click", () => {
    sound_venus.currentTime = 0;
    sound_venus.play();
  });
  
  const earth = document.getElementById("earth");
  const sound_earth = document.getElementById("earth_sound");

  earth.addEventListener("click", () => {
    sound_earth.currentTime = 0;
    sound_earth.play();
  });
  
  const mars = document.getElementById("mars");
  const sound_mars = document.getElementById("mars_sound");

  mars.addEventListener("click", () => {
    sound_mars.currentTime = 0;
    sound_mars.play();
  });
  
  const jupiter = document.getElementById("jupiter");
  const sound_jupiter = document.getElementById("jupiter_sound");

  sun.addEventListener("click", () => {
    sound.currentTime = 0;
    sound.play();
  });
   
  window.onload = function() {
    const sun = document.getElementById('sun_baza');
  
    const planets = [
      { id: 'mercury', radius: 45, speed: 0.01 },
      { id: 'venus', radius: 75, speed: 0.0075 },
      { id: 'earth', radius: 100, speed: 0.006 },
      { id: 'mars', radius: 130, speed: 0.005 },
      { id: 'jupiter', radius: 170, speed: 0.004 },
      { id: 'saturn', radius: 210, speed: 0.003 },
      { id: 'uranus', radius: 250, speed: 0.0025 },
      { id: 'neptune', radius: 290, speed: 0.002 },
      { id: 'pluton', radius: 320, speed: 0.0015 }
    ];
  
    planets.forEach(p => {
      p.el = document.getElementById(p.id);
      p.angle = Math.random() * Math.PI * 2;
      p.incl = 0.85 + Math.random() * 0.3;
      if (p.el) p.el.style.position = 'absolute';
    });
  
    function getSunCenter() {
      const rect = sun.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
  
    const pauseImg = "texture_menu/pause.jpeg";
    const playImg = "texture_menu/play.jpeg";
    const pauseBtnImg = document.getElementById("pauseBtn");
  
    let isPaused = false;
  
    pauseBtnImg.addEventListener("click", () => {
      isPaused = !isPaused;
      pauseBtnImg.src = isPaused ? playImg : pauseImg;
    });
  
    function animate() {
      if (!isPaused) {
        const center = getSunCenter();
        planets.forEach(p => {
          p.angle += p.speed;
          const x = center.x + Math.cos(p.angle) * p.radius;
          const y = center.y + Math.sin(p.angle) * p.radius * p.incl;
          const w = p.el.offsetWidth;
          const h = p.el.offsetHeight;
          p.el.style.left = (x - w / 2) + 'px';
          p.el.style.top = (y - h / 2) + 'px';
        });
      }
      requestAnimationFrame(animate);
    }
  
    animate();
  };
  
const infoPanel = document.getElementById("infoPanel");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");

const planetInfo = {
  sun_baza: { title: "Сонце", text: "Сонце – це зірка середнього розміру, що становить близько 99.86% маси Сонячної системи і складається переважно з водню (близько 74% та гелію (близько 24%). " },
  mercury: { title: "Меркурій", text: "Перша планета у системі" },
  venus:   { title: "Венера",   text: "Друга планета СОнячної системи деякі кажуть що це зла близнючка Землі" },
  earth:   { title: "Земля",    text: "Наша рідна планета" },
  mars:    { title: "Марс",     text: "Марс зі своєю горою Олімп!" },
  jupiter: { title: "Юпітер",   text: "Газовй гігант" },
  saturn:  { title: "Сатурн",   text: "Має кільце " },
  uranus:  { title: "Уран",     text: "Інакший нахил осі." },
  neptune: { title: "Нептун",   text: "Далека синя планета" },
  pluton:  { title: "Плутон",   text: "Плутон відкрив американський астроном Клайд Томбо 18 лютого 1930 року в обсерваторії Ловелла. Згодом, у 2006 року Плутон визначили як карликовою планетою" }
};

//цикл
Object.keys(planetInfo).forEach(id => {
  const planet = document.getElementById(id);
  if (planet) {
    planet.addEventListener("click", () => {
      infoTitle.textContent = planetInfo[id].title;
      infoText.textContent = planetInfo[id].text;
      registerView(id);
      updateProgressBar();
    });
  }
});
