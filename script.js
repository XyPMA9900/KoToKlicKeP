const $ = id => document.getElementById(id);

/* ===== GAME ===== */
let score = 0;
let clickPower = 1;
let autoPower = 0;

/* ===== ITEMS (10 штук, без халявы) ===== */
const items = [
  {
    name:"👆 Малый апгрейд",
    desc:"+1 к клику",
    baseCost:10,
    count:0,
    single:false,
    buy(n){
      clickPower += n;
      this.count += n;
    }
  },
  {
    name:"💥 Средний апгрейд",
    desc:"+5 к клику",
    baseCost:60,
    count:0,
    single:false,
    buy(n){
      clickPower += 5*n;
      this.count += n;
    }
  },
  {
    name:"🔥 Большой апгрейд",
    desc:"+15 к клику",
    baseCost:200,
    count:0,
    single:false,
    buy(n){
      clickPower += 15*n;
      this.count += n;
    }
  },
  {
    name:"🤖 Автокликер",
    desc:"+1 в секунду",
    baseCost:150,
    count:0,
    single:false,
    buy(n){
      autoPower += n;
      this.count += n;
    }
  },
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
    name:"🧠 Интеллект",
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
    name:"🕰 Хронос",
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
    baseCost:15000,
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

/* ===== SAVE ===== */
function save(){
  localStorage.setItem("save", JSON.stringify({
    score, clickPower, autoPower,
    items: items.map(i=>i.count)
  }));
}

function load(){
  let d = JSON.parse(localStorage.getItem("save"));
  if(!d) return;
  score=d.score;
  clickPower=d.clickPower;
  autoPower=d.autoPower;
  d.items.forEach((c,i)=>items[i].count=c);
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