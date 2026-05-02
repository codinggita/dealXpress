# 🎨 DealXpress Frontend

<p align="center">
  <img src="../Frontend/public/hero.png" alt="DealXpress Hero" width="100%">
</p>

## ✨ The Vision
The **DealXpress Frontend** is a premium, high-performance web interface designed for the modern marketplace. It combines cutting-edge 3D visuals, fluid animations, and real-time state synchronization to deliver an unparalleled user experience.

---

## 🚀 Key Highlights
- **3D Immersion**: Integrated **Spline** for interactive 3D elements that make the UI feel alive.
- **Fluid Animations**: Powered by **Framer Motion** and **Lottie** for smooth transitions and micro-interactions.
- **Real-Time Synergy**: Seamless negotiation and chat updates using **Socket.io**.
- **Data Visuals**: Sophisticated analytics dashboards built with **Recharts**.
- **Smooth Interaction**: Integrated **Lenis** for high-end kinetic scrolling.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Core** | React 19, Vite, Redux Toolkit |
| **Styling** | Tailwind CSS 4, Framer Motion, Lucide Icons |
| **3D & Visuals** | Spline (react-spline), Lottie-React |
| **State & Data** | React Redux, Axios, Formik + Yup |
| **Components** | MUI (Material UI), ReactFlow, dnd-kit |
| **Authentication** | Google OAuth (@react-oauth/google) |
| **Utils** | React Hot Toast, EmailJS, Lenis |

---

## 📂 Project Architecture
The source code follows a modular and scalable structure:

```text
src/
├── app/          # Redux Store & Root Configuration
├── assets/       # Styles, Fonts, and Static Graphics
├── components/   # Atomic UI (Buttons, Cards, Modals, Skeleton)
├── features/     # Logic Slices (Auth, Negotiation, Orders, Analytics)
├── hooks/        # Custom Utility Hooks (useSocket, useAuth)
├── layouts/      # Main Shells (Navbar, Footer, Sidebar)
├── pages/        # Screen-level Components (Marketplace, Dashboard)
├── routes/       # Private & Public Navigation Logic
├── services/     # API Integration & External Clients
└── utils/        # Constants, Helpers, and Formatters
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- **Node.js**: v18 or higher recommended.
- **npm**: v9 or higher.

### 2. Environment Configuration
Create a `.env` file in the `Frontend/` root:
```env
VITE_BACKEND_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Quick Start
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

---

## 🧪 Development Scripts
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Generates optimized production assets.
- `npm run lint`: Performs static analysis to ensure code quality.
- `npm run preview`: Previews the production build locally.

---
*Created with ❤️ for the DealXpress Ecosystem*
