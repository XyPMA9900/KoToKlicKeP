const scoreEl = document.getElementById("score");
const catBtn = document.getElementById("cat");
const resetBtn = document.getElementById("reset");

const openShopBtn = document.getElementById("openShop");
const closeShopBtn = document.getElementById("closeShop");
const shopDiv = document.getElementById("shop");

const upgradeBtn = document.getElementById("upgradeClick");
const autoBtn = document.getElementById("autoClick");
const boostBtn = document.getElementById("boostBtn");
const critBtn = document.getElementById("critBtn");

const clickLevelEl = document.getElementById("clickLevel");
const autoCountEl = document.getElementById("autoCount");
const boostPriceEl = document.getElementById("boostPrice");
const critStatusEl = document.getElementById("critStatus");

const SAVE_KEY = "kotokliker_save";

let save = JSON.parse(localStorage.getItem(SAVE_KEY)) || {
  score: 0,
  clickPower: 1,
  autoClickers: 0,
  boostPrice: 100,
  critBought: false,
  boostActive: false
};

let { score, clickPower, autoClickers, boostPrice, critBought, boostActive } = save;

updateUI();

function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify({
    score, clickPower, autoClickers,
    boostPrice, critBought, boostActive
  }));
}

function updateUI() {
  scoreEl.textContent = score;
  clickLevelEl.textContent = clickPower;
  autoCountEl.textContent = autoClickers;
  boostPriceEl.textContent = boostPrice;
  critStatusEl.textContent = critBought ? "Куплен" : "Не куплен";

  // обновляем текст кнопки буста
  boostBtn.textContent = `⚡ Буст x2 (${boostPrice} 🐟)`;

  // обновляем цену апгрейда клика
  const clickCost = 10 * clickPower * clickPower;
  upgradeBtn.textContent = `➕ +1 за клик (${clickCost} 🐟)`;
}

// клик по коту
catBtn.onclick = () => {
  let power = clickPower;
  if (boostActive) power *= 2;
  if (critBought && Math.random() < 0.02) power *= 12;

  score += power;
  updateUI();
  saveGame();
};

// открыть / закрыть магазин
openShopBtn.onclick = () => shopDiv.classList.add("show");
closeShopBtn.onclick = () => shopDiv.classList.remove("show");

// апгрейд клика (нормальная цена)
upgradeBtn.onclick = () => {
  const cost = 10 * clickPower * clickPower;
  if (score >= cost) {
    score -= cost;
    clickPower++;
    updateUI();
    saveGame();
  } else alert("Не хватает рыб!");
};

// автокликер
autoBtn.onclick = () => {
  const cost = 50 * (autoClickers + 1);
  if (score >= cost) {
    score -= cost;
    autoClickers++;
    updateUI();
    saveGame();
  } else alert("Не хватает рыб!");
};

// буст x2 (исправленный)
boostBtn.onclick = () => {
  if (score >= boostPrice) {
    score -= boostPrice;
    boostActive = true;

    boostPrice = Math.round(boostPrice * 2.25);

    updateUI();
    saveGame();

    setTimeout(() => {
      boostActive = false;
      saveGame();
    }, 30000);
  } else {
    alert("Не хватает рыб!");
  }
};

// крит
critBtn.onclick = () => {
  if (critBought) return alert("Уже куплено!");
  if (score >= 2000) {
    score -= 2000;
    critBought = true;
    updateUI();
    saveGame();
  } else alert("Не хватает рыб!");
};

// автоклик раз в секунду
setInterval(() => {
  if (autoClickers > 0) {
    score += autoClickers;
    updateUI();
    saveGame();
  }
}, 1000);

// сброс
resetBtn.onclick = () => {
  if (confirm("Точно сбросить прогресс?")) {
    score = 0;
    clickPower = 1;
    autoClickers = 0;
    boostPrice = 100;
    critBought = false;
    boostActive = false;
    updateUI();
    saveGame();
  }
};

document.addEventListener("dblclick", e => e.preventDefault());
