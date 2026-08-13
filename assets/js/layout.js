document.addEventListener("DOMContentLoaded", function () {
  injectSharedLayout();
});

function injectSharedLayout() {
  var headerTarget = document.querySelector("[data-layout-header]");
  var footerTarget = document.querySelector("[data-layout-footer]");

  if (headerTarget) {
    headerTarget.innerHTML = buildHeaderMarkup();
  }

  if (footerTarget) {
    footerTarget.innerHTML = buildFooterMarkup();
  }

  bindMobileMenu();

  if (typeof updateCartBadge === "function") {
    updateCartBadge();
  }
}

function buildHeaderMarkup() {
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  var links = [
    { href: "index.html", label: "Home", active: currentPage === "index.html" || currentPage === "" },
    { href: "shop.html", label: "Shop", active: currentPage === "shop.html" },
    { href: "index.html#collection", label: "Collection", active: false },
    { href: "index.html#about", label: "About", active: false }
  ];

  var navLinks = links
    .map(function (link) {
      var className = link.active ? " class=\"active\"" : "";
      return '<a href="' + link.href + '"' + className + ">" + link.label + "</a>";
    })
    .join("");

  return [
    '<header class="site-header">',
    '  <div class="container">',
    '    <a href="index.html" class="logo">NTOKS<span>.</span></a>',
    '    <nav class="nav-links">' + navLinks + "</nav>",
    '    <div>',
    '      <button class="cart-btn" data-open-cart aria-label="Open cart">',
    '        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    '        <span class="hide-mobile" style="font-size:inherit">Cart</span>',
    '        <span data-cart-count class="cart-count"></span>',
    '      </button>',
    '      <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">',
    '        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>',
    '      </button>',
    '    </div>',
    '  </div>',
    '  <nav class="mobile-nav" id="mobile-nav">',
    '    <a href="index.html">Home</a>',
    '    <a href="shop.html">Shop</a>',
    '    <a href="index.html#collection">Collection</a>',
    '    <a href="index.html#about">About</a>',
    '  </nav>',
    '</header>'
  ].join("");
}

function buildFooterMarkup() {
  return [
    '<footer class="site-footer">',
    '  <div class="container">',
    '    <div class="footer-grid">',
    '      <div class="brand">',
    '        <p style="font-size:1.1rem;font-weight:600;color:var(--bg);opacity:1">NTOKS<span style="opacity:.5">.</span></p>',
    '        <p>Simple sneakers for everyday miles.</p>',
    '      </div>',
    '      <div class="footer-links">',
    '        <div class="footer-col">',
    '          <p>Shop</p>',
    '          <ul>',
    '            <li><a href="shop.html">All Sneakers</a></li>',
    '            <li><a href="shop.html?cat=running">Running</a></li>',
    '            <li><a href="shop.html?cat=lifestyle">Lifestyle</a></li>',
    '          </ul>',
    '        </div>',
    '        <div class="footer-col">',
    '          <p>Company</p>',
    '          <ul>',
    '            <li><a href="index.html#about">Our Story</a></li>',
    '          </ul>',
    '        </div>',
    '      </div>',
    '    </div>',
    '    <div class="footer-bottom">',
    '      <span>© 2026 NTOKS All Rights reserved.</span>',
    '      <span>A portfolio project — prices are simulated</span>',
    '    </div>',
    '  </div>',
    '</footer>'
  ].join("");
}

function bindMobileMenu() {
  var toggle = document.getElementById("mobile-toggle");
  var nav = document.getElementById("mobile-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
}
