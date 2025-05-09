// Simpan keranjang di localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity += 1;
      existing.total = existing.quantity * existing.price;
    } else {
      cart.push({...product, quantity: 1, total: product.price});
    }
    saveCart(cart);
    alert(`${product.name} ditambahkan ke keranjang.`);

  }
  
  function getCartProducts() {
    return getCart();
  }
  
  // Halaman Keranjang
  if (window.location.href.includes('keranjang.html')) {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutResult = document.getElementById('checkout-result');
    const pesanBtn = document.getElementById('pesan-dari-keranjang');
  
    function renderCart() {
      const cart = getCart();
      cartContainer.innerHTML = '';
      let total = 0;
  
      if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Keranjang masih kosong.</p>';
        checkoutBtn.disabled = true;
        if (pesanBtn) pesanBtn.disabled = true;
        cartTotal.textContent = 'Total: Rp 0';
        return;
      }
  
      cart.forEach(item => {
        total += item.total;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<strong>${item.name}</strong> - ${item.quantity} pcs - Rp ${item.total.toLocaleString('id-ID')}`;
        cartContainer.appendChild(div);

      });
  
      cartTotal.textContent = `Total: Rp ${total.toLocaleString('id-ID')}`;
      checkoutBtn.disabled = false;
      if (pesanBtn) pesanBtn.disabled = false;
    }
  
    checkoutBtn.addEventListener('click', () => {
      const cart = getCart();
      if (cart.length === 0) return;
      let message = '<h3>Ringkasan Pesanan:</h3><ul>';
      cart.forEach(p => {
        message += `<li>${p.name} - ${p.quantity} pcs - Rp ${p.total.toLocaleString('id-ID')}</li>`;

      });
      message += '</ul>';
      checkoutResult.innerHTML = message + '<p>Silakan lanjutkan konfirmasi via WhatsApp atau email kami.</p>';
      localStorage.removeItem('cart');
      renderCart();
    });
  
    // Tombol "Pesan Produk Ini" langsung ke pesan.html
    if (pesanBtn) {
      pesanBtn.addEventListener('click', () => {
        const cart = getCart();
        if (cart.length === 0) {
          alert('Keranjang masih kosong.');
          return;
        }
  
        localStorage.setItem('orderFromCart', JSON.stringify(cart));
        window.location.href = 'pesan.html';
      });
    }
  
    document.addEventListener('DOMContentLoaded', renderCart);
  }
  
  // Halaman Produk
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-add')?.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const name = btn.getAttribute('data-name');
        const price = parseInt(btn.getAttribute('data-price'));
        const image = btn.getAttribute('data-image');
        addToCart({id, name, price, image});
      });
    });
  });