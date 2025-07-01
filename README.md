# Cartzy - A Simple Ecommerce Backend System

## Project Overview

**Cartzy** is a RESTful backend system for an online shopping platform, built using **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**. It powers a full-featured ecommerce experience with user and admin roles, product and order management, cart and wishlist handling, return/exchange workflows, and personalized notifications.

---

## Project Structure Overview

```
Cartzy_Ecommerce_Backend_System/
│
├── controllers/            # Business logic for routes
│   ├── admin/              # Admin-specific logic (product, user, order, etc.)
│   └── user/               # User-specific logic (wishlist, cart, profile, etc.)
│
├── models/                 # Mongoose schemas for all entities
├── routes/                 # API route handlers
│   ├── admin/              # Admin endpoints
│   └── user/               # User endpoints
│
├── middlewares/            # Auth & access control
├── helpers/                # Utility functions (AWS S3 upload, etc.)
├── config/                 # DB connection & environment config
├── .env                    # Environment variables
├── server.js               # App entry point
└── package.json            # Node dependencies
```

---

## Prerequisites

Make sure the following tools are installed:

* [Node.js 18+](https://nodejs.org/en)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB
* [Postman](https://www.postman.com/) for API testing

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/02priyeshraj/Cartzy_Ecommerce_Backend_System.git
cd Cartzy_Ecommerce_Backend_System
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
AWS_REGION=<your_aws_region>
AWS_S3_BUCKET=<your_aws_bucket_name>
AWS_ACCESS_KEY_ID=<your_aws_key>
AWS_SECRET_ACCESS_KEY=<your_aws_secret>

```

### 4. Run the Server

```bash
npm run dev
```

By default, the server will run at: `http://localhost:5000`

---

## Routes Overview

### 👤 **User Routes** (`/api/user`)

| Route               | Description                                  | Auth Required  |
| ------------------- | -------------------------------------------- | -------------  |
| `/login`, `/signup` | User authentication (login/signup)           | ❌            |
| `/user`             | User profile and personal details            | ✅            |
| `/wishlist`         | Wishlist management (add, get, remove, move) | ✅            |
| `/cart`             | Cart operations (add, update, remove)        | ✅            |
| `/orders`           | Place and view orders                        | ✅            |
| `/order-tracking`   | Track user's order status                    | ✅            |
| `/return-exchange`  | Request return or exchange                   | ✅            |
| `/products`         | Browse and get product details               | ❌            |
| `/categories`       | View all categories                          | ❌            |
| `/brands`           | Browse brands                                | ❌            |
| `/home-page`        | Homepage content (banners, trending)         | ❌            |
| `/notifications`    | Get user notifications                       | ✅            |

---

### 🛠 **Admin Routes** (`/api/admin`)

| Route              | Description                                  | Auth Required |
| ------------------ | -------------------------------------------- | ------------- |
| `/auth`            | Admin login/auth                             | ❌            |
| `/user-management` | Manage users (view, disable, search, update) | ✅            |
| `/products`        | Product CRUD operations                      | ✅            |
| `/categories`      | Category CRUD operations                     | ✅            |
| `/brands`          | Brand creation, update, delete               | ✅            |
| `/orders`          | Manage customer orders                       | ✅            |
| `/notifications`   | Manage and send notifications                | ✅            |
| `/home-page`       | Set homepage banners, sections               | ✅            |
| `/profile`         | Admin profile info                           | ✅            |
| `/return-exchange` | Approve/reject return & exchange requests    | ✅            |
| `/postal-codes`    | Manage valid postal code zones               | ✅            |

> You can find route logic and handlers in the `/routes/admin/` and `/routes/user/` directories.

---

## API Testing – Postman Collection

Test endpoints using the Postman collection provided here:

📦 **[Download Postman Collection](docs\Ecommerce_Nodejs.postman_collection.json)**

> Import the collection into Postman and set your environment variables for JWT tokens, etc.

---

## Want to Contribute?

Pull requests, feature requests, and issue reports are welcome.

Let's build Cartzy better — together!

---

## License

MIT © [Priyesh Raj](https://github.com/02priyeshraj)

---
