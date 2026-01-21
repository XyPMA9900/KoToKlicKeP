const scoreEl = document.getElementById("score");
const catBtn = document.getElementById("cat");

const settingsBtn = document.getElementById("settingsBtn");
const settingsDiv = document.getElementById("settings");

const saveBtn = document.getElementById("saveFile");
const loadInput = document.getElementById("loadFile");
const resetBtn = document.getElementById("reset");

let score = 0;
scoreEl.textContent = score;

// клик по коту
catBtn.onclick = () => {
  score++;
  scoreEl.textContent = score;
};

// открыть/закрыть настройки
settingsBtn.onclick = () => {
  settingsDiv.classList.toggle("hidden");
};

// сохранить в файл
saveBtn.onclick = () => {
  const data = { score };
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "kotokliker_save.json";
  link.click();
};

// загрузить файл
loadInput.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const data = JSON.parse(reader.result);
    score = data.score || 0;
    scoreEl.textContent = score;
  };
  reader.readAsText(file);
};

// сброс
resetBtn.onclick = () => {
  if (confirm("Точно сбросить прогресс?")) {
    score = 0;
    scoreEl.textContent = score;
  }
};

// анти-зум
document.addEventListener("dblclick", e => {
  e.preventDefault();
});
