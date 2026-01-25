let score = 0;

const scoreText = document.getElementById("score");
const cat = document.getElementById("cat");
const shop = document.getElementById("shop");
const openShop = document.getElementById("openShop");
const closeShop = document.getElementById("closeShop");
const shopItems = document.getElementById("shopItems");

/* ТОВАРЫ */
let clickPower = 1;

const items = [
  {
    name: "👆 +1 к клику",
    cost: 10,
    buy() {
      clickPower += 1;
    }
  },
  {
    name: "💥 +5 к клику",
    cost: 50,
    buy() {
      clickPower += 5;
    }
  }
];

/* КЛИК */
cat.onclick = () => {
  score += clickPower;
  scoreText.textContent = score + " 🐟";
};

/* ОТКРЫТЬ МАГАЗИН */
openShop.onclick = () => {
  renderShop();
  shop.classList.add("show");
};

closeShop.onclick = () => {
  shop.classList.remove("show");
};

/* РЕНДЕР МАГАЗИНА */
function renderShop() {
  shopItems.innerHTML = "";

  items.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = `${item.name} (${item.cost} 🐟)`;

    btn.onclick = () => {
      if (score >= item.cost) {
        score -= item.cost;
        item.buy();
        scoreText.textContent = score + " 🐟";
      } else {
        alert("Не хватает рыб!");
      }
    };

    shopItems.appendChild(btn);
  });
}