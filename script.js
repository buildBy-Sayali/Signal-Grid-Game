

const gridEl = document.getElementById("grid");
const statusText = document.getElementById("status-text");
const levelEl = document.getElementById("level");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const bestEl = document.getElementById("best");

const startArt = document.getElementById("start-art");
const playView = document.getElementById("play-view");
const roundPage = document.getElementById("round-page");
const gameoverPage = document.getElementById("gameover-page");

const praisePopup = document.getElementById("praise-popup");
const completedRoundEl = document.getElementById("completed-round");
const roundScoreEl = document.getElementById("round-score");
const nextLevelLabelEl = document.getElementById("next-level-label");

const finalScoreEl = document.getElementById("final-score");
const finalBestEl = document.getElementById("final-best");

const startBtn = document.getElementById("start-btn");
const nextRoundBtn = document.getElementById("next-round-btn");
const playAgainBtn = document.getElementById("play-again-btn");

const praiseMessages = [
  "Congrats!",
  "Wonderful!",
  "Awesome Job!",
  "Sharp Memory!",
  "Superb!"
];

let level = 1;
let score = 0;
let lives = 3;
let bestScore = Number(localStorage.getItem("signalGridBest")) || 0;
let targetTiles = new Set();
let foundTiles = new Set();
let canClick = false;

bestEl.textContent = bestScore;

function beginNewGame() {
  level = 1;
  score = 0;
  lives = 3;
  updateHUD();

  startArt.classList.add("hidden");
  roundPage.classList.add("hidden");
  gameoverPage.classList.add("hidden");
  startBtn.classList.add("hidden");
  playView.classList.remove("hidden");

  startRound();
}

startBtn.addEventListener("click", beginNewGame);
playAgainBtn.addEventListener("click", beginNewGame);

nextRoundBtn.addEventListener("click", () => {
  roundPage.classList.add("hidden");
  playView.classList.remove("hidden");
  startRound();
});

function updateHUD() {
  levelEl.textContent = level;
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("signalGridBest", bestScore);
  }
  bestEl.textContent = bestScore;
}

function getGridConfig(currentLevel) {
  if (currentLevel <= 2) return { size: 3, count: 3 + currentLevel };
  if (currentLevel <= 5) return { size: 4, count: 4 + currentLevel };
  return { size: 5, count: Math.min(14, 5 + currentLevel) };
}

function startRound() {
  canClick = false;
  foundTiles.clear();
  targetTiles.clear();

  const { size, count } = getGridConfig(level);
  const totalTiles = size * size;

  while (targetTiles.size < count) {
    targetTiles.add(Math.floor(Math.random() * totalTiles));
  }

  gridEl.innerHTML = "";
  gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.index = i;
    if (targetTiles.has(i)) tile.classList.add("preview");
    tile.addEventListener("click", () => handleTileClick(tile, i));
    gridEl.appendChild(tile);
  }

  statusText.textContent = "Watch closely...";

  setTimeout(() => {
    document.querySelectorAll(".tile").forEach((t) => t.classList.remove("preview"));
    statusText.textContent = `Find all ${targetTiles.size} tiles!`;
    canClick = true;
  }, 1400);
}

function showRoundSummary() {
  const clearedLevel = level;
  level++;
  updateHUD();

  playView.classList.add("hidden");
  gameoverPage.classList.add("hidden");
  roundPage.classList.remove("hidden");

  const randomPraise = praiseMessages[(clearedLevel - 1) % praiseMessages.length];
  praisePopup.textContent = randomPraise;
  praisePopup.style.animation = "none";
  void praisePopup.offsetWidth;
  praisePopup.style.animation = "";

  completedRoundEl.textContent = clearedLevel;
  roundScoreEl.textContent = score;
  nextLevelLabelEl.textContent = level;
  statusText.textContent = `Round ${clearedLevel} completed!`;
}

function showGameOverScreen() {
  revealMissed();
  statusText.textContent = "Game Over!";

  setTimeout(() => {
    playView.classList.add("hidden");
    roundPage.classList.add("hidden");
    startBtn.classList.add("hidden");
    gameoverPage.classList.remove("hidden");

    finalScoreEl.textContent = score;
    finalBestEl.textContent = bestScore;
  }, 650);
}

function handleTileClick(tile, index) {
  if (!canClick || foundTiles.has(index) || tile.classList.contains("wrong")) return;

  if (targetTiles.has(index)) {
    tile.classList.add("correct");
    foundTiles.add(index);
    score += 10;
    updateHUD();

    if (foundTiles.size === targetTiles.size) {
      canClick = false;
      statusText.textContent = "Pattern matched!";
      setTimeout(showRoundSummary, 550);
    }
  } else {
    tile.classList.add("wrong");
    lives--;
    updateHUD();

    if (lives <= 0) {
      canClick = false;
      showGameOverScreen();
    } else {
      statusText.textContent = `Wrong tile! ${lives} ${lives === 1 ? "life" : "lives"} left.`;
    }
  }
}

function revealMissed() {
  document.querySelectorAll(".tile").forEach((tile, idx) => {
    if (targetTiles.has(idx) && !foundTiles.has(idx)) {
      tile.classList.add("preview");
    }
  });
}