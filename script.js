let score = 0;

let b1 = document.getElementById("b1");
let scoreText = document.getElementById("score");
let plus = document.getElementById("plus");

b1.onclick = () => {
  score++;
  scoreText.textContent = score;

  // анимация кнопки
  b1.style.transform = "scale(0.95)";
  setTimeout(() => {
    b1.style.transform = "scale(1)";
  }, 100);

  // всплывающий +1
  plus.style.opacity = 1;
  setTimeout(() => {
    plus.style.opacity = 0;
  }, 300);
};