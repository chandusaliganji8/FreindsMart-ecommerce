const adminForm = document.getElementById('adminForm');
const adminProducts = document.getElementById('adminProducts');

const ensureAdmin = () => {
  const user = currentUser();
  if (!user || user.role !== 'admin') {
    document.body.innerHTML = '<div class="container"><p>Admin access only.</p></div>';
    return false;
  }
  return true;
};

const loadAdminProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  const products = await response.json();

  adminProducts.innerHTML = products
    .map(
      (product) => `
      <article class="card">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <button class="btn" onclick="deleteProduct('${product._id}')">Delete</button>
      </article>
    `
    )
    .join('');
};

const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });

  if (response.ok) {
    showAlert('adminAlert', 'Product deleted');
    loadAdminProducts();
  }
};

const submitAdminForm = async (event) => {
  event.preventDefault();

  const payload = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: Number(document.getElementById('price').value),
    category: document.getElementById('category').value,
    stock: Number(document.getElementById('stock').value),
    imageUrl: document.getElementById('imageUrl').value
  };

  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    showAlert('adminAlert', data.message || 'Could not add product', 'error');
    return;
  }

  showAlert('adminAlert', 'Product added successfully');
  adminForm.reset();
  loadAdminProducts();
};

if (ensureAdmin()) {
  adminForm.addEventListener('submit', submitAdminForm);
  loadAdminProducts();
}
