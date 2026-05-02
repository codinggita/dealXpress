# 🚀 DealXpress API Documentation

Welcome to the **DealXpress** API documentation. This documentation provides all the information you need to integrate with our backend services, similar to a Postman collection.

## 📌 Base URL
- **Local Development:** `http://localhost:5000/api`
- **Production:** `https://deal-xpress-backend.onrender.com/api` (or your specific production URL)
- **Postman Documentation:** [View on Postman](https://documenter.getpostman.com/view/50840642/2sBXqKnf6N)


---

## 🔐 Authentication
The API uses **JWT (JSON Web Tokens)** stored in HttpOnly cookies for authentication. Some endpoints require a valid token.

- **Header Requirement:** For some tools, you might need to include `Credentials: include` to send cookies.
- **Protected Routes:** Marked with 🛡️ below.

---

## 🚀 Postman Collection
For an interactive experience, you can access our public Postman documentation:
👉 **[DealXpress API Postman Collection](https://documenter.getpostman.com/view/50840642/2sBXqKnf6N)**

This collection includes:
- Ready-to-use request examples.
- Pre-configured environment variables.
- Automated test scripts (where applicable).

---


## 📂 API Endpoints

### 👤 User & Authentication (`/users`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Register a new user | Public |
| `POST` | `/login` | Login user & get token | Public |
| `POST` | `/google` | Google OAuth Login | Public |
| `POST` | `/logout` | Logout user & clear cookie | Public |
| `POST` | `/forgot-password` | Send OTP for password reset | Public |
| `POST` | `/verify-otp` | Verify OTP for password reset | Public |
| `POST` | `/reset-password` | Reset password using OTP | Public |
| `PUT` | `/profile` | Update user profile | 🛡️ |
| `PUT` | `/password` | Change user password | 🛡️ |

#### Sample Register Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "buyer" 
}
```

---

### 📦 Products (`/products`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all products | Public |
| `POST` | `/` | Create a new product | 🛡️ |
| `GET` | `/:id` | Get product by ID | Public |

#### Sample Create Product Body:
```json
{
  "name": "Gaming Laptop",
  "description": "High performance gaming laptop",
  "price": 1200,
  "category": "Electronics",
  "image": "base64_or_url",
  "stock": 10
}
```

---

### 🤝 Negotiations (`/negotiations`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Start a new negotiation | 🛡️ |
| `GET` | `/my` | Get all my negotiations | 🛡️ |
| `GET` | `/:id/messages` | Get messages for a negotiation | 🛡️ |
| `POST` | `/:id/message` | Send a message | 🛡️ |
| `POST` | `/:id/offer` | Submit a price offer | 🛡️ |
| `PUT` | `/:id/respond` | Accept/Reject an offer | 🛡️ |

#### Sample Start Negotiation:
```json
{
  "productId": "64f1...",
  "initialOffer": 1100
}
```

---

### 🛒 Orders (`/orders`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Create a new order | 🛡️ |
| `GET` | `/my` | Get my order history | 🛡️ |

#### Sample Create Order:
```json
{
  "orderItems": [
    {
      "product": "64f1...",
      "qty": 1,
      "price": 1200
    }
  ],
  "shippingAddress": "123 Street, City",
  "paymentMethod": "Stripe/PayPal",
  "totalPrice": 1200
}
```

---

### 📊 Analytics (`/analytics`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/seller` | Get seller dashboard data | 🛡️ (Seller/Admin) |
| `GET` | `/buyer` | Get buyer spending data | 🛡️ |

---

## ⚠️ Error Codes

| Status | Meaning | Description |
| :--- | :--- | :--- |
| `400` | Bad Request | Missing fields or invalid data |
| `401` | Unauthorized | No token or invalid token |
| `403` | Forbidden | User doesn't have permission |
| `404` | Not Found | Resource not found |
| `500` | Server Error | Internal server issues |

---

## 📡 Real-time Updates (Socket.io)
The application uses Socket.io for real-time negotiations.
- **Events:** `negotiation_message`, `new_offer`, `offer_response`.
- **Room:** Each negotiation has its own room based on `negotiationId`.

---

