const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const shippingAddress = document.getElementById('shippingAddress');

const loadCart = async () => {
  if (!token()) {
    cartList.innerHTML = '<p>Please login first.</p>';
    return;
  }

  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: authHeaders()
  });
  const cart = await response.json();

  if (!response.ok) {
    cartList.innerHTML = `<p>${cart.message || 'Unable to load cart'}</p>`;
    return;
  }

  if (!cart.length) {
    cartList.innerHTML = '<p>Your cart is empty.</p>';
    cartTotal.textContent = '₹0';
    return;
  }

  let total = 0;
  cartList.innerHTML = cart
    .map((item) => {
      const amount = item.product.price * item.quantity;
      total += amount;
      return `
        <article class="card">
          <h3>${item.product.name}</h3>
          <p>Quantity: ${item.quantity}</p>
          <p class="price">₹${amount}</p>
          <button class="btn" onclick="removeFromCart('${item.product._id}')">Remove</button>
        </article>
      `;
    })
    .join('');

  cartTotal.textContent = `₹${total}`;
};

const removeFromCart = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
    method: 'DELETE',
    headers: authHeaders()
  });

  if (response.ok) {
    loadCart();
  }
};

const checkout = async () => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ shippingAddress: shippingAddress.value })
  });

  const data = await response.json();

  if (!response.ok) {
    showAlert('cartAlert', data.message || 'Checkout failed', 'error');
    return;
  }

  showAlert('cartAlert', 'Order placed successfully');
  shippingAddress.value = '';
  loadCart();
};

loadCart();
