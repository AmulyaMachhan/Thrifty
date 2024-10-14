# Thrifty - E-commerce Store

Thrifty is a full-featured e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a seamless online shopping experience with a robust user authentication system, comprehensive admin management, and a modern, responsive user interface.

![thrifty](https://github.com/user-attachments/assets/49651e72-6b5a-413f-96b3-5dedd64df0ed)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Admin Management](#admin-management)
- [State Management](#state-management)
- [Frontend Components](#frontend-components)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Features

- **User Authentication**: Full user authentication (sign up, log in, password reset) using JWT tokens.
- **Profile Management**: Users can view and update their profile information.
- **Shopping Cart**: Add and remove products from the shopping cart, update quantities.
- **Favorites**: Add products to favorites for quick access.
- **Order History**: View order history with detailed order summaries.
- **Checkout**: Secure checkout process with payment integration (e.g., Stripe or PayPal).
- **Product Search**: Search and filter products by category, price, and more.
- **Slick Carousel**: Featured products displayed using a slick carousel for a smooth browsing experience.

### Admin Features

- **Dashboard**: Admin dashboard with product and order analysis using ApexCharts.
- **User Management**: Manage users, view and update user roles.
- **Category Management**: Create, update, and delete categories.
- **Product Management**: Create, update, and delete products with image upload functionality.
- **Order Management**: View, process, and update order statuses.
- **Analytics**: Monitor sales and order trends with interactive charts.

### Other Features

- **Responsive Design**: Built with Tailwind CSS and Flowbite for a responsive and modern UI.
- **Local Storage**: Persistent user session and cart data using local storage.
- **API Integration**: All front-end states and API calls are managed using Redux Toolkit.
- **Moment.js**: Date and time formatting for orders and other time-sensitive data.
- **Full CRUD Operations**: Complete Create, Read, Update, and Delete operations for products, categories, and users.

## Tech Stack

- **Frontend**: React.js, Redux Toolkit, Tailwind CSS, Flowbite
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Tokens (JWT)
- **Charts**: ApexCharts for data visualization
- **Date Formatting**: Moment.js
- **Carousel**: Slick Carousel for featured products
- **Storage**: LocalStorage for cart and session management

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/thrifty.git
   cd thrifty
   ```

2. **Install dependencies**:

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

## Environment Variables

Create a `.env` file in the `server` directory and add the following:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. **Start the backend server**:

   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend development server**:

   ```bash
   cd client
   npm start
   ```

3. **Open your browser** and go to `http://localhost:3000` to view the application.

## Admin Management

- **Accessing the Admin Dashboard**: Admin users can access the dashboard by logging in with admin credentials and navigating to `/admin/dashboard`.
- **Category Management**: Admins can create, update, and delete categories from the dashboard.
- **Product Management**: Manage products, including adding new products, updating details, and deleting products.
- **Order Management**: View, process, and update the status of orders.
- **User Management**: Manage user accounts, including updating user roles and deleting users if necessary.

## State Management

State management in Thrifty is handled using **Redux Toolkit**. The application state, including user authentication, product details, cart, and orders, is efficiently managed and stored using Redux.

- **API Calls**: API interactions are managed using `createSlice` and `createAsyncThunk` from Redux Toolkit.
- **State Persistence**: User sessions and cart data are persisted using LocalStorage.

## Frontend Components

Thrifty uses several key frontend components:

- **Slick Carousel**: Used for displaying featured products on the homepage.
- **ApexCharts**: Integrated into the admin dashboard for visualizing sales and order data.
- **Flowbite**: Provides UI components like modals, dropdowns, and forms, built on top of Tailwind CSS.
- **Tailwind CSS**: A utility-first CSS framework used for styling the entire application.

## Usage

To use Thrifty:

1. **Sign Up**: Create a new account by signing up.
2. **Browse Products**: Browse through different categories and products.
3. **Add to Cart**: Add desired products to your shopping cart.
4. **Checkout**: Proceed to checkout, enter your details, and confirm your order.
5. **Admin**: If you're an admin, log in to manage the store via the dashboard.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
