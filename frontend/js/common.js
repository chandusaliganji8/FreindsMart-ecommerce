const setAuthNav = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const authLinks = document.getElementById('authLinks');
  if (!authLinks) return;

  if (user) {
    authLinks.innerHTML = `
      <a href="/frontend/pages/orders.html">My Orders</a>
      <a href="/frontend/pages/cart.html">Cart</a>
      ${user.role === 'admin' ? '<a href="/frontend/pages/admin.html">Admin</a>' : ''}
      <button id="logoutBtn">Logout</button>
    `;
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/frontend/pages/login.html';
    });
  } else {
    authLinks.innerHTML = `
      <a href="/frontend/pages/login.html">Login</a>
      <a href="/frontend/pages/register.html">Register</a>
      <a href="/frontend/pages/cart.html">Cart</a>
    `;
  }
};

const showMessage = (el, message, type = 'success') => {
  if (!el) return;
  el.innerHTML = `<div class="message ${type}">${message}</div>`;
};

setAuthNav();
