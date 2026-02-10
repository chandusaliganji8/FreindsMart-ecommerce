// Central API base URL used by all frontend scripts.
const API_BASE_URL = 'http://localhost:5000/api';

const token = () => localStorage.getItem('token');
const currentUser = () => {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
};

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: token() ? `Bearer ${token()}` : ''
});

const showAlert = (targetId, message, type = 'success') => {
  const alertBox = document.getElementById(targetId);
  if (!alertBox) return;

  alertBox.className = `alert ${type}`;
  alertBox.textContent = message;
  setTimeout(() => {
    alertBox.textContent = '';
    alertBox.className = '';
  }, 3000);
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
};
