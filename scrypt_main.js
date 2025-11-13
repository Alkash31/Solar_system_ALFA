const sun = document.getElementById("sun_baza");
  const sound_sun = document.getElementById("sun_ignite");

  sun.addEventListener("click", () => {
    sound_sun.currentTime = 0;
    sound_sun.play();
  });
  
  const mercury = document.getElementById("mercury");
  const sound_mercury = document.getElementById("");

  mercury.addEventListener("click", () => {
    sound_mercury.currentTime = 0;
    sound_mercury.play();
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
  
  const saturn = document.getElementById("saturn");
  const sound_saturn = document.getElementById("");

  saturn.addEventListener("click", () => {
    sound_saturn.currentTime = 0;
    sound_saturn.play();
  });
  
  const uranus = document.getElementById("uranus");
  const sound_uranus = document.getElementById("");

  uranus.addEventListener("click", () => {
    sound_uranus.currentTime = 0;
    sound_uranus.play();
  });
  
  const neptune = document.getElementById("neptune");
  const sound_neptune = document.getElementById("");

  neptune.addEventListener("click", () => {
    sound_neptune.currentTime = 0;
    sound_neptune.play();
  });
  
  const pluton = document.getElementById("pluton");
  const sound_pluton = document.getElementById("");

  pluton.addEventListener("click", () => {
    sound_pluton.currentTime = 0;
    sound_pluton.play();
  });
  
window.onload = function() {
  const sun = document.getElementById('sun_baza');

  // Масив планет із меншими швидкостями обертання
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

  // рандомні місця початку анімації планет
  planets.forEach(p => {
    p.el = document.getElementById(p.id);
    p.angle = Math.random() * Math.PI * 2;
    p.incl = 0.85 + Math.random() * 0.3;

    if (p.el) p.el.style.position = 'absolute';
  });

  // Коорди сонця
  function getSunCenter() {
    const rect = sun.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  // Основна функція анімації
  function animate() {
    const center = getSunCenter();

    planets.forEach(p => {
      // оновлює кут
      p.angle += p.speed;

      // щоб зробити еліптичну орбіту
      const x = center.x + Math.cos(p.angle) * p.radius;
      const y = center.y + Math.sin(p.angle) * p.radius * p.incl;

      // розміщення планети
      const w = (p.el && p.el.offsetWidth) ? p.el.offsetWidth : 20;
      const h = (p.el && p.el.offsetHeight) ? p.el.offsetHeight : 20;

      if (p.el) {
        p.el.style.left = (x - w / 2) + 'px';
        p.el.style.top = (y - h / 2) + 'px';
      }
    });

    requestAnimationFrame(animate);
  }

  animate(); // запуск анімації
};
