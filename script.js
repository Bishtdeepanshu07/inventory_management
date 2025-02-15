document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (event) => {
            const product = event.target.closest(".product");
            const id = product.dataset.id;
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);

            cart.push({ id, name, price });
            updateCart();
        });
    });



    document.querySelector("#cart-link").addEventListener("click", function (event) {
        event.preventDefault();  // Prevent default jump behavior
        document.querySelector(".cart").scrollIntoView({ behavior: "smooth" });
    });
    

    function updateCart() {
        cartCount.innerText = cart.length;
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price} 
                <button class="remove-btn" data-index="${index}">--</button>`;
            cartItems.appendChild(li);
            total += item.price;
        });

        totalPrice.innerText = total;

        document.querySelectorAll(".remove-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    document.getElementById("checkout").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Checkout complete!");
            cart.length = 0;
            updateCart();
        }
    });
});
