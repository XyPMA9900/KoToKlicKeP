const $ = id => document.getElementById(id);

/* ===== GAME ===== */
let score = 0;
let clickPower = 1;
let auto = 0;
let clickLock = false;

/* ===== ITEMS (10) ===== */
const items = [
  {name:"👆 Клик +1", cost:10, desc:"+1 к клику", single:false, buy:(n)=>clickPower+=n},
  {name:"🤖 Авто", cost:50, desc:"+1 в секунду", single:false, buy:(n)=>auto+=n},
  {name:"💥 Крит", cost:100, desc:"Шанс x2 (пока просто фейк)", single:true, buy:()=>{}},
  {name:"⏩ Буст", cost:200, desc:"Временно x2 клики (фейк)", single:true, buy:()=>{}},
  {name:"😼 Супер кот", cost:300, desc:"+5 к клику", single:true, buy:()=>clickPower+=5},
  {name:"🏅 Золото", cost:400, desc:"+100 рыб", single:false, buy:(n)=>score+=100*n},
  {name:"💪 Мега", cost:500, desc:"Навсегда x2 клики", single:true, buy:()=>clickPower*=2},
  {name:"⏳ Пассив", cost:600, desc:"Навсегда x2 авто", single:true, buy:()=>auto*=2},
  {name:"🐱 coolscamer3000", cost:6799, desc:"Секретный кот", single:true, buy:()=>score+=1000},
  {name:"🤖 chatGPT", cost:9999, desc:"+1500 рыб/сек", single:true, buy:()=>auto+=1500}
];

/* ===== SAVE ===== */
function save(){
  localStorage.setItem("save", JSON.stringify({score, clickPower, auto}));
}

function load(){
  let d = JSON.parse(localStorage.getItem("save"));
  if(d){
    score = d.score;
    clickPower = d.clickPower;
    auto = d.auto;
  }
}

/* ===== UI ===== */
function update(){
  $("score").textContent = score+" 🐟";
  renderShop();
}

/* ===== CAT ===== */
$("cat").onclick = ()=>{
  if(clickLock) return;
  clickLock = true;

  score += clickPower;
  update(); 
  save();

  $("cat").style.transform="scale(0.9)";
  setTimeout(()=>{
    $("cat").style.transform="scale(1)";
    clickLock=false;
  },120);
};

/* ===== AUTO ===== */
setInterval(()=>{
  score += auto;
  update(); 
  save();
},1000);

/* ===== SHOP ===== */
function renderShop(){
  let box = $("shopItems");
  box.innerHTML="";

  items.forEach((it,i)=>{
    let div = document.createElement("div");
    div.className = "shop-item"+(score<it.cost?" locked":"");
    div.textContent = it.name+" ("+it.cost+")";
    div.onclick = ()=>openItem(i);
    box.appendChild(div);
  });
}

/* ===== ITEM MODAL ===== */
let currentItem = null;
let currentCount = 1;

function openItem(i){
  currentItem = items[i];
  currentCount = 1;

  $("itemName").textContent = currentItem.name;
  $("itemDesc").textContent = currentItem.desc;
  $("itemPrice").textContent = currentItem.cost;
  $("itemCount").textContent = 1;

  $("itemCountBox").style.display =
    currentItem.single ? "none" : "flex";

  $("itemModal").classList.add("show");
}

$("plus").onclick = ()=>{
  currentCount++;
  $("itemCount").textContent=currentCount;
};

$("minus").onclick = ()=>{
  if(currentCount>1){
    currentCount--;
    $("itemCount").textContent=currentCount;
  }
};

$("buyItem").onclick = ()=>{
  let total = currentItem.cost * currentCount;
  if(score < total) return alert("Не хватает рыб!");

  score -= total;
  currentItem.buy(currentCount);

  $("itemModal").classList.remove("show");
  update(); 
  save();
};

$("closeItem").onclick = ()=>{
  $("itemModal").classList.remove("show");
};

/* ===== MODALS ===== */
$("openShop").onclick = ()=>$("shop").classList.add("show");
$("closeShop").onclick = ()=>$("shop").classList.remove("show");

/* ===== START ===== */
load();
update();