/* =============================================
   BOREDOM BUSTER - App Logic
   ============================================= */

// ---- Data ----
const IDEAS = {
  outdoor: [
    { text: "Build an epic blanket fort outside", emoji: "🏕️" },
    { text: "Have a water balloon fight", emoji: "🎈" },
    { text: "Go on a nature scavenger hunt", emoji: "🔍" },
    { text: "Set up an obstacle course in the yard", emoji: "🏃" },
    { text: "Have a bike race around the block", emoji: "🚲" },
    { text: "Cloud watching - find funny shapes", emoji: "☁️" },
    { text: "Sidewalk chalk art contest", emoji: "🎨" },
    { text: "Play flashlight tag when it gets dark", emoji: "🔦" },
    { text: "Build a stick bridge over a puddle", emoji: "🌉" },
    { text: "Start a neighborhood lemonade stand", emoji: "🍋" }
  ],
  creative: [
    { text: "Draw a comic strip about your day", emoji: "📝" },
    { text: "Build something awesome with cardboard", emoji: "📦" },
    { text: "Make a stop-motion video with toys", emoji: "🎬" },
    { text: "Design your own board game", emoji: "🎲" },
    { text: "Write a short song or rap", emoji: "🎵" },
    { text: "Make friendship bracelets", emoji: "📿" },
    { text: "Create a secret code language", emoji: "🔐" },
    { text: "Origami challenge - make 5 animals", emoji: "🦢" },
    { text: "Paint rocks and hide them around town", emoji: "🪨" },
    { text: "Build the tallest tower with random stuff", emoji: "🗼" }
  ],
  games: [
    { text: "Invent a brand new card game", emoji: "🃏" },
    { text: "Ultimate hide and seek championship", emoji: "🙈" },
    { text: "Indoor bowling with water bottles", emoji: "🎳" },
    { text: "Nerf battle royale", emoji: "🔫" },
    { text: "Paper airplane distance contest", emoji: "✈️" },
    { text: "Minute-to-win-it challenges", emoji: "⏱️" },
    { text: "Floor is lava - furniture parkour", emoji: "🌋" },
    { text: "Balloon volleyball (don't let it touch the ground!)", emoji: "🏐" },
    { text: "Speed puzzle race", emoji: "🧩" },
    { text: "Build a marble run from household stuff", emoji: "🔮" }
  ],
  funny: [
    { text: "Talk in a funny accent for 10 minutes", emoji: "🗣️" },
    { text: "Try to make someone laugh without talking", emoji: "🤐" },
    { text: "Do everything backwards for 5 minutes", emoji: "🔄" },
    { text: "Impression contest - who's the best?", emoji: "🎭" },
    { text: "Eat a snack with chopsticks only", emoji: "🥢" },
    { text: "Tell the worst jokes you can think of", emoji: "😂" },
    { text: "Walk like different animals for a minute each", emoji: "🐧" },
    { text: "Try to juggle (anything counts!)", emoji: "🤹" },
    { text: "Speak only in questions for 5 minutes", emoji: "❓" },
    { text: "Make the funniest face contest - take photos!", emoji: "🤪" }
  ]
};

const CATEGORY_META = {
  outdoor: { name: "Outdoor", icon: "🌳", color: "#39ff14" },
  creative: { name: "Creative", icon: "🎨", color: "#ff00e5" },
  games: { name: "Games", icon: "🎮", color: "#00f0ff" },
  funny: { name: "Funny", icon: "😂", color: "#ff6b00" }
};

