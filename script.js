const scoreEl = document.getElementById("score");
const catBtn = document.getElementById("cat");
const resetBtn = document.getElementById("reset");

// ключ сохранения
const SAVE_KEY = "kotokliker_score";

// загрузка
let score = Number(localStorage.getItem(SAVE_KEY)) || 0;
scoreEl.textContent = score;

// клик
catBtn.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;
  localStorage.setItem(SAVE_KEY, score);
});

// сброс
resetBtn.addEventListener("click", () => {
  if (confirm("Точно сбросить прогресс?")) {
    score = 0;
    scoreEl.textContent = score;
    localStorage.setItem(SAVE_KEY, score); // важно: записываем 0
  }
});

// анти-зум
document.addEventListener("dblclick", e => {
  e.preventDefault();
});
