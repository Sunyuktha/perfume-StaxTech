// Load Cart Items and Display
function loadCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartContainer.innerHTML = "";
    let total = 0;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item", "row", "mb-3");

        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <h5>${item.name}</h5>
                <p class="text-success">${item.price}</p>
            </div>
            <div class="cart-item-controls">
                <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);

        const priceNumber = parseFloat(item.price.replace(/[^\d.]/g, ""));
        if (!isNaN(priceNumber)) {
            total += priceNumber;
        }
    });

    cartTotal.innerText = total.toFixed(2);
}

// Make removeFromCart available globally
window.removeFromCart = function (index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
};

// Run loadCart when the page is ready
document.addEventListener("DOMContentLoaded", loadCart);