const ACHIEVEMENTS = [
  { id: "first_spin", name: "First Spin!", desc: "Spin the wheel for the first time", icon: "⭐", target: 1, type: "spins" },
  { id: "spin_10", name: "Getting Started", desc: "Spin the wheel 10 times", icon: "🔥", target: 10, type: "spins" },
  { id: "spin_50", name: "Boredom Fighter", desc: "Spin the wheel 50 times", icon: "💪", target: 50, type: "spins" },
  { id: "spin_100", name: "Boredom Buster!", desc: "Spin the wheel 100 times", icon: "🏆", target: 100, type: "spins" },
  { id: "cat_explorer", name: "Explorer", desc: "Try all 4 categories", icon: "🧭", target: 4, type: "categories" },
  { id: "master_outdoor", name: "Nature Pro", desc: "10 outdoor spins", icon: "🌲", target: 10, type: "cat_outdoor" },
  { id: "master_creative", name: "Creative Genius", desc: "10 creative spins", icon: "🖌️", target: 10, type: "cat_creative" },
  { id: "master_games", name: "Game Master", desc: "10 game spins", icon: "🕹️", target: 10, type: "cat_games" },
  { id: "master_funny", name: "Comedy King", desc: "10 funny spins", icon: "👑", target: 10, type: "cat_funny" },
  { id: "chest_opener", name: "Treasure Hunter", desc: "Open your first chest", icon: "🗝️", target: 1, type: "chests_opened" }
];

const CHEST_REWARDS = [
  { type: "idea", text: "Secret: Build a time capsule and bury it", emoji: "⏳", label: "Secret Idea Unlocked!" },
  { type: "idea", text: "Secret: Create a treasure map of your house", emoji: "🗺️", label: "Secret Idea Unlocked!" },
  { type: "idea", text: "Secret: Make a movie trailer for your life", emoji: "🎥", label: "Secret Idea Unlocked!" },
  { type: "icon", text: "Flame Icon", emoji: "🔥", label: "New Icon Unlocked!" },
  { type: "icon", text: "Lightning Icon", emoji: "⚡", label: "New Icon Unlocked!" },
  { type: "icon", text: "Crown Icon", emoji: "👑", label: "New Icon Unlocked!" }
];

// ---- State ----
let state = loadState();

function defaultState() {
  return {
    totalSpins: 0,
    categorySpins: { outdoor: 0, creative: 0, games: 0, funny: 0 },
    categoriesUsed: [],
    achievementsUnlocked: [],
    chestsAvailable: 0,
    chestsOpened: 0,
    unlockedRewards: [],
    isPremium: false,
    selectedCategory: null
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem("boredomBusterState");
    if (saved) return { ...defaultState(), ...JSON.parse(saved) };
  } catch (e) { /* ignore */ }
  return defaultState();
}

function saveState() {
  localStorage.setItem("boredomBusterState", JSON.stringify(state));
}

// ---- Navigation ----
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
  const navBtn = document.querySelector(`[data-screen="${screenId}"]`);
  if (navBtn) navBtn.classList.add("active");

  if (screenId === "screen-achievements") renderAchievements();
  if (screenId === "screen-home") renderStats();
}

// ---- Wheel Drawing ----
let wheelCanvas, wheelCtx, currentRotation = 0, isSpinning = false;

function initWheel() {
  wheelCanvas = document.getElementById("wheel-canvas");
  wheelCtx = wheelCanvas.getContext("2d");
  wheelCanvas.width = 280 * 2;
  wheelCanvas.height = 280 * 2;
  wheelCtx.scale(2, 2); // retina
  drawWheel();
}

