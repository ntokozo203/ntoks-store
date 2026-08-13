/* NTOKS checkout — plain JavaScript.
   Simulated payment: no data is ever sent anywhere. */

(function () {
  var state = { step: "shipping", processing: false };
  var shipping = { fullName: "", address: "", city: "", zip: "" };
  var card = { number: "", expiry: "", cvv: "", nameOnCard: "" };

  document.addEventListener("DOMContentLoaded", function () {
    if (Cart.items.length === 0 && state.step !== "success") {
      window.location.href = "shop.html";
      return;
    }
    renderSummary();
    showStep("shipping");
  });

  function get(key) {
    return document.getElementById(key);
  }

  /* ——— Order summary rail ——— */
  function renderSummary() {
    var list = get("summary-items");
    var html = "";
    for (var i = 0; i < Cart.items.length; i++) {
      var item = Cart.items[i];
      html +=
        '<div class="summary-item">' +
        '<img src="' + item.image + '" alt="' + escapeHtml(item.name) + '" />' +
        '<div class="si-info">' +
        "<p>" + escapeHtml(item.name) + "</p>" +
        "<span>US " + item.size + " × " + item.quantity + "</span>" +
        "</div>" +
        "<span>" + formatPrice(item.price * item.quantity) + "</span>" +
        "</div>";
    }
    list.innerHTML = html;
    get("sum-subtotal").textContent = formatPrice(Cart.subtotal());
    get("sum-shipping").textContent = Cart.shipping() === 0 ? "Free" : formatPrice(Cart.shipping());
    get("sum-total").textContent = formatPrice(Cart.total());
  }

  /* ——— Step navigation ——— */
  function showStep(step) {
    state.step = step;
    var chips = document.querySelectorAll("[data-step-chip]");
    for (var i = 0; i < chips.length; i++) {
      var on = chips[i].getAttribute("data-step-chip") === step;
      chips[i].classList.toggle("active", on);
    }
    get("shipping-section").style.display = step === "shipping" ? "" : "none";
    get("payment-section").style.display = step === "payment" ? "" : "none";
    if (step === "shipping") {
      get("back-payment-link").style.display = "none";
    } else {
      get("back-payment-link").style.display = "";
    }
  }

  /* ——— Shipping step ——— */
  get("shipping-form").addEventListener("submit", function (e) {
    e.preventDefault();
    if (state.processing) return;
    shipping.fullName = get("ship-name").value.trim();
    shipping.address = get("ship-address").value.trim();
    shipping.city = get("ship-city").value.trim();
    shipping.zip = get("ship-zip").value.trim();

    clearErrors();
    var valid = true;
    if (shipping.fullName.length < 3) { markError("ship-name", "Full name is required."); valid = false; }
    if (shipping.address.length < 5) { markError("ship-address", "Address is required."); valid = false; }
    if (shipping.city.length < 2) { markError("ship-city", "City is required."); valid = false; }
    if (!/^\d{3,6}$/.test(shipping.zip)) { markError("ship-zip", "Please enter a valid ZIP (3–6 digits)."); valid = false; }
    if (valid) showStep("payment");
  });

  /* ——— Payment step ——— */
  get("back-payment-link").addEventListener("click", function () {
    showStep("shipping");
  });

  get("card-number").addEventListener("input", function (e) {
    /* Simple grouping while typing */
    var v = e.target.value.replace(/\D/g, "").slice(0, 16);
    e.target.value = v.replace(/(.{4})/g, "$1 ").trim();
  });

  get("payment-form").addEventListener("submit", function (e) {
    e.preventDefault();
    if (state.processing) return;
    card.number = get("card-number").value.replace(/\s/g, "");
    card.expiry = get("card-expiry").value.trim();
    card.cvv = get("card-cvv").value.trim();
    card.nameOnCard = get("card-name").value.trim();

    clearErrors();
    var valid = true;
    if (card.number.length < 15) { markError("card-number", "Enter a 16-digit card number (simulated)."); valid = false; }
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) { markError("card-expiry", "Use the format MM/YY."); valid = false; }
    if (!/^\d{3,4}$/.test(card.cvv)) { markError("card-cvv", "CVV is 3–4 digits."); valid = false; }
    if (card.nameOnCard.length < 3) { markError("card-name", "Name on card is required."); valid = false; }
    if (!valid) return;

    state.processing = true;
    get("payment-form").style.display = "none";
    get("processing-box").style.display = "";
    get("card-type-row").style.display = "none";

    setTimeout(function () {
      state.processing = false;
      Cart.clear();
      updateCartBadge();
      showSuccess();
    }, 1600);
  });

  /* ——— Success ——— */
  function showSuccess() {
    get("checkout-main").innerHTML =
      '<div class="success-box">' +
      '<svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>' +
      "<h2>Order confirmed</h2>" +
      '<p class="order-no">Order #' + (10000 + Math.floor(Math.random() * 90000)) + "</p>" +
      "<p>This was a simulated checkout — nothing was charged and nothing will be shipped. In a real store, your order would arrive in 2–4 business days.</p>" +
      '<div class="success-actions">' +
      '<a class="btn btn-dark" href="shop.html">Keep Shopping</a>' +
      '<a class="btn btn-ghost" href="index.html">Back Home</a>' +
      "</div>" +
      "</div>";
  }

  function markError(id, message) {
    var input = get(id);
    input.classList.add("error");
    var err = document.createElement("p");
    err.className = "form-error";
    err.textContent = message;
    input.insertAdjacentElement("afterend", err);
  }

  function clearErrors() {
    var errors = document.querySelectorAll(".form-error");
    for (var i = 0; i < errors.length; i++) errors[i].remove();
    var inputs = document.querySelectorAll(".form-group input");
    for (var j = 0; j < inputs.length; j++) inputs[j].classList.remove("error");
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();
