// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        image: "images/headphones.jpg",
        category: "electronics",
        rating: 4.5,
        reviews: 1234,
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        details: ["Bluetooth 5.0", "Noise Cancellation", "30h Battery", "Quick Charge"]
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 249.99,
        image: "images/smartwatchpro.jpg",
        category: "electronics",
        rating: 4.7,
        reviews: 856,
        description: "Feature-rich smartwatch with fitness tracking, heart rate monitor, and smartphone integration.",
        details: ["Fitness Tracking", "Heart Rate Monitor", "Water Resistant", "7-day Battery"]
    },
    {
        id: 3,
        name: "Classic Denim Jeans",
        price: 49.99,
        image: "images/jeans.jpg",
        category: "clothing",
        rating: 4.3,
        reviews: 567,
        description: "Comfortable and stylish classic fit denim jeans. Perfect for everyday wear.",
        details: ["100% Cotton", "Classic Fit", "Machine Washable", "Multiple Sizes"]
    },
    {
        id: 4,
        name: "Cotton T-Shirt",
        price: 19.99,
        image: "images/cottonshirt.jpg",
        category: "clothing",
        rating: 4.2,
        reviews: 892,
        description: "Soft and comfortable cotton t-shirt available in multiple colors.",
        details: ["100% Cotton", "Machine Washable", "Multiple Colors", "Unisex"]
    },
    {
        id: 5,
        name: "PlayStation 5 DualSense Controller",
        price: 69.99,
        image: "images/controller.jpg",
        category: "gaming",
        rating: 4.9,
        reviews: 3421,
        description: "Experience gaming like never before with the PS5 DualSense wireless controller. Features haptic feedback, adaptive triggers, and built-in microphone.",
        details: ["Haptic Feedback", "Adaptive Triggers", "Built-in Microphone", "USB-C Charging", "Battery Life: 12-15 hours"]
    },
    {
        id: 6,
        name: "PlayStation 5 Console",
        price: 499.99,
        image: "images/ps5console.jpg",
        category: "gaming",
        rating: 4.8,
        reviews: 5234,
        description: "Next-generation gaming console with lightning-fast SSD, ray tracing, and 4K gaming. Includes one DualSense wireless controller.",
        details: ["825GB SSD", "4K Gaming", "Ray Tracing", "Backward Compatible", "Includes DualSense Controller"]
    },
    {
        id: 9,
        name: "PlayStation 5 Gaming Headset",
        price: 99.99,
        image: "images/headset.jpg",
        category: "gaming",
        rating: 4.7,
        reviews: 1892,
        description: "Premium wireless gaming headset designed for PS5. Features 3D audio, noise-canceling microphone, and comfortable over-ear design.",
        details: ["3D Audio", "Noise-Canceling Mic", "Wireless", "20-hour Battery", "Comfortable Design"]
    },
    {
        id: 7,
        name: "Premium Oven Pan",
        price: 49.99,
        image: "images/panoven.jpg",
        category: "home",
        rating: 4.6,
        reviews: 892,
        description: "High-quality non-stick oven pan perfect for baking, roasting, and cooking. Durable construction with even heat distribution.",
        details: ["Non-Stick Coating", "Oven Safe up to 450°F", "Dishwasher Safe", "Durable Construction", "Even Heat Distribution"]
    },
    {
        id: 8,
        name: "Coffee Maker Deluxe",
        price: 89.99,
        image: "images/coffemaker.jpg",
        category: "home",
        rating: 4.5,
        reviews: 923,
        description: "Programmable coffee maker with thermal carafe and auto-shutoff feature.",
        details: ["12-Cup Capacity", "Programmable", "Thermal Carafe", "Auto Shutoff"]
    }
];

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Get products by category
function getProductsByCategory(category) {
    if (!category || category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Search products
function searchProducts(query) {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
}

// Format price
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    if (hasHalfStar) {
        starsHTML += '½';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '☆';
    }
    
    return starsHTML;
}
