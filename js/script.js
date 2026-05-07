alert("TAP OK TO VIEW THE PAGE🍰");

// CART SYSTEM
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   ADD TO CART
========================= */
function addToCart() {
    let itemSelect = document.getElementById("item");
    let itemName = itemSelect.options[itemSelect.selectedIndex].text;
    let itemPrice = Number(itemSelect.value);
    let quantity = Number(document.getElementById("quantity").value);

    if (quantity <= 0 || isNaN(quantity)) {
        alert("Please enter a valid quantity!");
        return;
    }

    let itemTotal = itemPrice * quantity;

    let item = {
        name: itemName,
        quantity: quantity,
        price: itemPrice,
        total: itemTotal
    };

    cart.push(item);
    saveCart();
    updateCart();
}

/* =========================
   UPDATE CART UI
========================= */
function updateCart() {
    let list = document.getElementById("cartList");
    list.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${item.name} x ${item.quantity} = K${item.total}
            <button onclick="removeItem(${index})">Remove</button>
        `;

        list.appendChild(li);
        subtotal += item.total;
    });

    let discount = subtotal >= 100 ? subtotal * 0.1 : 0;
    let tax = (subtotal - discount) * 0.05;
    let finalTotal = subtotal - discount + tax;

    document.getElementById("total").innerHTML =
        "Subtotal: K" + subtotal.toFixed(2) +
        "<br>Discount: K" + discount.toFixed(2) +
        "<br>Tax: K" + tax.toFixed(2) +
        "<br><b>Final Total: K" + finalTotal.toFixed(2) + "</b>";
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

/* =========================
   CLEAR CART
========================= */
function clearCart() {
    cart = [];
    saveCart();
    updateCart();
    document.getElementById("receipt").innerHTML = "";
}

/* =========================
   SAVE TO LOCAL STORAGE
========================= */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   CHECKOUT SYSTEM
========================= */
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let receipt = "🧾 ORDER RECEIPT<br><br>";
    let subtotal = 0;

    cart.forEach(item => {
        receipt += `${item.name} x ${item.quantity} = K${item.total}<br>`;
        subtotal += item.total;
    });

    let discount = subtotal >= 100 ? subtotal * 0.1 : 0;
    let tax = (subtotal - discount) * 0.05;
    let finalTotal = subtotal - discount + tax;

    receipt += "<br>-------------------<br>";
    receipt += `Subtotal: K${subtotal.toFixed(2)}<br>`;
    receipt += `Discount: K${discount.toFixed(2)}<br>`;
    receipt += `Tax: K${tax.toFixed(2)}<br>`;
    receipt += `<b>Final Total: K${finalTotal.toFixed(2)}</b>`;

    document.getElementById("receipt").innerHTML = receipt;

    cart = [];
    saveCart();
    updateCart();
}