// Checkout page logic

document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutItems();
    setupCheckoutForm();
});

// Load checkout items
function loadCheckoutItems() {
    const checkoutItems = document.getElementById('checkoutItems');
    
    if (!checkoutItems || cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="checkout-item-info">
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p class="cart-item-price">${formatPrice(item.price * item.quantity)}</p>
            </div>
        </div>
    `).join('');
    
    updateCheckoutSummary();
}

// Update checkout summary
function updateCheckoutSummary() {
    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? 10.00 : 0;
    const total = subtotal + shipping;
    
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const shippingEl = document.getElementById('checkoutShipping');
    const totalEl = document.getElementById('checkoutTotal');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = formatPrice(shipping);
    if (totalEl) totalEl.textContent = formatPrice(total);
}

// Setup checkout form
function setupCheckoutForm() {
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Validate forms
            const shippingForm = document.getElementById('shippingForm');
            const paymentForm = document.getElementById('paymentForm');
            
            if (shippingForm && paymentForm) {
                if (shippingForm.checkValidity() && paymentForm.checkValidity()) {
                    // Process order
                    processOrder();
                } else {
                    // Show validation errors
                    shippingForm.reportValidity();
                    paymentForm.reportValidity();
                }
            }
        });
    }
}

// Process order
function processOrder() {
    // Get form data
    const shippingData = {
        fullName: document.getElementById('fullName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value
    };
    
    const paymentData = {
        cardNumber: document.getElementById('cardNumber').value,
        expiryDate: document.getElementById('expiryDate').value,
        cvv: document.getElementById('cvv').value,
        cardholderName: document.getElementById('cardholderName').value
    };
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message and clear the cart
    
    alert('Order placed successfully! Thank you for your purchase.');
    
    // Clear cart
    clearCart();
    
    // Redirect to home
    window.location.href = 'index.html';
}
