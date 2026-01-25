const $ = id => document.getElementById(id);

let score = 0;
let clickPower = 1;
let auto = 0;

/* ===== ITEMS ===== */
const items = [
  {
    name:"👆 +1 к клику",
    desc:"Каждый клик даёт +1 рыбу",
    price:10,
    single:false,
    effect:(n)=>clickPower+=n
  },
  {
    name:"💥 +5 к клику",
    desc:"Увеличивает силу клика на 5",
    price:50,
    single:false,
    effect:(n)=>clickPower+=5*n
  },
  {
    name:"🤖 Авто",
    desc:"Даёт 1 рыбу в секунду",
    price:100,
    single:false,
    effect:(n)=>auto+=n
  },
  {
    name:"😼 Супер кот",
    desc:"+10 к клику",
    price:300,
    single:true,
    effect:()=>clickPower+=10
  }
];

/* ===== SAVE ===== */
function save(){
  localStorage.setItem("save", JSON.stringify({score,clickPower,auto}));
}
function load(){
  let d = JSON.parse(localStorage.getItem("save"));
  if(d){
    score=d.score;
    clickPower=d.clickPower;
    auto=d.auto;
  }
}

/* ===== UI ===== */
function update(){
  $("score").textContent = score+" 🐟";
  renderShop();
}

/* ===== CAT ===== */
$("cat").onclick = ()=>{
  score += clickPower;
  $("cat").style.transform="scale(0.9)";
  setTimeout(()=>$("cat").style.transform="scale(1)",100);
  update(); save();
};

/* ===== AUTO ===== */
setInterval(()=>{
  score += auto;
  update(); save();
},1000);

/* ===== SHOP ===== */
function renderShop(){
  $("shopItems").innerHTML="";
  items.forEach((it,i)=>{
    let div = document.createElement("div");
    div.className="shop-item";
    div.innerHTML = `${it.name} (${it.price} 🐟)`;
    div.onclick=()=>openItem(i);
    $("shopItems").appendChild(div);
  });
}

/* ===== ITEM MODAL ===== */
let currentItem=null;
let currentCount=1;

function openItem(i){
  currentItem=items[i];
  currentCount=1;

  $("itemName").textContent=currentItem.name;
  $("itemDesc").textContent=currentItem.desc;
  $("itemPrice").textContent=currentItem.price;
  $("itemCount").textContent=1;

  $("countBox").style.display =
    currentItem.single ? "none":"flex";

  $("itemModal").classList.add("show");
}

$("plus").onclick=()=>{
  currentCount++;
  $("itemCount").textContent=currentCount;
};

$("minus").onclick=()=>{
  if(currentCount>1){
    currentCount--;
    $("itemCount").textContent=currentCount;
  }
};

$("buyItem").onclick=()=>{
  let total=currentItem.price*currentCount;
  if(score<total) return alert("Не хватает рыб!");

  score-=total;
  currentItem.effect(currentCount);

  closeItem();
  update(); save();
};

function closeItem(){
  $("itemModal").classList.remove("show");
}

/* ===== MODALS ===== */
$("openShop").onclick=()=>$("shop").classList.add("show");
$("closeShop").onclick=()=>$("shop").classList.remove("show");

/* ===== START ===== */
load();
update();