function drawWheel() {
  const cat = state.selectedCategory;
  if (!cat) return;

  const ideas = IDEAS[cat];
  const n = ideas.length;
  const cx = 140, cy = 140, r = 130;
  const meta = CATEGORY_META[cat];

  wheelCtx.clearRect(0, 0, 280, 280);
  wheelCtx.save();
  wheelCtx.translate(cx, cy);
  wheelCtx.rotate((currentRotation * Math.PI) / 180);
  wheelCtx.translate(-cx, -cy);

  for (let i = 0; i < n; i++) {
    const startAngle = (i * 2 * Math.PI) / n - Math.PI / 2;
    const endAngle = ((i + 1) * 2 * Math.PI) / n - Math.PI / 2;

    // Slice
    wheelCtx.beginPath();
    wheelCtx.moveTo(cx, cy);
    wheelCtx.arc(cx, cy, r, startAngle, endAngle);
    wheelCtx.closePath();
    const lightness = i % 2 === 0 ? 18 : 24;
    wheelCtx.fillStyle = `hsl(${(i * 36) % 360}, 40%, ${lightness}%)`;
    wheelCtx.fill();
    wheelCtx.strokeStyle = "rgba(255,255,255,0.08)";
    wheelCtx.lineWidth = 1;
    wheelCtx.stroke();

    // Text
    const midAngle = (startAngle + endAngle) / 2;
    wheelCtx.save();
    wheelCtx.translate(cx, cy);
    wheelCtx.rotate(midAngle);
    wheelCtx.fillStyle = "#fff";
    wheelCtx.font = "bold 9px sans-serif";
    wheelCtx.textAlign = "center";
    wheelCtx.textBaseline = "middle";

    // Emoji
    wheelCtx.font = "16px sans-serif";
    wheelCtx.fillText(ideas[i].emoji, r * 0.55, 0);

    wheelCtx.restore();
  }

  // Center circle
  wheelCtx.beginPath();
  wheelCtx.arc(cx, cy, 28, 0, Math.PI * 2);
  wheelCtx.fillStyle = "#0a0a1a";
  wheelCtx.fill();
  wheelCtx.strokeStyle = meta.color;
  wheelCtx.lineWidth = 2;
  wheelCtx.stroke();

  // Center emoji
  wheelCtx.font = "22px sans-serif";
  wheelCtx.textAlign = "center";
  wheelCtx.textBaseline = "middle";
  wheelCtx.fillText(meta.icon, cx, cy);

  // Outer ring glow
  wheelCtx.beginPath();
  wheelCtx.arc(cx, cy, r, 0, Math.PI * 2);
  wheelCtx.strokeStyle = meta.color;
  wheelCtx.lineWidth = 2;
  wheelCtx.stroke();

  wheelCtx.restore();
}

// ---- Spin Logic ----
function spinWheel() {
  if (isSpinning || !state.selectedCategory) return;
  isSpinning = true;
  document.getElementById("spin-btn").disabled = true;

  const ideas = IDEAS[state.selectedCategory];
  const n = ideas.length;
  const sliceAngle = 360 / n;

  // Pick a random result
  const winIndex = Math.floor(Math.random() * n);

  // Calculate target rotation: multiple full spins + land on winning slice
  // Pointer is at top (270 degrees in standard math), we need the winning slice there
  const targetSliceCenter = winIndex * sliceAngle + sliceAngle / 2;
  const fullSpins = 5 + Math.floor(Math.random() * 3);
  const targetRotation = fullSpins * 360 + (360 - targetSliceCenter);

  const startRotation = currentRotation % 360;
  const totalSpin = targetRotation;
  const duration = 4000;
  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    currentRotation = startRotation + totalSpin * eased;

    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      currentRotation = currentRotation % 360;
      isSpinning = false;
      document.getElementById("spin-btn").disabled = false;
      onSpinComplete(ideas[winIndex]);
    }
  }

  requestAnimationFrame(animate);
}

function onSpinComplete(idea) {
  // Update state
  state.totalSpins++;
  state.categorySpins[state.selectedCategory]++;
  if (!state.categoriesUsed.includes(state.selectedCategory)) {
    state.categoriesUsed.push(state.selectedCategory);
  }
  saveState();

  // Check achievements
  checkAchievements();

  // Show result
  showResult(idea);
}

function showResult(idea) {
  const overlay = document.getElementById("result-overlay");
  document.getElementById("result-emoji").textContent = idea.emoji;
  document.getElementById("result-text").textContent = idea.text;
  document.getElementById("result-category").textContent =
    CATEGORY_META[state.selectedCategory].name + " Activity";
  overlay.classList.add("show");
}

function closeResult() {
  document.getElementById("result-overlay").classList.remove("show");
}

