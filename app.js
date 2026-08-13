/* Ntoks app — plain JavaScript.
   Wires up: header cart count, cart drawer, product modal,
   filters, toast feedback, and scroll reveals. */

document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge();
  wireCartDrawer();
  if (document.getElementById("product-grid")) {
    renderProducts();
  }
  wireScrollReveal();
});

/* ——— Cart badge in header ——— */
function updateCartBadge() {
  var badges = document.querySelectorAll("[data-cart-count]");
  for (var i = 0; i < badges.length; i++) {
    var n = Cart.totalItems();
    badges[i].textContent = n > 0 ? "(" + n + ")" : "";
  }
}

/* ——— Cart drawer ——— */
function wireCartDrawer() {
  var openBtns = document.querySelectorAll("[data-open-cart]");
  var drawer = document.getElementById("cart-drawer");
  if (!drawer) return;

  var backdrop = document.getElementById("cart-backdrop");
  var closeBtn = drawer.querySelector("[data-close-cart]");
  var itemsWrap = drawer.querySelector("#cart-items");
  var subtotalEl = drawer.querySelector("[data-subtotal]");
  var shippingEl = drawer.querySelector("[data-shipping]");
  var totalEl = drawer.querySelector("[data-total]");
  var checkoutBtn = drawer.querySelector("[data-checkout-btn]");

  function open() {
    renderCart();
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  for (var i = 0; i < openBtns.length; i++) {
    openBtns[i].addEventListener("click", open);
  }
  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  checkoutBtn.addEventListener("click", function () {
    if (Cart.items.length === 0) return;
    close();
    window.location.href = "checkout.html";
  });

  drawer.render = renderCart;
}

function renderCart() {
  var drawer = document.getElementById("cart-drawer");
  var itemsWrap = drawer.querySelector("#cart-items");
  var subtotalEl = drawer.querySelector("[data-subtotal]");
  var shippingEl = drawer.querySelector("[data-shipping]");
  var totalEl = drawer.querySelector("[data-total]");
  var checkoutBtn = drawer.querySelector("[data-checkout-btn]");

  if (Cart.items.length === 0) {
    itemsWrap.innerHTML =
      '<div class="cart-empty">' +
      "<p>Your cart is empty.</p>" +
      '<p>Browse the collection to get started.</p>' +
      '<a class="btn btn-dark" href="shop.html">Start Shopping</a>' +
      "</div>";
  } else {
    var html = "";
    for (var i = 0; i < Cart.items.length; i++) {
      var item = Cart.items[i];
      html +=
        '<div class="cart-item">' +
        '<img src="' + item.image + '" alt="' + item.name + '" />' +
        '<div class="item-info">' +
        "<p>" + escapeHtml(item.name) + "</p>" +
        '<p class="item-size">Size US ' + item.size + "</p>" +
        '<div class="qty-row">' +
        '<div class="qty-ctrl">' +
        '<button data-dec="' + item.productId + "-" + item.size + '">−</button>' +
        "<span>" + item.quantity + "</span>" +
        '<button data-inc="' + item.productId + "-" + item.size + '">+</button>' +
        "</div>" +
        '<button class="remove-btn" data-remove="' + item.productId + "-" + item.size + '">Remove</button>' +
        "</div>" +
        "</div>" +
        "<span>" + formatPrice(item.price * item.quantity) + "</span>" +
        "</div>";
    }
    itemsWrap.innerHTML = html;

    itemsWrap.querySelectorAll("[data-dec]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var parts = btn.getAttribute("data-dec").split("-");
        Cart.updateQuantity(parseInt(parts[0]), parseFloat(parts[1]), CartQty(parts[0], parts[1]) - 1);
        renderCart();
        updateCartBadge();
      });
    });
    itemsWrap.querySelectorAll("[data-inc]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var parts = btn.getAttribute("data-inc").split("-");
        Cart.updateQuantity(parseInt(parts[0]), parseFloat(parts[1]), CartQty(parts[0], parts[1]) + 1);
        renderCart();
        updateCartBadge();
      });
    });
    itemsWrap.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var parts = btn.getAttribute("data-remove").split("-");
        Cart.removeItem(parseInt(parts[0]), parseFloat(parts[1]));
        renderCart();
        updateCartBadge();
      });
    });
  }

  subtotalEl.textContent = formatPrice(Cart.subtotal());
  shippingEl.textContent = Cart.shipping() === 0 ? "Free" : formatPrice(Cart.shipping());
  totalEl.textContent = formatPrice(Cart.total());
  checkoutBtn.disabled = Cart.items.length === 0;
}

/* Helper: find quantity of an item by id/size */
function CartQty(productId, size) {
  for (var i = 0; i < Cart.items.length; i++) {
    var item = Cart.items[i];
    if (String(item.productId) === String(productId) && String(item.size) === String(size)) {
      return item.quantity;
    }
  }
  return 0;
}

