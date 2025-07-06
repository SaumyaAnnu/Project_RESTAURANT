document.addEventListener("DOMContentLoaded", function () {
  const cart = {};
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  // 🛒 Update Cart Display
  function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    for (const itemName in cart) {
      const item = cart[itemName];
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      cartItemDiv.innerHTML =
        `<span><strong>${item.name}</strong> x ${item.quantity} — ₹${itemTotal}</span>
         <button class="remove-btn" data-name="${item.name}">Remove</button>`;

      cartItemsContainer.appendChild(cartItemDiv);
    }

    cartTotalElement.textContent = total;

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(button => {
      button.addEventListener("click", function () {
        const name = this.getAttribute("data-name");
        delete cart[name];
        updateCartDisplay();
      });
    });
  }

  // 🛒 Add to Cart Button
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
      const item = this.closest(".item");
      const name = item.getAttribute("data-name");
      const price = parseInt(item.getAttribute("data-price"));

      if (cart[name]) {
        cart[name].quantity += 1;
      } else {
        cart[name] = { name, price, quantity: 1 };
      }

      updateCartDisplay();
    });
  });

  // ✅ Handle Registration
  document.querySelector('.registration-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok) {
        console.log("✅ Registered:", result.message);
        window.location.href = "/thanku.html";
      } else {
        alert("❌ " + (result.error || "Registration failed"));
      }
    } catch (err) {
      alert("❌ Registration failed.");
      console.error(err);
    }
  });

  // ✅ Handle Signin
  document.querySelector('.signin-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok) {
        console.log("✅ Signed in:", result.message);
        window.location.href = "/thanku.html";
      } else {
        alert("❌ " + (result.error || "Signin failed"));
      }
    } catch (err) {
      alert("❌ Signin failed.");
      console.error(err);
    }
  });

  // ✅ Handle Checkout
  document.getElementById("checkout-form")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      const res = await fetch("/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart })
      });

      const result = await res.json();
      if (res.ok) {
        console.log("✅ Checkout:", result.message);
        window.location.href = "/orderplaced.html";

      } else {
        alert("❌ " + (result.error || "Checkout failed"));
      }
    } catch (err) {
      alert("❌ Checkout failed.");
      console.error(err);
    }
  });
});
