# 🚀 DealXpress - The Ultimate Marketplace & Logistics Ecosystem

<p align="center">
  <img src="./Frontend/public/hero.png" alt="DealXpress Hero" width="100%">
</p>


<p align="center">
  <a href="https://deal-xpress.vercel.app">
    <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel">
  </a>
  <a href="https://dealxpress.onrender.com">
    <img src="https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render">
  </a>
  <a href="https://www.figma.com/design/pcZTA0YGwea3f4Zh6a7W9A/DealXpress?node-id=0-1&t=fa1ld6Br2HxuwlV2-0">
    <img src="https://img.shields.io/badge/Design-Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma">
  </a>
</p>

<p align="center">
  🔗 <b>Figma Design:</b> <a href="https://www.figma.com/design/pcZTA0YGwea3f4Zh6a7W9A/DealXpress?node-id=0-1&t=fa1ld6Br2HxuwlV2-0">View Interactive Prototype</a>
</p>

---

**DealXpress** is a premium, full-stack e-commerce ecosystem designed to revolutionize how buyers and sellers interact. By integrating **Real-Time Price Negotiation** and **Instant Logistics Booking** into a single, seamless platform, DealXpress eliminates the friction between deal-making and delivery.

## 🔗 Live Demo
- **Frontend (Live Site):** [https://deal-xpress.vercel.app](https://deal-xpress.vercel.app)
- **Backend (API Base):** [https://dealxpress.onrender.com](https://dealxpress.onrender.com)

---

## ✨ Full Feature List

### 🔑 Authentication & Security
*   **Google OAuth 2.0:** Secure one-click social login.
*   **JWT Authentication:** Robust token-based auth for secure API access.
*   **RBAC (Role Based Access Control):** Distinct workflows for Buyers and Sellers.
*   **Password Recovery:** Secure forgot password flow with email verification.

### 🛒 Premium Marketplace
*   **Advanced Discovery:** Dynamic search, multi-category filtering, and smart sorting.
*   **Interactive UI:** Sleek product cards with hover effects and glassmorphic design.
*   **Rich Details:** Comprehensive product descriptions, specifications, and seller info.

### 🤝 Smart Negotiation System (The "Deal" in DealXpress)
*   **Make Offer:** Buyers can propose custom prices directly from product pages.
*   **Negotiation Room:** A dedicated real-time chat interface for buyers and sellers to discuss deals.
*   **Offer Lifecycle:** Interactive status tracking (Pending → Accepted → Rejected → Counter-Offer).
*   **Live Notifications:** Instant updates via Socket.io when an offer is received or updated.

### 🚚 Integrated Logistics & Tracking
*   **Instant Quotes:** Real-time delivery cost estimation based on pickup and drop-off points.
*   **One-Click Booking:** Seamlessly book delivery as soon as a deal is finalized.
*   **Step-by-Step Tracking:** Visual progress bar for order fulfillment and delivery status.

### 📊 Professional Analytics Dashboard
*   **Visual Insights:** Data visualization using Recharts for sales, offers, and spending trends.
*   **Activity Logs:** Detailed history of all negotiations, orders, and notifications.
*   **Account Management:** Profile customization, address management, and security settings.

---

## 🧱 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, Redux Toolkit, Framer Motion, Spline (3D), Recharts, Lucide Icons |
| **Backend** | Node.js, Express 5, Socket.io, JWT, Google OAuth, Express-Async-Handler, Morgan |
| **Database** | MongoDB Atlas, Mongoose |
| **Logistics** | Custom Pricing Algorithm & Tracking System |

---

## 📁 Project Structure

### 🖥️ Frontend (React + Vite)
```text
Frontend/
├── public/            # Static assets (Hero image, logos)
├── src/
│   ├── app/           # Redux store configuration
│   ├── features/      # Logic modules (Auth, Negotiation, Orders)
│   ├── components/    # Reusable UI (Modals, Cards, Nav, Layouts)
│   ├── pages/         # Screen components (Marketplace, Room, Analytics)
│   ├── services/      # API communication layers
│   ├── hooks/         # Custom React hooks (useAuth, useSocket)
│   ├── utils/         # Helper functions & constants
│   ├── routes/        # Protected & Public routing logic
│   └── assets/        # Lottie animations & Styles
```

### ⚙️ Backend (Node + Express)
```text
Backend/
├── src/
│   ├── controllers/   # Business logic (Deal flow, Analytics, Users)
│   ├── models/        # Mongoose Data Schemas (Negotiation, Order, Notification)
│   ├── routes/        # API endpoint definitions
│   ├── middleware/    # Auth, Error handling, & Rate limiting
│   ├── services/      # Third-party integrations (Google Auth, Email)
│   ├── sockets/       # Real-time event logic
│   ├── config/        # Database & Environment variables
│   └── app.js         # Express app initialization
├── index.js           # Server entry point
```

---

## ⚙️ Installation & Setup

1.  **Clone the Repo:**
    ```bash
    git clone https://github.com/Jilanmansuri/dealXpress.git
    cd dealXpress
    ```

2.  **Frontend Installation:**
    ```bash
    cd Frontend
    npm install
    npm run dev
    ```

3.  **Backend Installation:**
    ```bash
    cd Backend
    npm install
    # Setup .env (MONGO_URI, JWT_SECRET, GOOGLE_CLIENT_ID)
    npm run dev
    ```

---

## 📬 Contact & Support

**Jilan Mansuri**
📧 [jilan2410@gmail.com](mailto:jilan2410@gmail.com)
🌐 [Live Platform](https://deal-xpress.vercel.app)

---

## 📜 License
This project is licensed under the MIT License.
