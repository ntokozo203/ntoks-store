/* STRIDE cart — plain JavaScript, persisted to localStorage.
   Exposes a simple Cart object used across pages. */

var CART_KEY = "stride_cart";

var Cart = {
  items: [],

  load: function () {
    try {
      var raw = localStorage.getItem(CART_KEY);
      this.items = raw ? JSON.parse(raw) : [];
    } catch (e) {
      this.items = [];
    }
  },

  save: function () {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(this.items));
    } catch (e) {
      /* storage unavailable — cart stays in memory */
    }
  },

  addItem: function (product, size) {
    var key = product.id + "-" + size;
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      if (item.productId === product.id && item.size === size) {
        item.quantity += 1;
        this.save();
        return;
      }
    }
    this.items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1,
    });
    this.save();
  },

  updateQuantity: function (productId, size, quantity) {
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      if (item.productId === productId && item.size === size) {
        if (quantity <= 0) {
          this.items.splice(i, 1);
        } else {
          item.quantity = quantity;
        }
        this.save();
        return;
      }
    }
  },

  removeItem: function (productId, size) {
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      if (item.productId === productId && item.size === size) {
        this.items.splice(i, 1);
        this.save();
        return;
      }
    }
  },

  clear: function () {
    this.items = [];
    this.save();
  },

  totalItems: function () {
    var n = 0;
    for (var i = 0; i < this.items.length; i++) {
      n += this.items[i].quantity;
    }
    return n;
  },

  subtotal: function () {
    var s = 0;
    for (var i = 0; i < this.items.length; i++) {
      s += this.items[i].price * this.items[i].quantity;
    }
    return s;
  },

  shipping: function () {
    return this.subtotal() >= 120 || this.subtotal() === 0 ? 0 : 12;
  },

  total: function () {
    return this.subtotal() + this.shipping();
  },
};

/* Load cart on every page */
Cart.load();
