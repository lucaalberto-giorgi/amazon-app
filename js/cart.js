// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
}

// Update item quantity in cart
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
        }
    }
    updateCartCount();
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    const count = getCartItemCount();
    cartCountElements.forEach(el => {
        if (el) el.textContent = count;
    });
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
}

// Initialize cart count on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        updateCartCount();
    });
}
