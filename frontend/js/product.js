const productDetails = document.getElementById('productDetails');
const productAlert = document.getElementById('productAlert');

const getProductId = () => new URLSearchParams(window.location.search).get('id');

const addToCart = async (productId) => {
  if (!token()) {
    showAlert('productAlert', 'Please login to add products to cart', 'error');
    return;
  }

  const response = await fetch(`${API_BASE_URL}/cart/add`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ productId, quantity: 1 })
  });

  const data = await response.json();

  if (!response.ok) {
    showAlert('productAlert', data.message || 'Unable to add to cart', 'error');
    return;
  }

  showAlert('productAlert', 'Item added to cart');
};

const loadProduct = async () => {
  const productId = getProductId();
  if (!productId) {
    productDetails.innerHTML = '<p>Invalid product ID.</p>';
    return;
  }

  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  const product = await response.json();

  if (!response.ok) {
    productDetails.innerHTML = `<p>${product.message || 'Product not found'}</p>`;
    return;
  }

  productDetails.innerHTML = `
    <article class="card">
      <img src="${product.imageUrl}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Stock:</strong> ${product.stock}</p>
      <p class="price">₹${product.price}</p>
      <button class="btn" id="addToCartBtn">Add to Cart</button>
    </article>
  `;

  document.getElementById('addToCartBtn').addEventListener('click', () => addToCart(productId));
};

loadProduct();
