  {
    name:"⚡ Турбо",
    desc:"x2 клики",
    baseCost:500,
    count:0,
    single:true,
    buy(){
      clickPower *= 2;
      this.count = 1;
    }
  },
  {
    name:"🧠 улучшение ИИ",
    desc:"x2 автоклики",
    baseCost:800,
    count:0,
    single:true,
    buy(){
      autoPower *= 2;
      this.count = 1;
    }
  },
  {
    name:"😼 Супер кот",
    desc:"+50 к клику",
    baseCost:1500,
    count:0,
    single:true,
    buy(){
      clickPower += 50;
      this.count = 1;
    }
  },
  {
    name:"🚀 Ракета",
    desc:"x3 клики",
    baseCost:4000,
    count:0,
    single:true,
    buy(){
      clickPower *= 3;
      this.count = 1;
    }
  },
  {
    name:"🕰 superComputer",
    desc:"x3 автоклики",
    baseCost:6000,
    count:0,
    single:true,
    buy(){
      autoPower *= 3;
      this.count = 1;
    }
  },
  {
    name:"👑 Бог котов",
    desc:"x5 ко всему",
    baseCost:25000,
    count:0,
    single:true,
    buy(){
      clickPower *= 5;
      autoPower *= 5;
      this.count = 1;
    }
  }
];

/* ===== PRICE WITH SCALING ===== */
function getPrice(item){
  return Math.floor(item.baseCost * Math.pow(1.4, item.count));
}

/* === KAZINO === */

const kazino = {
  modes: [
    {name:"☠️ ULTRAHARDER ☠️", chance:0.000001, mult:1000000},
    {name:"☠️ ULTRAHARD ☠️",   chance:0.0001,   mult:1000},
    {name:"HARD",            chance:0.01,     mult:500},
    {name:"RISK&RICH",       chance:0.05,     mult:200},
    {name:"RISK",            chance:0.15,     mult:180},
    {name:"NORMALLY+",       chance:0.20,     mult:150},
    {name:"PASHALKO",        chance:0.67,     mult:14, x2chance:0.88},
    {name:"EZ WIN",          chance:0.65,     mult:2},
    {name:"NORMALLY",        chance:0.50,     mult:3},
    {name:"PROBNIK",         chance:0.50,     mult:1, test:true}
  ]
};

// элементы
const kazinoInput  = document.getElementById("kazinoBet");
const kazinoResult = document.getElementById("kazinoResult");
const kazinoBtns   = document.querySelectorAll("[data-kazino]");

// логика режимов
kazinoBtns.forEach(btn=>{
  btn.onclick = ()=>{
    const mode = kazino.modes[btn.dataset.kazino];
    const bet  = Number(kazinoInput.value);

    if(!bet || bet <= 0){
      kazinoResult.textContent = "Введите ставку!";
      return;
    }

    if(score < bet){
      kazinoResult.textContent = "Не хватает рыб 🐟";
      return;
    }

    // ПРОБНИК
    if(mode.test){
      kazinoResult.textContent =
        Math.random() < 0.5
        ? "✔️ ПРОБНИК: выиграл, но ничего не дали"
        : "❌ ПРОБНИК: проиграл, но ничего не забрали";
      return;
    }

    // обычные режимы
    score -= bet;

    if(Math.random() < mode.chance){
      let win = bet * mode.mult;

      // пасхалка x2
      if(mode.x2chance && Math.random() < mode.x2chance){
        win *= 2;
        kazinoResult.textContent = "✨ X2 ПАСХАЛКА! +" + win;
      } else {
        kazinoResult.textContent = "✔️ ВЫИГРЫШ +" + win;
      }

      score += win;
    } else {
      kazinoResult.textContent = "❌ ПРОИГРЫШ -" + bet;
    }

    save();
    update();
  };
});

// открыть / закрыть
document.getElementById("openKazino").onclick = ()=>{
  document.getElementById("kazino").classList.add("show");
};

document.getElementById("closeKazino").onclick = ()=>{
  document.getElementById("kazino").classList.remove("show");
};

/* ===== SAVE ===== */
function save(){
  localStorage.setItem("save", JSON.stringify({
    score, clickPower, autoPower,
    items: items.map(i=>i.count)
  }));
}

let score = 0;
let clickPower = 1;
let autoPower = 0;

function load(){
  let d = JSON.parse(localStorage.getItem("save"));
  if(!d) return;

  score = d.score;
  clickPower = d.clickPower;
  autoPower = d.autoPower;
  d.items.forEach((c,i)=>items[i].count = c);
}

/* ===== UI ===== */
function update(){
  $("score").textContent = score+" 🐟";
  renderShop();
}

/* ===== CAT ===== */
$("cat").onclick = ()=>{
  score += clickPower;
  update(); save();
  $("cat").style.transform="scale(0.9)";
  setTimeout(()=>$("cat").style.transform="scale(1)",100);
};

/* ===== AUTO ===== */
setInterval(()=>{
  score += autoPower;
  update(); save();
},1000);

/* ===== SHOP LIST ===== */
function renderShop(){
  let box = $("shopItems");
  box.innerHTML="";
  items.forEach((it,i)=>{
    let btn = document.createElement("button");
    let price = getPrice(it);
    btn.textContent = `${it.name} (${price} 🐟)`;
    btn.onclick = ()=>openItem(i);
    if(it.single && it.count>0) btn.disabled=true;
    box.appendChild(btn);
  });
}

/* ===== ITEM MODAL ===== */
let currentItem=null;
let currentCount=1;

function openItem(i){
  currentItem = items[i];
  currentCount = 1;

  $("itemName").textContent=currentItem.name;
  $("itemDesc").textContent=currentItem.desc;
  $("itemCount").textContent=1;
  $("itemPrice").textContent=getPrice(currentItem);

  $("countBox").style.display =
    currentItem.single ? "none":"flex";

  $("itemModal").classList.add("show");
}

$("plus").onclick=()=>{
  currentCount++;
  $("itemCount").textContent=currentCount;
  $("itemPrice").textContent =
    getPrice(currentItem)*currentCount;
};

$("minus").onclick=()=>{
  if(currentCount>1){
    currentCount--;
    $("itemCount").textContent=currentCount;
    $("itemPrice").textContent =
      getPrice(currentItem)*currentCount;
  }
};

$("buyItem").onclick=()=>{
  let total = getPrice(currentItem)*currentCount;
  if(score<total) return alert("Мало рыбы!");

  score -= total;
  currentItem.buy(currentCount);

  $("itemModal").classList.remove("show");
  update(); save();
};

$("closeItem").onclick=()=>{
  $("itemModal").classList.remove("show");
};

/* ===== MODALS ===== */
$("openShop").onclick=()=>$("shop").classList.add("show");
$("closeShop").onclick=()=>$("shop").classList.remove("show");

/* ===== START ===== */
load();
update();

};