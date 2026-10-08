# 🛍️ NovaCart — Full-Stack E-Commerce Web Application

A modern, full-stack e-commerce web application built with **Next.js, TypeScript, Tailwind CSS, and Supabase**. NovaCart provides a complete online shopping experience with product browsing, search, cart management, checkout, order tracking, authentication, and role-based admin management.

🔗 **Live Demo:** https://e-commerce-website-wheat-delta.vercel.app/
🔗 **GitHub:** https://github.com/mitesh02pujari-svg/E-Commerce-Website

---

## 📌 Project Overview

**NovaCart** is a full-stack e-commerce platform developed as part of **Thiranex Internship — Task 3: E-Commerce Web Application**.

The project focuses on implementing real-world e-commerce functionality including:

* Product catalog and categories
* Product search and filtering
* Shopping cart management
* Secure checkout
* Order creation and tracking
* User authentication
* Role-based access control
* Admin product management
* Admin category management
* Admin order management
* Database integration
* Responsive UI/UX

The application uses **Supabase** for authentication, PostgreSQL database services, and Row Level Security (RLS).

---

## ✨ Features

### 🛒 Customer Features

* 🔐 User registration and login
* 🏠 Modern e-commerce homepage
* 📦 Browse product catalog
* 🔎 Product search
* 🗂️ Category-based browsing
* 📄 Product detail pages
* 🛍️ Add products to cart
* ➕ Increase/decrease cart quantity
* 🗑️ Remove products from cart
* 💳 Checkout
* 📋 Order history
* 🚚 Order tracking
* 👤 User profile
* 📱 Responsive design

---

### 👨‍💼 Admin Features

Administrators have access to a dedicated dashboard.

#### Dashboard

* Overview of store activity
* Product statistics
* Order statistics
* Store management

#### Product Management

* View products
* Add new products
* Edit products
* Manage stock
* Activate/deactivate products
* Manage product information

#### Category Management

* View categories
* Add categories
* Edit category information
* Manage category data

#### Order Management

* View customer orders
* View individual order details
* Track order status
* Update order status

---

## 🔐 Authentication & Authorization

NovaCart implements authentication using **Supabase Auth**.

The application supports two roles:

| Role        | Access                                    |
| ----------- | ----------------------------------------- |
| 👤 User     | Shopping, cart, checkout, orders, profile |
| 👨‍💼 Admin | User features + complete store management |

Role-based access control prevents normal users from accessing administrative functionality.

---

## 🗄️ Database

NovaCart uses **Supabase PostgreSQL** as its database.

### Main Tables

```text
profiles
categories
products
cart_items
orders
order_items
```

### Database Relationships

```text
profiles
   │
   └── orders
          │
          └── order_items
                 │
                 └── products
                        │
                        └── categories

profiles
   │
   └── cart_items
          │
          └── products
```

The project also uses **Row Level Security (RLS)** to protect database operations.

---

## 🛡️ Security

The application includes:

* Supabase Authentication
* Role-based authorization
* PostgreSQL Row Level Security
* Protected admin routes
* Server-side checkout verification
* Stock validation
* Secure order creation
* Environment variables for sensitive configuration

Sensitive environment variables are stored locally and are **not committed to GitHub**.

---

## 🧰 Tech Stack

### Frontend

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Lucide React**

### Backend

* **Next.js App Router**
* **Server-side APIs**
* **Supabase**

### Database

* **PostgreSQL**
* **Supabase**

### Authentication

* **Supabase Auth**

### Deployment

* **Vercel**

### Development Tools

* **Git**
* **GitHub**
* **VS Code / Antigravity**
* **ESLint**
* **TypeScript**

---

## 📁 Project Structure

```text
E-Commerce/
│
├── app/
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── categories/
│   │   └── orders/
│   │
│   ├── products/
│   ├── categories/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── login/
│   ├── signup/
│   ├── profile/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── admin/
│   ├── auth/
│   ├── ecommerce/
│   ├── layout/
│   └── ui/
│
├── lib/
│   ├── supabase/
│   ├── constants.ts
│   └── utils.ts
│
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── README.md
│
├── types/
│   ├── database.ts
│   └── index.ts
│
├── public/
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mitesh02pujari-svg/E-Commerce-Website.git
```

