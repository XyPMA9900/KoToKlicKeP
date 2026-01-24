<script>
/* === БЛОКИРОВКА ЗУМА И СКРОЛЛА === */
document.addEventListener("touchmove", e => e.preventDefault(), { passive:false });
window.addEventListener("scroll", () => window.scrollTo(0,0));
document.addEventListener("gesturestart", e => e.preventDefault());
document.addEventListener("gesturechange", e => e.preventDefault());
document.addEventListener("gestureend", e => e.preventDefault());

/* === ЭЛЕМЕНТЫ === */
const scoreEl = document.getElementById("score");
const cat = document.getElementById("cat");
const upgradeBtn = document.getElementById("upgradeClick");
const autoBtn = document.getElementById("autoClick");

/* === СОХРАНЕНИЯ === */
let score = Number(localStorage.getItem("score")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let autoClickers = Number(localStorage.getItem("autoClickers")) || 0;

/* === СОХРАНИТЬ === */
function saveGame(){
  localStorage.setItem("score", score);
  localStorage.setItem("clickPower", clickPower);
  localStorage.setItem("autoClickers", autoClickers);
}

/* === ОБНОВИТЬ UI === */
function updateUI(){
  scoreEl.textContent = "Рыбки: " + score + " 🐟";
  upgradeBtn.textContent = `➕ +1 за клик (${10 * clickPower} 🐟)`;
  autoBtn.textContent = `🤖 Автокликер (${50 * (autoClickers + 1)} 🐟)`;
}

/* === КЛИК ПО КОТУ === */
cat.onclick = () => {
  score += clickPower;
  updateUI();
  saveGame();

  // анимация кота
  cat.textContent = "😹";
  setTimeout(() => cat.textContent = "🐱", 300);
};

/* === АПГРЕЙД КЛИКА === */
upgradeBtn.onclick = () => {
  const cost = 10 * clickPower;
  if(score >= cost){
    score -= cost;
    clickPower++;
    updateUI();
    saveGame();
  }
};

/* === АВТОКЛИКЕР === */
autoBtn.onclick = () => {
  const cost = 50 * (autoClickers + 1);
  if(score >= cost){
    score -= cost;
    autoClickers++;
    updateUI();
    saveGame();
  }
};

/* === ПАССИВНЫЙ ДОХОД === */
setInterval(() => {
  if(autoClickers > 0){
    score += autoClickers;
    updateUI();
    saveGame();
  }
}, 1000);

/* === ПЕРВЫЙ ЗАПУСК === */
updateUI();
</script>