// ---- Category Selection ----
function selectCategory(cat) {
  state.selectedCategory = cat;
  saveState();
  showScreen("screen-spin");
  updateSpinScreen();
  drawWheel();
}

function updateSpinScreen() {
  const cat = state.selectedCategory;
  if (!cat) return;
  const meta = CATEGORY_META[cat];
  document.getElementById("selected-cat-name").textContent = meta.name;
  document.getElementById("selected-cat-icon").textContent = meta.icon;
}

// ---- Achievements ----
function checkAchievements() {
  let newUnlocks = [];

  ACHIEVEMENTS.forEach(ach => {
    if (state.achievementsUnlocked.includes(ach.id)) return;

    let current = 0;
    switch (ach.type) {
      case "spins":
        current = state.totalSpins;
        break;
      case "categories":
        current = state.categoriesUsed.length;
        break;
      case "cat_outdoor":
        current = state.categorySpins.outdoor;
        break;
      case "cat_creative":
        current = state.categorySpins.creative;
        break;
      case "cat_games":
        current = state.categorySpins.games;
        break;
      case "cat_funny":
        current = state.categorySpins.funny;
        break;
      case "chests_opened":
        current = state.chestsOpened;
        break;
    }

    if (current >= ach.target) {
      state.achievementsUnlocked.push(ach.id);
      state.chestsAvailable++;
      newUnlocks.push(ach);
    }
  });

  if (newUnlocks.length > 0) {
    saveState();
    newUnlocks.forEach((ach, i) => {
      setTimeout(() => showToast(`${ach.icon} Achievement: ${ach.name}!`), i * 1500);
    });
  }
}

function renderAchievements() {
  const grid = document.getElementById("achievements-grid");
  grid.innerHTML = "";

  ACHIEVEMENTS.forEach(ach => {
    const unlocked = state.achievementsUnlocked.includes(ach.id);
    let current = 0;
    switch (ach.type) {
      case "spins": current = state.totalSpins; break;
      case "categories": current = state.categoriesUsed.length; break;
      case "cat_outdoor": current = state.categorySpins.outdoor; break;
      case "cat_creative": current = state.categorySpins.creative; break;
      case "cat_games": current = state.categorySpins.games; break;
      case "cat_funny": current = state.categorySpins.funny; break;
      case "chests_opened": current = state.chestsOpened; break;
    }

    const progress = Math.min(current / ach.target, 1) * 100;

    const card = document.createElement("div");
    card.className = `achievement-card ${unlocked ? "unlocked" : "locked"}`;
    card.innerHTML = `
      <span class="ach-icon">${ach.icon}</span>
      <div class="ach-name">${ach.name}</div>
      <div class="ach-desc">${ach.desc}</div>
      <div class="ach-progress"><div class="ach-progress-fill" style="width:${progress}%"></div></div>
    `;
    grid.appendChild(card);
  });

  // Chests
  renderChests();
}

function renderChests() {
  const list = document.getElementById("chest-list");
  if (!list) return;
  list.innerHTML = "";

  const available = state.chestsAvailable - state.chestsOpened;
  const chestCount = document.getElementById("chest-count");
  if (chestCount) chestCount.textContent = available;

  if (available <= 0) {
    list.innerHTML = `<div style="color:var(--text-secondary);font-size:0.85rem;text-align:center;padding:20px;">
      Earn achievements to unlock chests!
    </div>`;
    return;
  }

  for (let i = 0; i < available; i++) {
    const item = document.createElement("div");
    item.className = "chest-item";
    item.innerHTML = `
      <span class="chest-icon">🎁</span>
      <div class="chest-info">
        <div class="chest-name">Mystery Chest</div>
        <div class="chest-desc">Tap to open and claim your reward!</div>
      </div>
      <span class="chest-action">OPEN</span>
    `;
    item.addEventListener("click", () => openChest());
    list.appendChild(item);
  }
}

