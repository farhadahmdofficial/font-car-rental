# 🏎️ RentRide | Premium Cyberpunk Car Rental Service

RentRide is a modern, full-stack car rental platform featuring a sleek interface, robust authentication, and dynamic real-time vehicle grid telemetry. Built with Next.js 15, Tailwind CSS, and powered by a secure serverless backend.

🔗 **Live Application:** [https://font-car-rental.vercel.app/](https://font-car-rental.vercel.app/)  
🔗 **Backend Server Matrix:** Active on Vercel

---

## 🛠️ Technologies & Tools Used

### Frontend Architecture
- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) — Core Full-Stack React Framework (App Router).
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) — Component-driven UI rendering.
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) — Utility-first responsive design framework.
- ![daisyUI](https://img.shields.io/badge/daisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) — Cyberpunk/Modern theme & component library.

### Security & Database Ecosystem
- ![Better Auth](https://img.shields.io/badge/Better_Auth-FF4154?style=for-the-badge&logo=auth0&logoColor=white) — Advanced session management & Google OAuth 2.0 Identity Node.
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) — NoSQL Cloud Atlas Database for storing vehicle logs and user grid telemetry.
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) — Scalable JavaScript backend server runtime.

### DevOps & Utilities
- ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) — Edge Network Deployment & Hosting Engine.
- ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) — Distributed version control system.
- ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) — Source code hosting & documentation repository.

---

## 🚀 Key Features

* **Dynamic Vehicle Grid:** Seamlessly explore premium cars with real-time data fetched from a live MongoDB database.
* **Next-Gen Tech Stack:** Built using Next.js 15 (React 19 ecosystem) for hybrid rendering (SSR/CSR) and instant page transitions.
* **Secure Authentication:** Integrated with **Better Auth** and Google Sign-In for modern, node-secure user sessions.
* **Cyberpunk UI Elements:** Immersive tips and metrics panels styled with Tailwind CSS, custom animations, and a modern dark/light grid system.
* **Fully Responsive:** Designed mobile-first, adapting flawlessly across handheld devices, tablets, and wide-screen monitors.
* **Global Notification Matrix:** Instant UI feedback via `react-hot-toast` for smoother user experience loops.

---

## 📦 Project Directory Structure

```text
font-car-rental/
├── public/                 # Static assets (Favicons, Logos, Icons)
│   └── vercel1.png         # Main site favicon node
├── src/
│   ├── app/                # Next.js App Router Matrix
│   │   ├── layout.js       # Global Shell, Font Loading & Toast Providers
│   │   └── page.js         # Core Landing Page
│   ├── components/         # Reusable UI Architecture
│   │   ├── Navbar.jsx      # Dynamic Context Navigation Node
│   │   ├── Footer.jsx      # Layout Matrix Anchor
│   │   └── TipsSection.jsx # Cyberpunk Dashboard Telemetry Tips
│   └── globals.css         # Tailwind Injectors
├── .env.local              # Local configuration secret gate (Hidden)
├── package.json            # Dependency manifest
└── README.md               # Telemetry documentation