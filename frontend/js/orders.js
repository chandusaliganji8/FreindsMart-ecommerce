const ordersList = document.getElementById('ordersList');

const loadOrders = async () => {
  if (!token()) {
    ordersList.innerHTML = '<p>Please login to view your orders.</p>';
    return;
  }

  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: authHeaders()
  });
  const orders = await response.json();

  if (!response.ok) {
    ordersList.innerHTML = `<p>${orders.message || 'Unable to fetch orders'}</p>`;
    return;
  }

  if (!orders.length) {
    ordersList.innerHTML = '<p>No orders yet.</p>';
    return;
  }

  ordersList.innerHTML = orders
    .map(
      (order) => `
      <article class="card">
        <h3>Order #${order._id.slice(-6).toUpperCase()}</h3>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Total:</strong> ₹${order.totalAmount}</p>
        <p><strong>Shipping:</strong> ${order.shippingAddress}</p>
        <p><strong>Items:</strong></p>
        <ul>
          ${order.items.map((item) => `<li>${item.name} x ${item.quantity}</li>`).join('')}
        </ul>
      </article>
    `
    )
    .join('');
};

loadOrders();
