document.addEventListener("DOMContentLoaded", () => {
  const CONFIG = {
    localGamePath: "./game/index.html",
    revealDelay: 2200,
    transitionFadeOutDelay: 3200
  };

  const launchBtn = document.getElementById("launchBtn");
  const updateBtn = document.getElementById("updateBtn");
  const settingsBtn = document.getElementById("settingsBtn");
  const launcher = document.getElementById("launcher");
  const statusText = document.getElementById("statusText");
  const settingsPanel = document.getElementById("settingsPanel");
  const updatePanel = document.getElementById("updatePanel");
  const transition = document.getElementById("transition");
  const gameScreen = document.getElementById("gameScreen");
  const gameFrame = document.getElementById("gameFrame");
  const gamePathText = document.getElementById("gamePathText");
  const closeButtons = document.querySelectorAll("[data-close]");

  let isStarting = false;

  function setStatus(text) {
    if (statusText) statusText.textContent = text;
  }

  function closePanels() {
    [settingsPanel, updatePanel].forEach((panel) => {
      if (!panel) return;
      panel.classList.remove("show");
      panel.setAttribute("aria-hidden", "true");
    });
  }

  function openPanel(panel) {
    closePanels();
    if (!panel) return;
    panel.classList.add("show");
    panel.setAttribute("aria-hidden", "false");
  }

  function openSettings() {
    openPanel(settingsPanel);
    setStatus("SETTINGS PANEL OPENED");
  }

  function openUpdates() {
    openPanel(updatePanel);
    setStatus("NO NEW PATCHES DETECTED");
  }

  function resetLaunchState(message) {
    if (transition) transition.classList.remove("active");
    if (gameScreen) gameScreen.classList.remove("show");
    if (launcher) launcher.classList.remove("hide");
    isStarting = false;
    setStatus(message || "SYSTEM READY");
  }

  function startGame() {
    if (isStarting) return;
    isStarting = true;

    closePanels();
    setStatus("DARKENING THE FIELD...");
    transition.classList.add("active");

    setTimeout(() => {
      setStatus("THE RIFT IS OPENING...");
    }, 900);

    setTimeout(() => {
      launcher.classList.add("hide");
      gameFrame.src = CONFIG.localGamePath;
      gameScreen.classList.add("show");
      setStatus("LOADING IMPORTED BUILD...");
    }, CONFIG.revealDelay);

    setTimeout(() => {
      transition.classList.remove("active");
      setStatus("GAME STARTED");
    }, CONFIG.transitionFadeOutDelay);
  }

  if (gameFrame) {
    gameFrame.addEventListener("load", () => {
      setStatus("GAME STARTED");
    });
  }

  if (launchBtn) launchBtn.addEventListener("click", startGame);
  if (updateBtn) updateBtn.addEventListener("click", openUpdates);
  if (settingsBtn) settingsBtn.addEventListener("click", openSettings);

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closePanels();
      setStatus("SYSTEM READY");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePanels();
      setStatus("SYSTEM READY");
    }
  });

  if (gamePathText) {
    gamePathText.textContent = CONFIG.localGamePath;
  }

  window.addEventListener("error", () => {
    setStatus("SCRIPT ERROR - CHECK FILE PATHS");
  });
});
