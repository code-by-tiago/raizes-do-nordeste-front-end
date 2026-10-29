const products=[
  {id:1,name:"Cuscuz Sertanejo",category:"Cuscuz",description:"Cuscuz de milho, carne de sol, queijo coalho e ovo.",price:24.9,emoji:"🥘"},
  {id:2,name:"Tapioca Nordestina",category:"Tapioca",description:"Queijo coalho, coco fresco e manteiga de garrafa.",price:16.9,emoji:"🫓"},
  {id:3,name:"Café Coado da Casa",category:"Cafés",description:"Café especial passado na hora. 200 ml.",price:7.5,emoji:"☕"},
  {id:4,name:"Bolo de Macaxeira",category:"Cuscuz",description:"Fatia cremosa com coco e leite condensado.",price:10.9,emoji:"🍰"},
  {id:5,name:"Suco de Umbu",category:"Bebidas",description:"Polpa natural, água filtrada e pouco açúcar.",price:9.9,emoji:"🥤"},
  {id:6,name:"Tapioca de Banana",category:"Tapioca",description:"Banana, canela e queijo coalho dourado.",price:15.9,emoji:"🍌"}
];
let cart=JSON.parse(localStorage.getItem("raizes-cart")||"[]").filter(item=>products.some(product=>product.id===item.id)&&Number.isInteger(item.qty)&&item.qty>0);
const money=value=>value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const $=selector=>document.querySelector(selector);
function save(){localStorage.setItem("raizes-cart",JSON.stringify(cart));updateCount()}
function updateCount(){$("#cart-count").textContent=cart.reduce((sum,item)=>sum+item.qty,0)}
function renderMenu(category="Todos"){
  $("#product-grid").innerHTML=products.filter(p=>category==="Todos"||p.category===category).map(p=>`<article class="product"><div class="product-art" aria-hidden="true">${p.emoji}</div><div class="product-body"><h3>${p.name}</h3><p>${p.description}</p><div class="product-footer"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}">Adicionar</button></div></div></article>`).join("");
}
function add(id){const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();toast("Adicionado à sua sacola");}
function renderCart(){
  const content=$("#cart-content");
  if(!cart.length){content.innerHTML=`<div class="card"><p>Sua sacola ainda está vazia.</p><button class="primary-button" data-nav="menu">Explorar cardápio</button></div>`;return}
  const total=cart.reduce((sum,x)=>sum+products.find(p=>p.id===x.id).price*x.qty,0);
  content.innerHTML=`<div class="card">${cart.map(item=>{const p=products.find(x=>x.id===item.id);return `<div class="cart-row"><div class="cart-art">${p.emoji}</div><div><h3>${p.name}</h3><small>${money(p.price)} cada</small></div><div class="quantity"><button data-minus="${p.id}" aria-label="Diminuir">−</button><strong>${item.qty}</strong><button data-plus="${p.id}" aria-label="Aumentar">+</button></div></div>`}).join("")}<div class="cart-total"><span>Total</span><span>${money(total)}</span></div><button class="primary-button" data-nav="checkout">Continuar pedido →</button></div>`;
}
function renderSummary(){
  const total=cart.reduce((sum,x)=>sum+products.find(p=>p.id===x.id).price*x.qty,0);
  $("#checkout-summary").innerHTML=`<h2>Resumo do pedido</h2>${cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="summary-line"><span>${x.qty}× ${p.name}</span><b>${money(p.price*x.qty)}</b></div>`}).join("")}<div class="summary-line"><span>Taxa de serviço</span><span>Grátis</span></div><div class="summary-line total"><span>Total</span><span>${money(total)}</span></div>`;
}
function navigate(name){if((name==="checkout"||name==="payment")&&!cart.length){navigate("cart");toast("Adicione pelo menos um item antes de continuar");return}document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$(`#screen-${name}`).classList.add("active");if(name==="cart")renderCart();if(name==="checkout")renderSummary();window.scrollTo({top:0,behavior:"smooth"})}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("visible");setTimeout(()=>el.classList.remove("visible"),2400)}
function privacy(open=true){$("#privacy-modal").hidden=!open}
document.addEventListener("click",event=>{
  const nav=event.target.closest("[data-nav]");if(nav){event.preventDefault();navigate(nav.dataset.nav);return}
  const addButton=event.target.closest("[data-add]");if(addButton){add(Number(addButton.dataset.add));return}
  const plus=event.target.closest("[data-plus]"),minus=event.target.closest("[data-minus]");if(plus||minus){const id=Number((plus||minus).dataset[plus?"plus":"minus"]),item=cart.find(x=>x.id===id);if(plus)item.qty++;else if(--item.qty<1)cart=cart.filter(x=>x.id!==id);save();renderCart();return}
  if(event.target.matches(".category")){document.querySelectorAll(".category").forEach(b=>{b.classList.remove("active");b.setAttribute("aria-selected","false")});event.target.classList.add("active");event.target.setAttribute("aria-selected","true");renderMenu(event.target.dataset.category)}
  if(event.target.id==="change-store"){toast("No momento, esta é a unidade selecionada")}
  if(event.target.id==="privacy-link"||event.target.id==="privacy-link-2")privacy();
  if(event.target.id==="close-privacy")privacy(false);
  if(event.target.id==="save-privacy"){localStorage.setItem("raizes-marketing-consent",String($("#marketing-consent").checked));privacy(false);toast("Preferências de privacidade salvas")}
  if(event.target.id==="privacy-policy"){toast("Seus dados são usados somente para processar o pedido e para comunicações autorizadas.")}
  if(event.target.id==="payment-fail"){navigate("checkout");toast("Pagamento não aprovado. Revise os dados e tente novamente.")}
});
$("#checkout-form").addEventListener("submit",event=>{event.preventDefault();const form=event.currentTarget,feedback=$("#checkout-feedback"),name=$("#customer-name");feedback.textContent="";if(!$("#consent").checked){feedback.textContent="Para continuar, autorize o uso dos dados necessários ao processamento do pedido.";$("#consent").focus();return}if(!name.value.trim()||name.value.trim().length<2){feedback.textContent="Informe um nome com pelo menos 2 caracteres para identificar o pedido.";name.focus();return}if(!form.checkValidity())return;navigate("payment")});
$("#privacy-modal").addEventListener("click",event=>{if(event.target.id==="privacy-modal")privacy(false)});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!$("#privacy-modal").hidden)privacy(false)});
$("#marketing-consent").checked=localStorage.getItem("raizes-marketing-consent")==="true";
$("#confirm-payment").addEventListener("click",()=>{const id=Math.floor(1000+Math.random()*8999);$("#order-number").textContent=`Pedido #RN-${id}`;cart=[];save();navigate("tracking")});
renderMenu();updateCount();
