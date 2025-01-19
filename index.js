require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

//Importing Admin Routes
const adminAuthRoutes = require('./routes/admin/authRoutes');
const categoryRoutes = require('./routes/admin/categoryRoutes');
const productRoutes = require('./routes/admin/productRoutes');
const notificationRoutes = require('./routes/admin/notificationRoutes');
const homePageRoutes = require('./routes/admin/adminHomePageRoutes');
const orderRoutes = require('./routes/admin/orderRoutes');
const adminUserRoutes = require('./routes/admin/adminUserRoutes');
const profileRoutes = require('./routes/admin/profileRoutes');

//Importing User Routes
const userRoutes = require('./routes/user/userRoutes');
const userHomePageRoutes = require('./routes/user/userHomePageRoutes');

// Initialize Express
const app = express();

// Middleware
app.use(express.json());

// Admin Routes
app.use('/api/admin/home-page', homePageRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/categories', categoryRoutes);
app.use('/api/admin/products', productRoutes);
app.use('/api/admin/notifications', notificationRoutes);
app.use('/api/admin/orders', orderRoutes);
app.use('/api/admin', adminUserRoutes);
app.use('/api/admin', profileRoutes);

//User Routes
app.use('/api/user', userRoutes);
app.use('/api/user/home-page', userHomePageRoutes);


// Connect to Database
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
