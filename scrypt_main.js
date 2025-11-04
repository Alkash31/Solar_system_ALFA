  const sun = document.getElementById("sun_baza");
  const sound = document.getElementById("sun_ignite");

  sun.addEventListener("click", () => {
    sound.currentTime = 0;
    sound.play();
  });
