let b1 = document.getElementById("b1");

let scoreText = document.getElementById("score");

let score=(0)
    
let clkpower=(0)
  
let lvl=(1)
  
let autoclik=(0)



b1.onclick = () => {
  
  b1.style.transform = "scale(0.5)";

setTimeout(() => {

  b1.style.transform = "scale(1)";

}, 100);
  
  scoreText.textContent = score;
  
  score += 1;
  
  };