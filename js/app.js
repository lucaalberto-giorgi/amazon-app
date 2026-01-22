// Main application logic

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load products on home page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadProducts();
        setupCategoryFilters();
        setupSearch();
    }
    
    // Load cart on cart page
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }
    
    // Update cart count
    updateCartCount();
    
    // Update account link if account.js is loaded
    if (typeof updateAccountLink === 'function') {
        updateAccountLink();
    }
}

// Load and display products
function loadProducts(category = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const productsToShow = getProductsByCategory(category);
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p>No products found.</p>';
        return;
    }
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="goToProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="rating">${generateStars(product.rating)} (${product.reviews})</div>
            <div class="price">${formatPrice(product.price)}</div>
        </div>
    `).join('');
}

// Setup category filters
function setupCategoryFilters() {
    const categoryLinks = document.querySelectorAll('.nav-link[data-category]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Load products for category
            loadProducts(category);
        });
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                const results = searchProducts(query);
                displaySearchResults(results);
            } else {
                loadProducts();
            }
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Display search results
function displaySearchResults(results) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    if (results.length === 0) {
        productsGrid.innerHTML = '<p>No products found matching your search.</p>';
        return;
    }
    
    productsGrid.innerHTML = results.map(product => `
        <div class="product-card" onclick="goToProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="rating">${generateStars(product.rating)} (${product.reviews})</div>
            <div class="price">${formatPrice(product.price)}</div>
        </div>
    `).join('');
}

// Navigate to product detail page
function goToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Load and display cart
function loadCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-actions">
                    <label>Quantity:</label>
                    <select onchange="updateCartItemQuantity(${item.id}, this.value)">
                        ${[1,2,3,4,5,6,7,8,9,10].map(q => 
                            `<option value="${q}" ${item.quantity === q ? 'selected' : ''}>${q}</option>`
                        ).join('')}
                    </select>
                    <button class="remove-btn" onclick="removeCartItem(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? 10.00 : 0;
    const total = subtotal + shipping;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = formatPrice(shipping);
    if (totalEl) totalEl.textContent = formatPrice(total);
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}

// Update cart item quantity
function updateCartItemQuantity(productId, quantity) {
    updateCartQuantity(productId, parseInt(quantity));
    loadCart();
}

// Remove cart item
function removeCartItem(productId) {
    removeFromCart(productId);
    loadCart();
}

// Proceed to checkout
if (document.getElementById('checkoutBtn')) {
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length > 0) {
            window.location.href = 'checkout.html';
        }
    });
}
