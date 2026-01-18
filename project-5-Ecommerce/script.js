
let cart=[]; let total=0;
function addToCart(name,price){
  cart.push({name,price});
  total+=price;
  renderCart();
}
function renderCart(){
  const cartList=document.getElementById("cart");
  cartList.innerHTML="";
  cart.forEach(item=>{
    const li=document.createElement("li");
    li.textContent=`${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
  document.getElementById("total").textContent=total;
}
