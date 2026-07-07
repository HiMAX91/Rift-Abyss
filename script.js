const CONFIG = {
  // 可選：turbowarp_url / local_html / demo
  gameMode: "turbowarp_url",

  // 換成你們真正的 TurboWarp 專案網址
  turbowarpProjectUrl: "https://turbowarp.org/123456789",

  // 之後如果搬進自己的專案，可以切到本地頁面
  localGameUrl: "./game/index.html",

  launchDelay: 1800
};

const statusText = document.getElementById("statusText");
const launchBtn = document.getElementById("launchBtn");
const updateBtn = document.getElementById("updateBtn");
const settingsBtn = document.getElementById("settingsBtn");
const updatePanel = document.getElementById("updatePanel");
const settingsPanel = document.getElementById("settingsPanel");
const launchOverlay = document.getElementById("launchOverlay");
const modeValue = document.getElementById("modeValue");
const turbowarpUrlText = document.getElementById("turbowarpUrlText");

let isLaunching = false;

function setStatus(message) {
  statusText.textContent = message;
}

function closeAllPanels() {
  updatePanel.classList.remove("show");
  settingsPanel.classList.remove("show");
  updatePanel.setAttribute("aria-hidden", "true");
  settingsPanel.setAttribute("aria-hidden", "true");
}

function openPanel(panel) {
  closeAllPanels();
  panel.classList.add("show");
  panel.setAttribute("aria-hidden", "false");
}

function syncLauncherConfig() {
  if (CONFIG.gameMode === "turbowarp_url") {
    modeValue.textContent = "TurboWarp URL";
  } else if (CONFIG.gameMode === "local_html") {
    modeValue.textContent = "Local HTML";
  } else {
    modeValue.textContent = "Demo";
  }

  turbowarpUrlText.textContent = CONFIG.turbowarpProjectUrl;
}

function openUpdates() {
  openPanel(updatePanel);
  setStatus("UPDATE PANEL OPENED");
}

function openSettings() {
  openPanel(settingsPanel);
  setStatus("SETTINGS PANEL OPENED");
}

function startGame() {
  if (isLaunching) return;
  isLaunching = true;

  closeAllPanels();
  setStatus("OPENING THE RIFT...");
  launchOverlay.classList.add("show");

  setTimeout(() => {
    if (CONFIG.gameMode === "turbowarp_url") {
      window.location.href = CONFIG.turbowarpProjectUrl;
      return;
    }

    if (CONFIG.gameMode === "local_html") {
      window.location.href = CONFIG.localGameUrl;
      return;
    }

    setStatus("DEMO MODE: TURBOWARP LINK NOT SET");
    launchOverlay.classList.remove("show");
    isLaunching = false;
  }, CONFIG.launchDelay);
}

launchBtn.addEventListener("click", startGame);
updateBtn.addEventListener("click", openUpdates);
settingsBtn.addEventListener("click", openSettings);

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    closeAllPanels();
    setStatus("SYSTEM READY");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllPanels();
    setStatus("SYSTEM READY");
  }
});

syncLauncherConfig();
