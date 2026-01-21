const scoreEl = document.getElementById("score");
const catBtn = document.getElementById("cat");
const resetBtn = document.getElementById("reset");

const SAVE_KEY = "kotokliker_score";

// загрузка при старте
let score = Number(localStorage.getItem(SAVE_KEY)) || 0;
scoreEl.textContent = score;

// клик по коту
catBtn.onclick = () => {
  score++;
  scoreEl.textContent = score;
  localStorage.setItem(SAVE_KEY, score); // автосейв
};

// сброс
resetBtn.onclick = () => {
  if (confirm("Точно сбросить прогресс?")) {
    score = 0;
    scoreEl.textContent = score;
    localStorage.setItem(SAVE_KEY, score);
  }
};

// анти-зум
document.addEventListener("dblclick", e => {
  e.preventDefault();
});
