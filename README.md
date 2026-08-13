# NTOKS — Sneaker Store

A minimal sneaker e-commerce demo built with **plain HTML, CSS, and JavaScript only** — no frameworks, no build tools. Built as a CV/portfolio attachment.

## How it works

| Page | File | Purpose |
|---|---|---|
| Landing | `index.html` | Hero with runner image, calm headline, and a centered **Explore** button linking to the shop |
| Shop | `shop.html` | All product cards rendered dynamically from a plain `PRODUCTS` array in `products.js` using JavaScript loops |
| Checkout | `checkout.html` | Shipping details → simulated card payment → order confirmation |

| Script | File | Purpose |
|---|---|---|
| Catalog | `products.js` | Plain JavaScript array of 8 products — images, prices, sizes |
| Cart | `cart.js` | Cart logic with `localStorage` persistence (add, update, remove, totals) |
| UI | `app.js` | Cart drawer, product modal with size picker, category filters, toast feedback |
| Checkout | `checkout.js` | Form validation, simulated payment with processing spinner, success state |

## Running it

Open `index.html` directly in a browser, or serve the folder with any static server, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

Push the folder contents (all files including `images/`) to a repository, then enable
**Settings → Pages → Deploy from branch → main → / (root)**. Alternatively, drop the
files into the root of your `username.github.io` repository.

## Flow to try

Landing → click **Explore** → click any sneaker → pick a size → **Add to Cart** →
open the cart (top right) → **Proceed to Checkout** → fill shipping → fill any card
details → pay (simulated) → confirmation with an order number.

> Note: payment is entirely simulated. Nothing is charged and no data leaves the browser.
