const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});


if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}


function start() {
  addEvents();
}

function actualizar() {
  addEvents();
  actualizarTotal();
}

function addEvents() {
  let eliminarProducto_btns = document.querySelectorAll(".cart-remove");
  console.log(eliminarProducto_btns);
  eliminarProducto_btns.forEach((btn) => {
    btn.addEventListener("click", eliminarProducto);
  });

  let cambiarCantidad_inputs = document.querySelectorAll(".cart-quantity");
  cambiarCantidad_inputs.forEach((input) => {
    input.addEventListener("change", manejar_changeItemQuantity);
  });

  
  let añadirProducto_btns = document.querySelectorAll(".add-cart");
  añadirProducto_btns.forEach((btn) => {
    btn.addEventListener("click", manejar_añadirProductoItem);
  });


  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", manejar_buyOrder);
  
}



let itemsAdded = [];

function manejar_añadirProductoItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("¡Este artículo ya existe!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const 
 carritoContenido = cart.querySelector(".cart-content");
  
 carritoContenido.appendChild(newNode);

  actualizar();
}


function eliminarProducto() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  actualizar();
}

function manejar_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); 

  actualizar();
}

function manejar_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("¡Aún no hay ningún pedido para realizar! \nPor favor, haga un pedido primero.");
    return;
  }
  const carritoContenido = cart.querySelector(".cart-content");
  carritoContenido.innerHTML = "";
  alert("Su compra se realizó con éxito ");
  itemsAdded = [];

  actualizar();
}

const deleteAllBtn = document.querySelector(".eliminar-btn");
deleteAllBtn.addEventListener("click", () => {
  const carritoContenido = document.querySelector(".cart-content");
  carritoContenido.innerHTML = "";
  itemsAdded = []; 
  actualizar();

  alert(" Desea eliminar los productos.");
});



function actualizarTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  total = total.toFixed(3);
  

  totalElement.innerHTML = "$" + total;
}

function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}
