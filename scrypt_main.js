const sounds = {
  sun:     document.getElementById("sun_ignite"),
  mercury: document.getElementById("mercury_sound"),
  venus:   document.getElementById("venus_sound"),
  earth:   document.getElementById("earth_sound"),
  mars:    document.getElementById("mars_sound"),
  jupiter: document.getElementById("jupiter_sound"),
  saturn:  document.getElementById("saturn_sound"),
  uranus:  document.getElementById("uranus_sound"),
  neptune: document.getElementById("neptune_sound"),
  pluton:  document.getElementById("pluton_sound")
};

const clickablePlanets = {
  sun:     document.getElementById("sun_baza"),
  mercury: document.getElementById("mercury"),
  venus:   document.getElementById("venus"),
  earth:   document.getElementById("earth"),
  mars:    document.getElementById("mars"),
  jupiter: document.getElementById("jupiter"),
  saturn:  document.getElementById("saturn"),
  uranus:  document.getElementById("uranus"),
  neptune: document.getElementById("neptune"),
  pluton:  document.getElementById("pluton")
};

const infoPanel = document.getElementById("infoPanel");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");
const toggleBtn = document.getElementById("toggleBtn"); 

const planetInfo = {
  sun_baza: { title: "Сонце", text: "Сонце – це зірка середнього розміру, що становить близько 99.86% маси Сонячної системи і складається переважно з водню (близько 74% та гелію (близько 24%). " },
  mercury: { title: "Меркурій", text: "Перша планета у системі" },
  venus:   { title: "Венера",   text: "Друга планета Сонячної системи, деякі кажуть що це зла близнючка Землі" },
  earth:   { title: "Земля",    text: "Наша рідна планета" },
  mars:    { title: "Марс",     text: "Марс зі своєю горою Олімп!" },
  jupiter: { title: "Юпітер",   text: "Газовй гігант" },
  saturn:  { title: "Сатурн",   text: "Має кільце " },
  uranus:  { title: "Уран",     text: "Інакший нахил осі." },
  neptune: { title: "Нептун",   text: "Далека синя планета" },
  pluton:  { title: "Плутон",   text: "Плутон відкрив американський астроном Клайд Томбо 18 лютого 1930 року в обсерваторії Ловелла. Згодом, у 2006 року Плутон визначили як карликовою планетою" }
};

const updateToggleText = () => {
    const isCollapsed = infoPanel.classList.contains("collapsed");
    toggleBtn.textContent = isCollapsed ? '»' : '«'; 
    toggleBtn.setAttribute('aria-label', isCollapsed ? 'Розгорнути інформаційну панель' : 'Згорнути інформаційну панель');
};

if (toggleBtn && infoPanel) {
    if (window.innerWidth <= 768) {
        infoPanel.classList.add('collapsed'); 
    }
    updateToggleText(); 

    toggleBtn.addEventListener("click", () => {
        infoPanel.classList.toggle("collapsed");
        updateToggleText();
    });
}

Object.keys(planetInfo).forEach(id => {
  const planet = document.getElementById(id);
  if (planet) {
    planet.addEventListener("click", () => {
      
      if (window.innerWidth <= 768 && infoPanel.classList.contains('collapsed')) {
          infoPanel.classList.remove('collapsed');
          updateToggleText(); 
      }
      
      infoTitle.textContent = planetInfo[id].title;
      infoText.textContent = planetInfo[id].text;
      
      const sound = sounds[id];
      if (sound) {
        Object.values(sounds).forEach(s => {
          if (s) {
            s.pause();
            s.currentTime = 0;
          }
        });
        sound.currentTime = 0;
        sound.play();
      }
    });
  }
});


window.onload = function() {
  const sun = document.getElementById('sun_baza');
  
  const initialPlanetsData = [
    { id: 'mercury', radius: 45, speed: 0.0011 },
    { id: 'venus', radius: 75, speed: 0.0015 },
    { id: 'earth', radius: 100, speed: 0.0016 },
    { id: 'mars', radius: 130, speed: 0.0015 },
    { id: 'jupiter', radius: 170, speed: 0.0014 },
    { id: 'saturn', radius: 210, speed: 0.0014 },
    { id: 'uranus', radius: 250, speed: 0.0015 },
    { id: 'neptune', radius: 290, speed: 0.0012 },
    { id: 'pluton', radius: 320, speed: 0.0015 }
  ];

  function getBaseRadius() {
    const viewportMin = Math.min(window.innerWidth, window.innerHeight);
    let maxOrbitPercentage = 0.40;
    
    if (window.innerWidth <= 768) {
        maxOrbitPercentage = 0.35; 
    }

    const maxOrbitRadius = viewportMin * maxOrbitPercentage; 
    return maxOrbitRadius / 320; 
  }

  const planets = initialPlanetsData.map(p => ({
      ...p,
      el: document.getElementById(p.id),
      angle: Math.random() * Math.PI * 2,
      incl: 0.85 + Math.random() * 0.3,
      radius: p.radius * getBaseRadius()
  }));
  
  planets.forEach(p => {
    if (p.el) p.el.style.position = 'absolute';
  });

  window.addEventListener('resize', () => {
    const scaleFactor = getBaseRadius();
    
    initialPlanetsData.forEach((initial, index) => {
        planets[index].radius = initial.radius * scaleFactor;
    });
    if (window.innerWidth <= 768) {
        updateStaticPositions();
    }
    updateToggleText();
  });
  
  function getSunCenter() {
    const rect = sun.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }
  
  function updateStaticPositions() {
      const columns = 3;
      const yStep = 55;
      const cellWidth = (window.innerWidth - 20) / columns;
      
      const sunCenterCol = 1;
      
      const sunX = (sunCenterCol * cellWidth) + (cellWidth / 2); 

      const sunY = window.innerHeight * 0.15 + (sun.offsetHeight / 2); 

      sun.style.left = (sunX - sun.offsetWidth / 2) + 'px';
      sun.style.top = (sunY - sun.offsetHeight / 2) + 'px';
      
      const center = getSunCenter(); 

      const gridContainerTop = window.innerHeight * 0.33; 
      

      planets.forEach((p, index) => {
          if (!p.el) return;
          
          const w = p.el.offsetWidth;
          const h = p.el.offsetHeight;
          
          const row = Math.floor(index / columns); 
          const col = index % columns;
          
          const x = (col * cellWidth) + (cellWidth / 2);
          
          const y = gridContainerTop + (row * yStep); 

          p.el.style.left = (x - w / 2) + 'px';
          p.el.style.top = (y - h / 2) + 'px';
      });
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
      const isMobile = window.innerWidth <= 768;

      if (!isPaused) {
          if (isMobile) {
              updateStaticPositions();
          } else {
              const center = getSunCenter();
              planets.forEach(p => {
                  if (!p.el) return;
                  
                  p.angle += p.speed;
                  const x = center.x + Math.cos(p.angle) * p.radius;
                  const y = center.y + Math.sin(p.angle) * p.radius * p.incl;
                  const w = p.el.offsetWidth;
                  const h = p.el.offsetHeight;
                  p.el.style.left = (x - w / 2) + 'px';
                  p.el.style.top = (y - h / 2) + 'px';
              });
          }
      }
      requestAnimationFrame(animate);
  }
  
  if (window.innerWidth <= 768) {
      updateStaticPositions();
  }

  animate();
};