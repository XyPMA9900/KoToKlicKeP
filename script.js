let score = 0;

const scoreEl = document.getElementById("score");
const catBtn = document.getElementById("cat");
const resetBtn = document.getElementById("reset");

// загрузка
if (localStorage.getItem("kotokliker_save")) {
  score = parseInt(localStorage.getItem("kotokliker_save"));
  scoreEl.textContent = score;
}

// клик
catBtn.onclick = () => {
  score++;
  scoreEl.textContent = score;
  localStorage.setItem("kotokliker_save", score);
};

// сброс
resetBtn.onclick = () => {
  if (confirm("Точно сбросить прогресс?")) {
    score = 0;
    scoreEl.textContent = score;
    localStorage.removeItem("kotokliker_save");
  }
};

// анти-зум
document.addEventListener("dblclick", e => {
  e.preventDefault();
});