function openChest() {
  if (state.chestsAvailable - state.chestsOpened <= 0) return;

  // Pick a random reward not already owned
  const available = CHEST_REWARDS.filter(r => !state.unlockedRewards.includes(r.text));
  const reward = available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : CHEST_REWARDS[Math.floor(Math.random() * CHEST_REWARDS.length)];

  state.chestsOpened++;
  if (!state.unlockedRewards.includes(reward.text)) {
    state.unlockedRewards.push(reward.text);
  }
  saveState();
  checkAchievements();

  // Show reveal
  const overlay = document.getElementById("chest-overlay");
  document.getElementById("chest-reward-icon").textContent = reward.emoji;
  document.getElementById("chest-reward-label").textContent = reward.label;
  document.getElementById("chest-reward-desc").textContent = reward.text;
  overlay.classList.add("show");

  // Re-render chests list
  setTimeout(() => renderChests(), 500);
}

function closeChest() {
  document.getElementById("chest-overlay").classList.remove("show");
}

// ---- Stats ----
function renderStats() {
  const el = (id) => document.getElementById(id);
  el("stat-spins").textContent = state.totalSpins;
  el("stat-achievements").textContent = state.achievementsUnlocked.length;
  el("stat-chests").textContent = state.chestsOpened;
}

// ---- Toast ----
function showToast(message) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-text").textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ---- PWA Install Prompt ----
let deferredPrompt = null;

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches
    || window.navigator.standalone === true;
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function showInstallBanner() {
  if (isStandalone()) return; // already installed
  if (localStorage.getItem("installDismissed")) return;

  const banner = document.getElementById("install-banner");
  const instructions = document.getElementById("install-instructions");
  const installBtn = document.getElementById("install-btn");

  if (isIOS()) {
    instructions.innerHTML = 'Tap <strong>Share</strong> ↗ then <strong>"Add to Home Screen"</strong>';
    installBtn.textContent = "Got it";
    installBtn.addEventListener("click", () => {
      banner.classList.remove("show");
      localStorage.setItem("installDismissed", "1");
    });
  } else if (deferredPrompt) {
    instructions.textContent = "Add to your home screen for the full experience";
    installBtn.addEventListener("click", () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
        banner.classList.remove("show");
      });
    });
  } else {
    // Fallback for browsers without beforeinstallprompt
    instructions.innerHTML = 'Use your browser menu to <strong>"Add to Home Screen"</strong>';
    installBtn.textContent = "Got it";
    installBtn.addEventListener("click", () => {
      banner.classList.remove("show");
      localStorage.setItem("installDismissed", "1");
    });
  }

  document.getElementById("install-dismiss").addEventListener("click", () => {
    banner.classList.remove("show");
    localStorage.setItem("installDismissed", "1");
  });

  banner.classList.add("show");
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallBanner();
});

window.addEventListener("appinstalled", () => {
  document.getElementById("install-banner").classList.remove("show");
  showToast("App installed! You're all set!");
});

// ---- Init ----
function init() {
  // Nav
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => showScreen(btn.dataset.screen));
  });

  // Category cards
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => selectCategory(card.dataset.category));
  });

  // Spin
  document.getElementById("spin-btn").addEventListener("click", spinWheel);

  // Back to categories
  document.getElementById("back-to-cats").addEventListener("click", () => showScreen("screen-home"));

  // Result overlay
  document.getElementById("result-spin-again").addEventListener("click", () => {
    closeResult();
    setTimeout(spinWheel, 300);
  });
  document.getElementById("result-close").addEventListener("click", closeResult);

  // Chest overlay
  document.getElementById("chest-close").addEventListener("click", closeChest);

  // Init wheel
  initWheel();

  // Show home
  showScreen("screen-home");
  renderStats();

  // Show install banner for iOS or fallback (Android fires beforeinstallprompt instead)
  if (!isStandalone() && (isIOS() || !("BeforeInstallPromptEvent" in window))) {
    setTimeout(showInstallBanner, 1500);
  }
}

document.addEventListener("DOMContentLoaded", init);
