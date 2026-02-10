const productGrid = document.getElementById('productGrid');
const userName = document.getElementById('userName');
const adminLink = document.getElementById('adminLink');

const initNavbar = () => {
  const user = currentUser();
  userName.textContent = user ? `Hi, ${user.name}` : 'Guest';

  if (user && user.role === 'admin') {
    adminLink.style.display = 'inline-block';
  }
};

const loadProducts = async () => {
  productGrid.innerHTML = 'Loading products...';

  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const products = await response.json();

    if (!products.length) {
      productGrid.innerHTML = '<p>No products available yet.</p>';
      return;
    }

    productGrid.innerHTML = products
      .map(
        (product) => `
          <article class="card">
            <img src="${product.imageUrl}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description.slice(0, 75)}...</p>
            <p class="price">₹${product.price}</p>
            <a class="btn" href="product.html?id=${product._id}">View Details</a>
          </article>
        `
      )
      .join('');
  } catch (error) {
    productGrid.innerHTML = '<p>Failed to load products.</p>';
  }
};

initNavbar();
loadProducts();
