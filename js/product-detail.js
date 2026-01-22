// Product detail page logic

document.addEventListener('DOMContentLoaded', () => {
    loadProductDetail();
    setupAddToCart();
});

// Load product details
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }
    
    const product = getProductById(productId);
    
    if (!product) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update page title
    document.title = `${product.name} - Lucazon`;
    
    // Update breadcrumb
    const productCategory = document.getElementById('productCategory');
    const productName = document.getElementById('productName');
    if (productCategory) productCategory.textContent = product.category;
    if (productName) productName.textContent = product.name;
    
    // Update main image
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = product.image;
        mainImage.alt = product.name;
    }
    
    // Update thumbnails (using same image for now, can be extended)
    const thumbnailImages = document.getElementById('thumbnailImages');
    if (thumbnailImages) {
        thumbnailImages.innerHTML = `
            <img src="${product.image}" alt="Thumbnail" onclick="changeMainImage('${product.image}')">
        `;
    }
    
    // Update product info
    const productTitle = document.getElementById('productTitle');
    const productStars = document.getElementById('productStars');
    const productReviews = document.getElementById('productReviews');
    const productPrice = document.getElementById('productPrice');
    const productDescription = document.getElementById('productDescription');
    const productDetailsList = document.getElementById('productDetailsList');
    
    if (productTitle) productTitle.textContent = product.name;
    if (productStars) productStars.innerHTML = generateStars(product.rating);
    if (productReviews) productReviews.textContent = `(${product.reviews} reviews)`;
    if (productPrice) productPrice.textContent = formatPrice(product.price);
    if (productDescription) productDescription.textContent = product.description;
    
    if (productDetailsList && product.details) {
        productDetailsList.innerHTML = product.details.map(detail => 
            `<li>${detail}</li>`
        ).join('');
    }
}

// Change main image
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

// Setup add to cart functionality
function setupAddToCart() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            const quantity = parseInt(document.getElementById('productQuantity').value) || 1;
            
            if (productId) {
                addToCart(parseInt(productId), quantity);
                
                // Show feedback
                const originalText = addToCartBtn.textContent;
                addToCartBtn.textContent = 'Added to Cart!';
                addToCartBtn.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    addToCartBtn.textContent = originalText;
                    addToCartBtn.style.backgroundColor = '';
                }, 2000);
            }
        });
    }
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            const quantity = parseInt(document.getElementById('productQuantity').value) || 1;
            
            if (productId) {
                addToCart(parseInt(productId), quantity);
                window.location.href = 'checkout.html';
            }
        });
    }
}