/* ——— Product modal (used by checkout for success too) ——— */
function openModal(product) {
  var overlay = document.getElementById("modal-overlay");
  var modalImg = document.getElementById("modal-img");
  var body = overlay.querySelector("#modal-body");

  modalImg.src = product.image;
  modalImg.alt = product.name;

  var priceHtml = formatPrice(product.price);
  if (product.oldPrice) {
    priceHtml += '<span class="old">' + formatPrice(product.oldPrice) + "</span>";
  }

  var sizesHtml = "";
  for (var i = 0; i < product.sizes.length; i++) {
    sizesHtml +=
      '<button type="button" class="size-btn" data-size="' + product.sizes[i] + '">' +
      product.sizes[i] +
      "</button>";
  }

  var metaHtml =
    "<div><span>" + "2–4 day" + "</span><br/>" + "shipping" + "</div>" +
    "<div><span>" + product.weight + "</span><br/>" + "weight" + "</div>" +
    "<div><span>" + product.drop + "</span><br/>" + "drop" + "</div>";

  body.innerHTML =
    '<button class="modal-close" data-close-modal aria-label="Close">' + closeSvg() + "</button>" +
    '<p class="micro tagline">' + escapeHtml(product.tagline) + "</p>" +
    "<h2>" + escapeHtml(product.name) + "</h2>" +
    '<p class="desc">' + escapeHtml(product.description) + "</p>" +
    '<p class="price">' + priceHtml + "</p>" +
    '<p class="size-label">Size — US</p>' +
    '<div class="sizes">' + sizesHtml + "</div>" +
    '<p class="size-hint">Pick a size to add to cart.</p>' +
    '<button class="add-btn" id="add-btn" disabled>Add to Cart</button>' +
    '<div class="modal-meta">' + metaHtml + "</div>";

  var selectedSize = null;
  var addBtn = body.querySelector("#add-btn");

  body.querySelectorAll(".size-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      body.querySelectorAll(".size-btn").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      selectedSize = parseFloat(btn.getAttribute("data-size"));
      addBtn.disabled = false;
    });
  });

  addBtn.addEventListener("click", function () {
    if (!selectedSize) return;
    Cart.addItem(product, selectedSize);
    updateCartBadge();
    addBtn.textContent = "Added — check the cart";
    addBtn.classList.add("added");
    showToast("Added " + product.name + " (US " + selectedSize + ")");
    setTimeout(function () {
      closeModal();
    }, 900);
  });

  body.querySelector("[data-close-modal]").addEventListener("click", closeModal);
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  var overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

/* Close modal on backdrop click and Escape */
document.addEventListener("click", function (e) {
  var overlay = document.getElementById("modal-overlay");
  if (overlay && overlay.classList.contains("open") && e.target === overlay) {
    closeModal();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    var overlay = document.getElementById("modal-overlay");
    var drawer = document.getElementById("cart-drawer");
    if (overlay && overlay.classList.contains("open")) closeModal();
    if (drawer && drawer.classList.contains("open")) {
      drawer.classList.remove("open");
      var bd = document.getElementById("cart-backdrop");
      if (bd) bd.classList.remove("open");
      document.body.style.overflow = "";
    }
  }
});

/* ——— Shop page: render products from the PRODUCTS array ——— */
function renderProducts() {
  var grid = document.getElementById("product-grid");
  var current = "all";
  var urlParams = new URLSearchParams(window.location.search);
  var catParam = urlParams.get("cat");
  if (catParam && CATEGORIES.indexOf(catParam) !== -1) {
    current = catParam;
  }

  function filter(cat) {
    current = cat;
    grid.innerHTML = "";
    var list = current === "all" ? PRODUCTS : PRODUCTS.filter(function (p) { return p.category === current; });
    for (var i = 0; i < list.length; i++) {
      grid.appendChild(buildCard(list[i]));
    }
    if (list.length === 0) {
      grid.innerHTML =
        '<p style="text-align:center;color:var(--muted);grid-column:1/-1;padding:3rem 0;">' +
        "Nothing in this category yet." +
        "</p>";
    }
  }

  for (var i = 0; i < PRODUCTS.length; i++) {
    grid.appendChild(buildCard(PRODUCTS[i]));
  }

  document.querySelectorAll("[data-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("[data-filter]").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      filter(btn.getAttribute("data-filter"));
    });
  });
}

function buildCard(product) {
  var card = document.createElement("button");
  card.className = "product-card reveal in-view";
  card.setAttribute("aria-label", "View " + product.name);
  card.innerHTML =
    '<div class="img-wrap"><img src="' + product.image + '" alt="' + escapeHtml(product.name) + '" loading="lazy" /></div>' +
    '<div class="info">' +
    "<h3>" + escapeHtml(product.name) + "</h3>" +
    '<p class="desc">' + escapeHtml(product.description) + "</p>" +
    '<div class="row">' +
    "<span>" + formatPrice(product.price) + "</span>" +
    '<span class="view">View</span>' +
    "</div>" +
    "</div>";
  card.addEventListener("click", function () {
    openModal(product);
  });
  return card;
}

/* ——— Toast ——— */
function showToast(message) {
  var existing = document.getElementById("toast");
  if (!existing) {
    existing = document.createElement("div");
    existing.id = "toast";
    existing.className = "toast";
    document.body.appendChild(existing);
  }
  existing.textContent = message;
  existing.classList.add("show");
  clearTimeout(existing._timer);
  existing._timer = setTimeout(function () {
    existing.classList.remove("show");
  }, 2200);
}

/* ——— Scroll reveal ——— */
function wireScrollReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in-view");
    });
    return;
  }
  var observer = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("in-view");
          observer.unobserve(entries[i].target);
        }
      }
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });
}

/* ——— Helpers ——— */
function escapeHtml(str) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function closeSvg() {
  return (
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
  );
}

/* Expose for inline use if needed */
window.openModal = openModal;
window.closeModal = closeModal;
