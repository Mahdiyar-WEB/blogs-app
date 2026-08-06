# 🚀 Blogs App

<p align="center">
  A modern full-stack blog platform built with <b>Next.js App Router</b>, featuring an integrated admin panel, secure authentication, cloud media storage, dynamic SEO metadata, and a rich writing experience.
</p>

<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  </a>
  <a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </a>
  <a href="https://tanstack.com/query/latest">
    <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://motion.dev/">
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </a>
  <a href="https://aws.amazon.com/s3/">
    <img src="https://img.shields.io/badge/AWS_S3-Cloud_Storage-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS S3" />
  </a>
  <a href="https://liara.ir/">
    <img src="https://img.shields.io/badge/Liara-Deployment-5B21B6?style=for-the-badge" alt="Liara" />
  </a>
</p>

---

## 📚 Table of Contents

- [✨ Overview](#-overview)
- [🛠 Tech Stack](#-tech-stack)
- [🎯 Key Features](#-key-features)
- [🏗 Architecture Highlights](#-architecture-highlights)
- [⚡ Performance Optimizations](#-performance-optimizations)
- [🔐 Security](#-security)
- [🧠 Challenges Solved](#-challenges-solved)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [📜 Available Scripts](#-available-scripts)
- [☁️ Deployment](#️-deployment)
- [🖼 SEO & Social Sharing](#️-seo--social-sharing)
- [📌 Future Improvements](#-future-improvements)
- [👨‍💻 Author](#-author)

---

## ✨ Overview

**Blogs App** is a full-stack blogging platform built with **Next.js App Router** that combines a modern public-facing website with a dedicated **admin panel** for content management.

This project focuses on:

- ⚡ high performance and smooth UX
- 🔐 secure authentication and protected routes
- ☁️ cloud-based media handling
- 🧩 reusable architecture and scalable code structure
- 🧠 backend logic built directly inside Next.js using `app/api`
- 📈 SEO-ready blog pages with dynamic metadata and social preview images

---

## 🛠 Tech Stack

### 🎨 Frontend
- **Next.js**
- **React**
- **Tailwind CSS**
- **Framer Motion**
- **React Hook Form**
- **Yup**
- **TanStack Query**
- **React Hot Toast**
- **Context API**
- **Query String**
- **Date-fns**
- **Plaiceholder**

### 🧰 Backend
- **Next.js API Routes** via `app/api`
- **MongoDB**
- **Joi**
- **JWT**
- **Bcrypt**
- **Sanitize-html**

### ✍️ Editor / Content
- **Tiptap**
- **extension-code-block-lowlight**
- **highlight.js**

### ☁️ Infra / Deployment
- **AWS SDK S3 Client**
- **Liara**
- **Liara Object Storage / S3-Compatible Storage**

---

## 🎯 Key Features

### 🌐 Public Website
- Responsive blog UI for all screen sizes
- Search and sort support with URL query handling
- Blog listing with modern animations
- Single post page with optimized loading
- Custom `not-found` and `error` pages

### 🛡 Authentication & User Handling
- Secure login and profile flow
- **HTTP-only cookies** for maximum API security
- JWT-based authentication
- User state management with **Context API**
- Route protection using middleware/proxy logic

### 🧑‍💼 Admin Panel
- Admin and website separated using **route groups**
- Create, edit, and manage blog posts
- Upload/update cover images and profile images
- Rich text content creation experience
- Secure access to protected sections

### 📝 Content Creation
- Rich text editor built with **Tiptap**
- Code block support with syntax highlighting
- Sanitized HTML content before storing in database
- Validation on both frontend and backend

### 🖼 Media Management
- Upload and manage assets using **AWS S3 client**
- Store post cover images and user profile pictures in cloud storage
- Better image UX using **Plaiceholder blur previews**

---

## 🏗 Architecture Highlights

### 📂 Route Groups
The app uses **route groups** to clearly separate:
- `(website)` → public website
- `(admin)` → admin panel

This makes the structure cleaner, easier to maintain, and scalable for future features.

### 🔌 Backend Inside Next.js
Instead of using a separate backend service, the project handles backend logic directly inside:
- `app/api`

This approach keeps:
- the frontend and backend close together
- deployment simpler
- authentication flow easier to manage
- validation and request handling centralized

### ♻️ Reusability
The project includes:
- reusable UI components
- reusable animation hooks
- reusable API hooks using **TanStack Query**
- centralized utilities for cleaner logic

---

## ⚡ Performance Optimizations

Performance was a major focus during development.

### 🚀 Implemented Optimizations
- **Cache Components** for **PPR rendering**
- caching strategy for **post slug pages**
- **TanStack Query** for efficient API caching and fresh data updates
- **Plaiceholder** for base64 blur image placeholders
- smooth yet lightweight animations using **Framer Motion**

### ✅ Benefits
- faster initial page rendering
- improved perceived loading speed
- better content freshness
- smoother user experience on blog lists and modals

---

## 🔐 Security

Security is handled on multiple layers.

### 🛡 Security Practices
- **HTTP-only cookies** for authentication
- password hashing with **bcrypt**
- token generation using **JWT**
- frontend form validation with **React Hook Form + Yup**
- backend request validation with **Joi**
- HTML sanitization using **sanitize-html**
- route guarding for login and profile sections via **proxy/middleware**

### ✅ Result
This reduces the risk of:
- insecure auth token exposure
- invalid or malicious form submissions
- unsafe HTML content being stored or rendered

---

## 🧠 Challenges Solved

Here are some of the core challenges handled in this project:

- ⚙️ Used **cache components** for **PPR rendering**
- 📰 Applied cache strategy for **dynamic post slug pages**
- 🧭 Separated **admin panel** and **website** using **route groups**
- 🔌 Built backend logic inside `app/api` with **MongoDB**
- 🍪 Used **HTTP-only cookies** for more secure API authentication
- 🧩 Created **reusable components** across the project
- 👤 Managed user information using **Context API**
- 🎣 Built reusable hooks for:
  - animations
  - API interactions with **TanStack Query**
- 🛡 Developed `proxy.js` middleware logic for **login** and **profile** route protection
- 🔁 Built a protected demo reset mechanism to restore database collections and default assets every **3 hours**
- 🖼 Implemented dynamic **Open Graph** and **Twitter** images using `opengraph-image`
- 📱 Built a fully responsive UI with modern motion design
- ☁️ Integrated **AWS S3** for upload, retrieval, and update of static assets
- 🧾 Protected forms using **React Hook Form** and **Yup**
- 🔄 Used **TanStack Query** to keep content fresh
- ✍️ Built a rich blog editor using **Tiptap** and code highlighting extensions
- 🔑 Used **bcrypt** to hash and validate passwords
- ⏳ Used `intervalToDuration` from **date-fns** for readable duration calculation
- ✨ Added smooth animations for posts, components, and modals with **Framer Motion**
- ✅ Used **Joi** for backend API validation
- 🔐 Used **JWT** for token generation
- 🌫 Used **Plaiceholder** to generate blur placeholders for cover images
- 🔍 Used **query-string** to manage search and sorting options in the URL
- 🔔 Used **react-hot-toast** for feedback messages
- 🧼 Used **sanitize-html** to clean blog content before create/update operations
- 🚫 Added custom `not-found` and `error` pages
- ☁️ Configured **Liara** for both application deployment and cloud storage integration

---

## 📁 Project Structure
```bash
.
├── app/
│   ├── (website)/
│   ├── (admin)/
│   ├── api/
│   ├── not-found.js
│   ├── error.js
│   └── ...
├── components/
├── hooks/
├── context/
├── lib/
├── utils/
├── public/
├── proxy.js / middleware.js
└── ...
