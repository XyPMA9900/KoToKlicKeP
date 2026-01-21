let score = 0;

const scoreEl = document.getElementById("score");
const catBtn = document.getElementById("cat");

catBtn.onclick = () => {
  score++;
  scoreEl.textContent = score;
};

// анти-двойной зум
document.addEventListener("dblclick", e => {
  e.preventDefault();
});