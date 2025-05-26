const products = {
    dior: [
        { img: "./images-product/img1.jpeg", name: "J'adore", price: "₹1002", description: "A timeless classic, J'adore is known for its floral and fruity notes, offering a sophisticated and elegant scent. " },
        { img: "./images-product/img2.jpeg", name: "Miss Dior", price: "₹450", description: "A vibrant and feminine fragrance, Miss Dior features a blend of floral and fruity notes with a touch of woodiness. " },
        { img: "./images-product/img3.jpeg", name: "Sauvage", price: "₹800", description: "A bold and masculine scent, Sauvage is known for its fresh and spicy notes, creating a rugged and captivating aroma" },
        { img: "./images-product/img4.jpeg", name: "Dior Homme", price: "₹999", description: "A modern and sophisticated fragrance for men, Dior Homme combines woody and aromatic notes for a versatile and appealing scent. " },
        { img: "./images-product/img5.jpeg", name: "Hypnotic Poison", price: "₹2100", description: "A sensual and captivating fragrance, Hypnotic Poison features a blend of oriental notes, creating a mesmerizing and alluring aroma. " },
        { img: "./images-product/img6.jpeg", name: "Fahrenheit", price: "₹560", description: "A classic and timeless fragrance for men, Fahrenheit is known for its bold and masculine notes, including woody and aromatic elements. " },
    ],
    chanel: [
        { img: "./images-product/img7.jpeg", name: "N°5 Parfum", price: "₹780", description: "A timeless classic, with a floral and aldehydic scent, celebrated for its sophisticated and enduring appeal. " },
        { img: "./images-product/img8.jpeg", name: "Coco Mademoiselle Eau de ", price: "₹1299", description: "A modern take on the Coco fragrance, known for its bright and vibrant citrusy notes, offering a blend of playful and elegant. " },
        { img: "./images-product/img9.jpeg", name: "Bleu de Chanel", price: "₹3200", description: "A fragrance for men, it combines woody and aromatic notes, creating a strong and masculine scent. " },
        { img: "./images-product/img10.jpeg", name: "Chance Eau Tendre Eau", price: "₹2100", description: "A delicate and floral fragrance, known for its soft, fresh notes and playful, feminine character. " },
        { img: "./images-product/img11.jpeg", name: "Bleu de Chanel", price: "₹999", description: "A more intense version of the Bleu de Chanel fragrance, offering a bolder and more robust masculine scent" },
        { img: "./images-product/img12.jpeg", name: "Chance Eau Tendre Eau de Toilette", price: "₹899", description: "A lighter and more airy version of Chance Eau Tendre, offering a subtle and refreshing floral scent. " },
        ],
        
    lelabo: [
        {img: "./images-product/img13.jpeg", name: " Santal 33", price: "₹1110", description: "A cult classic, known for its smoky, woody, and slightly musky scent with notes of sandalwood, cedarwood, iris, and leather." },
        { img: "./images-product/img14.jpeg", name: "Another 13", price: "₹2110", description: "A clean, minimalist fragrance with a blend of woody, floral, and slightly musky notes. It's known for its versatility and subtle, comforting scent. " },
        { img: "./images-product/img15.jpeg", name: "Rose 31", price: "₹890", description: "A vibrant and slightly spiky rose fragrance with a hint of green and musk." },
        { img: "./images-product/img16.jpeg", name: "Thé Noir 29", price: "₹790", description: "A sensual and subtly musky scent with black tea and woody notes." },
        { img: "./images-product/img17.jpeg", name: "Bergamote 22", price: "₹1099", description: "A fresh and citrusy fragrance with notes of bergamot, grapefruit, and amber." },
        { img: "./images-product/img18.jpeg", name: " Baie 19", price: "₹2110", description: "A unique and ozonic fragrance with a hint of berry and wood notes." },
        
    ]
        
};



function loadProducts(category, elementId) {
    const container = document.getElementById(elementId);
    products[category].forEach((product, index) => {
        const col = document.createElement("div");
        col.className = "col-md-4 text-center mb-4";
        col.innerHTML = `
            <div class="card">
                <img src="${product.img}" class="card-img-top" alt="${product.name}" onclick="showProduct('${category}', ${index})">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="text-success">${product.price}</p>
                    <button class="btn btn-primary" onclick="showProduct('${category}', ${index})">View Details</button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

let currentProduct = null;

function showProduct(category, index) {
    const product = products[category][index];
    currentProduct = product;

    document.getElementById("modal-img").src = product.img;
    document.getElementById("modal-title").textContent = product.name;
    document.getElementById("modal-description").textContent = product.description;
    document.getElementById("modal-price").textContent = product.price;

    new bootstrap.Modal(document.getElementById("productModal")).show();
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts("dior", "dior-list");
    loadProducts("chanel", "chanel-list");
    loadProducts("lelabo", "lelabo-list");

    // Add to Cart
    document.querySelector("#productModal .btn-primary").addEventListener("click", () => {
        if (currentProduct) {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(currentProduct);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Added to cart successfully!");
        }
    });

    // Wishlist
    document.querySelector("#productModal .btn:nth-of-type(2)").addEventListener("click", () => {
        if (currentProduct) {
            const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            wishlist.push(currentProduct);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            alert("Added to wishlist!");
        }
    });

    // Buy Now
    document.querySelector("#productModal .btn-success").addEventListener("click", () => {
        if (currentProduct) {
            localStorage.setItem("buyNowItem", JSON.stringify(currentProduct));
            window.location.href = "purchase.html";
        }
    });
});
function showProduct(category, index) {
    const product = products[category][index];

    // Populate modal
    document.getElementById("modal-img").src = product.img;
    document.getElementById("modal-title").textContent = product.name;
    document.getElementById("modal-description").textContent = product.description;
    document.getElementById("modal-price").textContent = product.price;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();

    // Get modal buttons
    const modalBody = document.querySelector("#productModal .modal-body");
    const buttons = modalBody.querySelectorAll("button");

    // Attach fresh event listeners
    buttons[0].onclick = function () {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart!");
    };

    buttons[1].onclick = function () {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Added to wishlist!");
    };

    buttons[2].onclick = function () {
        localStorage.setItem("buyNowItem", JSON.stringify(product));
        window.location.href = "purchase.html";
    };
}