### 2. Navigate to the project

```bash
cd E-Commerce-Website
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
```

> Never commit `.env.local` or expose Supabase secret/service-role keys.

### 5. Configure Supabase

Create a Supabase project and execute the database migration located at:

```text
supabase/migrations/20261007000000_init_schema.sql
```

Then populate the database using:

```text
supabase/seed.sql
```

The seed data contains:

* 6 product categories
* 18 products

### 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 👤 Creating an Admin User

Create a normal account through the application's signup page.

Then update the user's role in Supabase:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'YOUR_EMAIL';
```

After changing the role:

```text
Logout → Login again → /admin
```

The user will then have access to the admin dashboard.

---

## 🧪 Testing

The project was tested using:

### TypeScript

```bash
npx tsc --noEmit
```

Result:

```text
0 errors
```

### ESLint

```bash
npm run lint
```

Result:

```text
0 errors
0 warnings
```

### Production Build

```bash
npm run build
```

Result:

```text
Build successful
```

---

## 🌐 Deployment

NovaCart is deployed using **Vercel**.

### Production URL

**https://e-commerce-website-wheat-delta.vercel.app/**

### Admin Dashboard

**https://e-commerce-website-wheat-delta.vercel.app/admin**

The production deployment uses the same Supabase backend and database as the local development environment.

---

## 🔄 Application Flow

### Customer Shopping Flow

```text
Visit NovaCart
      ↓
Browse Products
      ↓
Search / Filter
      ↓
View Product
      ↓
Add to Cart
      ↓
Review Cart
      ↓
Checkout
      ↓
Order Created
      ↓
Order Tracking
```

### Admin Flow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Manage Products
     ↓
Manage Categories
     ↓
Manage Orders
     ↓
Update Order Status
```

---

## 📊 Core Modules

| Module         | Description                         |
| -------------- | ----------------------------------- |
| Authentication | User registration and login         |
| Authorization  | User/Admin role management          |
| Products       | Product catalog and details         |
| Categories     | Product categorization              |
| Search         | Product and order search            |
| Cart           | Shopping cart management            |
| Checkout       | Order creation and stock validation |
| Orders         | Order history and tracking          |
| Admin          | Store management dashboard          |
| Database       | PostgreSQL via Supabase             |
| Security       | Authentication + RLS                |
| Deployment     | Vercel production deployment        |

---

## 🎯 Internship Task

**Internship:** Thiranex Internship
**Task:** Task 3 — E-Commerce Web Application

### Objective

Build a full-stack e-commerce application with:

* Product catalog
* Shopping cart
* Checkout
* Authentication
* Role-based access
* Backend APIs
* Database integration
* Product management
* Order tracking

NovaCart implements these requirements using a modern full-stack architecture.

---

## 📚 What I Learned

Through this project, I gained practical experience with:

* Building full-stack applications using Next.js
* Next.js App Router
* TypeScript in a real-world project
* PostgreSQL database design
* Supabase authentication
* Row Level Security
* Role-based authorization
* CRUD operations
* Shopping cart architecture
* Order management systems
* Stock management
* Server-side validation
* Responsive UI development
* Git and GitHub workflows
* Production deployment with Vercel

---

## 🔮 Future Improvements

Possible future enhancements include:

* 💳 Real payment gateway integration
* ❤️ Wishlist functionality
* ⭐ Product reviews and ratings
* 📧 Order confirmation emails
* 🎟️ Coupons and discount codes
* 📊 Advanced sales analytics
* 📦 Improved inventory management
* 🔔 Real-time order notifications
* 🤖 AI-powered product recommendations

---

## 👨‍💻 Developer

**Mitesh Pujari**

Electronics & Computer Engineering Student

### Connect

* GitHub: https://github.com/mitesh02pujari-svg
* LinkedIn: https://www.linkedin.com/

---

## 📄 License

This project was created for educational and internship purposes.

---

⭐ If you find this project useful, consider giving the repository a star!
