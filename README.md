# 🚀 DealXpress - The Ultimate Marketplace & Logistics Ecosystem


<p align="center">
  <a href="https://deal-xpress.vercel.app">
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  </a>
  <a href="https://dealxpress.onrender.com">
    <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render">
  </a>
  <a href="https://www.figma.com/design/pcZTA0YGwea3f4Zh6a7W9A/DealXpress?node-id=0-1&t=fa1ld6Br2HxuwlV2-0">
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma">
  </a>
  <a href="https://documenter.getpostman.com/view/50840642/2sBXqKnf6N">
    <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman">
  </a>
  <a href="https://your-video-link.com">
    <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube">
  </a>
</p>









---

**DealXpress** is a premium, full-stack e-commerce ecosystem designed to revolutionize how buyers and sellers interact. By integrating **Real-Time Price Negotiation** and **Instant Logistics Booking** into a single, seamless platform, DealXpress eliminates the friction between deal-making and delivery.

---

## 🔗 Live Demo & Documentation
- **Frontend (Live Site):** [https://deal-xpress.vercel.app](https://deal-xpress.vercel.app)
- **Backend (API Base):** [https://dealxpress.onrender.com](https://dealxpress.onrender.com)
- **API Documentation (Postman):** [https://documenter.getpostman.com/view/50840642/2sBXqKnf6N](https://documenter.getpostman.com/view/50840642/2sBXqKnf6N)
<<<<<<< HEAD
- **Figma Design (UI/UX):** [https://www.figma.com/design/pcZTA0YGwea3f4Zh6a7W9A/DealXpress?node-id=0-1](https://www.figma.com/design/pcZTA0YGwea3f4Zh6a7W9A/DealXpress?node-id=0-1)
- **Project Demo (YouTube):** [https://youtube.com/watch?v=your-video-id](https://youtube.com/watch?v=your-video-id)
=======
- **Figma Link(UI Design):** [https://www.figma.com/design/pcZTA0YGwea3f4Zh6a7W9A/DealXpress?node-id=0-1](https://www.figma.com/design/pcZTA0YGwea3f4Zh6a7W9A/DealXpress?node-id=0-1)
>>>>>>> e19b6989c1783d857ec0cea6fe256a1e17546f49

---

## ❓ The Problem Statement
In the current digital landscape, e-commerce platforms often impose a rigid, fixed-price model that fails to accommodate the dynamic nature of B2B or high-value C2C transactions. This lack of flexibility leads to:
*   **Fragmented Communication:** Buyers and sellers are forced to use third-party apps (WhatsApp, Email) to negotiate, leading to security risks and lost data.
*   **Logistics Disconnect:** After a price is agreed upon externally, there is often no direct link to a reliable delivery system, causing delays and friction.
*   **Lack of Transparency:** Real-time updates on offer statuses and shipping progress are rarely unified in a single dashboard.

---

## 💡 The Solution
**DealXpress** solves these challenges by providing an all-in-one ecosystem where negotiation and logistics coexist.
*   **Integrated Negotiation Engine:** A dedicated, real-time environment for making, countering, and accepting offers without leaving the platform.
*   **Seamless Logistics Integration:** Instant shipping quotes and one-click booking as soon as a deal is finalized.
*   **Unified Command Center:** A comprehensive analytics dashboard that tracks every stage of the transaction—from the first offer to the final delivery.

---

## 📸 Platform Preview

<p align="center">
  <img src="./Frontend/public/hero.png" alt="DealXpress Hero" width="100%">
</p>

<p align="center">
  <img src="./Frontend/public/negotiation.png" alt="Negotiation Room" width="49%">
  <img src="./Frontend/public/analytics.png" alt="Analytics Dashboard" width="49%">
</p>

<p align="center">
  <img src="./Frontend/public/tracking.png" alt="Delivery Tracking" width="49%">
  <img src="./Frontend/public/contact.png" alt="Support & Contact" width="49%">
</p>

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
| **Frontend Core** | React 19, Redux Toolkit, React Router 7, Axios |
| **UI & Styling** | Tailwind CSS 4, Material UI (MUI), Framer Motion, Spline (3D), Lucide Icons |
| **Backend Core** | Node.js, Express 5, Socket.io (Real-time), Express-Async-Handler |
| **Database & Auth** | MongoDB Atlas, Mongoose, JWT, Google OAuth 2.0, BcryptJS |
| **Experience** | Lenis (Smooth Scroll), React Flow, Recharts (Analytics), Lottie React |
| **Security & Utilities** | Helmet, Express-Rate-Limit, Morgan, Nodemailer, Validator |
| **Build & Tooling** | Vite, PostCSS, ESLint, Nodemon |

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

## 🔄 User Journey & Workflow

DealXpress is built around a logical flow that takes a user from product discovery to successful delivery.

```mermaid
graph TD
    A[Landing Page] -->|Explore| B[Marketplace]
    B -->|Interesting Product| C{Logged In?}
    C -- No --> D[Login/SignUp]
    D --> E[Product Details]
    C -- Yes --> E
    E -->|Interested| F[Make an Offer]
    F --> G[Negotiation Room]
    G -->|Real-time Chat| H{Offer Accepted?}
    H -- No --> G
    H -- Yes --> I[Book Logistics]
    I --> J[Order Tracking]
    J --> K[Analytics & History]
```

### 1. Discovery & Authentication
Users start at the **Landing Page** and move to the **Marketplace** to browse products. To perform any action (like making an offer), they must **Login** or **Sign Up**.

### 2. The Negotiation Phase
Once an offer is made, a dedicated **Negotiation Room** is created. Here, the buyer and seller communicate in real-time. Statuses like *Pending*, *Countered*, or *Accepted* update instantly across both dashboards.

### 3. Fulfillment & Logistics
As soon as a deal is struck (Offer Accepted), the **Logistics** module unlocks. Users can enter delivery details to get an instant quote and book shipping.

### 4. Tracking & Insights
Post-booking, users can monitor their order via the **Tracking System**. The **Analytics Dashboard** provides a bird's-eye view of all deals, spending patterns, and logistics history.

---

## 🛡️ Access Control & Routing

DealXpress implements a robust routing system with multi-level access control to ensure data security and a smooth user flow.

### 🌐 Public Routes (Accessible to Everyone)
*   **Landing Page (`/`):** Project introduction and core value proposition.
*   **Authentication:** `/login`, `/signup`, and `/forgot-password`.
*   **Marketplace (`/marketplace`):** Browse all available products without needing an account.
*   **Contact (`/contact`):** Get in touch with the support team.

### 🔐 Protected Routes (Login Required)
*   **Negotiations (`/negotiations`):** Manage active offers and view deal history.
*   **Negotiation Room (`/negotiation-room/:id`):** Real-time chat and deal-making interface.
*   **Logistics & Delivery (`/delivery`):** Book and track shipments.
*   **Analytics Dashboard (`/analytics`):** Visual data insights for buyers and sellers.
*   **Account Settings (`/account`):** Profile management and security configuration.

### ⚙️ How it Works
1.  **Auth Guard:** The `ProtectedRoute` component intercepts restricted routes, checking for a valid JWT token in the application state.
2.  **Redirect Logic:** Unauthenticated users attempting to access protected pages are automatically redirected to the `/login` page.
3.  **Persistence:** Login state is persisted via Redux Toolkit and validated against the backend on every session initialization.

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
