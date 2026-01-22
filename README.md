# Lucazon - Amazon Clone

A fully functional Amazon clone built with vanilla JavaScript, HTML, and CSS.

## Features

- 🏠 **Home Page** - Browse featured products with category filtering
- 🔍 **Search** - Search products by name or description
- 📦 **Product Details** - View detailed product information
- 🛒 **Shopping Cart** - Add, remove, and update quantities
- 💳 **Checkout** - Complete order process with form validation
- 💾 **Local Storage** - Cart persists across page refreshes

## Project Structure

```
lucazon-clone/
├── index.html          # Home page with product listings
├── product.html        # Product detail page
├── cart.html          # Shopping cart page
├── checkout.html      # Checkout page
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   ├── app.js         # Main application logic
│   ├── products.js    # Product data and utilities
│   ├── cart.js        # Cart management functions
│   ├── product-detail.js  # Product detail page logic
│   └── checkout.js    # Checkout page logic
└── images/            # Product images directory
```

## Getting Started

1. **Open the project**
   - Simply open `index.html` in your web browser
   - No build process or server required (works with file:// protocol)

2. **Browse products**
   - View featured products on the home page
   - Filter by category using the navigation menu
   - Search for specific products

3. **Add to cart**
   - Click on any product to view details
   - Select quantity and click "Add to Cart"
   - View cart by clicking the cart icon in the header

4. **Checkout**
   - Review items in cart
   - Click "Proceed to Checkout"
   - Fill in shipping and payment information
   - Place order

## Features Breakdown

### Home Page (`index.html`)
- Hero section
- Product grid with featured products
- Category navigation
- Search functionality
- Responsive design

### Product Detail Page (`product.html`)
- Large product image
- Product information (name, price, rating, description)
- Quantity selector
- Add to cart / Buy now buttons
- Product details list

### Shopping Cart (`cart.html`)
- List of cart items
- Quantity updates
- Remove items
- Order summary with subtotal, shipping, and total
- Proceed to checkout button

### Checkout Page (`checkout.html`)
- Shipping address form
- Payment method form
- Order summary
- Form validation
- Order processing

## Customization

### Adding Products

Edit `js/products.js` to add more products:

```javascript
{
    id: 9,
    name: "Product Name",
    price: 99.99,
    image: "path/to/image.jpg",
    category: "electronics",
    rating: 4.5,
    reviews: 100,
    description: "Product description here",
    details: ["Feature 1", "Feature 2", "Feature 3"]
}
```

### Styling

Modify `css/style.css` to customize the appearance:
- Colors: Update CSS variables or color values
- Layout: Adjust grid and flexbox properties
- Typography: Change font families and sizes

### Functionality

Extend functionality by modifying JavaScript files:
- `js/app.js` - Main app logic and navigation
- `js/cart.js` - Cart management
- `js/products.js` - Product data and search
- `js/product-detail.js` - Product page logic
- `js/checkout.js` - Checkout process

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with Flexbox and Grid
- **Vanilla JavaScript** - No frameworks or libraries
- **LocalStorage API** - Cart persistence

## Future Enhancements

- User authentication
- Product reviews and ratings
- Wishlist functionality
- Order history
- Backend integration
- Payment gateway integration
- Product images (currently using placeholders)
- Responsive mobile menu
- Product filtering and sorting

## License

This project is open source and available for educational purposes.
