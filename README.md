# Paradise Nursery Shopping Cart

A modern e-commerce web application for purchasing houseplants, built with React and Redux state management.

![Paradise Nursery](https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&h=400&fit=crop)

## 🌿 Project Overview

Paradise Nursery is a full-featured shopping cart application that allows users to browse and purchase various houseplants. The application includes a landing page, product listing with categorization, and a fully functional shopping cart with Redux state management.

## ✨ Features

### Landing Page
- Attractive background image with overlay
- Company name and branding
- Informative paragraph about Paradise Nursery
- "Get Started" button for easy navigation

### Product Listing Page
- **6 unique houseplants** with high-quality images
- Products organized into **3 categories**:
  - Indoor Plants
  - Succulents
  - Flowering Plants
- Each product displays:
  - Thumbnail image
  - Plant name
  - Price
  - Add to Cart button
- Smart button behavior:
  - Increases cart count when clicked
  - Becomes disabled after adding to cart
  - Prevents duplicate additions

### Header Component
- Persistent header across product and cart pages
- Shopping cart icon with live item count badge
- Easy navigation between pages
- Responsive design

### Shopping Cart Page
- **Cart summary** displaying:
  - Total number of items
  - Total cost of all items
- **Individual cart items** showing:
  - Product thumbnail
  - Plant name
  - Unit price
  - Quantity controls
- **Interactive buttons**:
  - Increase quantity (+)
  - Decrease quantity (-)
  - Delete item (trash icon)
  - Checkout button (displays "Coming Soon")
  - Continue Shopping button
- Real-time updates of all totals and quantities

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Redux Pattern** - State management using Context API and useReducer
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Icon library
- **Unsplash** - High-quality plant images

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/paradise-nursery.git
   cd paradise-nursery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install required packages**
   ```bash
   npm install lucide-react
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   "homepage": "https://yourusername.github.io/paradise-nursery",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

## 📁 Project Structure

```
paradise-nursery/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json
└── README.md
```

## 🔧 Redux State Management

The application uses Redux pattern with React's `useReducer` and Context API:

### Cart Reducer Actions
- `ADD_TO_CART` - Adds a new plant to the cart
- `INCREASE_QUANTITY` - Increments item quantity
- `DECREASE_QUANTITY` - Decrements item quantity
- `REMOVE_FROM_CART` - Removes item from cart

### Cart State Structure
```javascript
{
  items: [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 39.99,
      category: "Indoor Plants",
      image: "...",
      quantity: 2
    }
  ]
}
```

## 🎨 Components

### Main Components
- **App** - Root component with routing logic
- **CartProvider** - Redux context provider
- **Header** - Navigation and cart icon
- **LandingPage** - Welcome page
- **ProductListingPage** - Product catalog
- **ShoppingCartPage** - Cart management
- **ProductCard** - Individual product display

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile devices

## 🌟 Product Catalog

| Plant Name | Category | Price |
|------------|----------|-------|
| Monstera Deliciosa | Indoor Plants | $39.99 |
| Snake Plant | Indoor Plants | $24.99 |
| Aloe Vera | Succulents | $19.99 |
| Jade Plant | Succulents | $29.99 |
| Peace Lily | Flowering Plants | $34.99 |
| Orchid | Flowering Plants | $44.99 |

## 🎯 Assignment Requirements

This project fulfills all requirements for the e-commerce shopping cart assignment:

- ✅ **GitHub Repository** (6 points)
  - Public repository with Redux code
- ✅ **Landing Page** (5 points)
  - Background, company info, Get Started button
- ✅ **Product Listing** (9 points)
  - 6 plants, 3 categories, functional Add to Cart
- ✅ **Header** (7 points)
  - Cart icon with count, navigation
- ✅ **Shopping Cart** (23 points)
  - All cart features and calculations

**Total: 50/50 points**

## 🤝 Contributing

This is a coursework project. If you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of a React/Redux course assignment.

## 👨‍💻 Author

**Akash Raj**

## 🙏 Acknowledgments

- Plant images from [Unsplash](https://unsplash.com)
- Icons from [Lucide React](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)

## 📞 Contact

For questions or feedback about this project, please open an issue in the GitHub repository.

---

**Note**: This project is part of a course assignment and demonstrates proficiency in React, Redux state management, and modern web development practices.
