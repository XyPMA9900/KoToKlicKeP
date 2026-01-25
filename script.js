let score = 0;

let scoreText = document.getElementById("score");
let cat = document.getElementById("cat");

let shop = document.getElementById("shop");
let openShop = document.getElementById("openShop");
let closeShop = document.getElementById("closeShop");

/* КЛИК */
cat.onclick = () => {
  score += 1;
  scoreText.textContent = score + " 🐟";
};

/* МОДАЛКА */
openShop.onclick = () => {
  shop.classList.add("show");
};

closeShop.onclick = () => {
  shop.classList.remove("show");
};