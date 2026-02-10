const authForm = document.getElementById('authForm');
const pageType = document.body.dataset.page;

const submitAuth = async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const payload = { email, password };
  if (pageType === 'register') {
    payload.name = nameInput.value;
  }

  const endpoint = pageType === 'register' ? 'signup' : 'login';
  const response = await fetch(`${API_BASE_URL}/auth/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    showAlert('authAlert', data.message || 'Authentication failed', 'error');
    return;
  }

  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  showAlert('authAlert', data.message || 'Success');

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 900);
};

authForm.addEventListener('submit', submitAuth);
