# React E-Commerce Website

A modern e-commerce web application built with **React 19**, featuring product browsing, shopping cart management, and user authentication.

## Features

- **Product Catalog** — Browse products by categories (laptops, smartphones, shirts, shoes, watches, etc.) using the [DummyJSON API](https://dummyjson.com/)
- **Product Details** — View product descriptions, images, pricing, and reviews
- **Shopping Cart** — Add/remove items, adjust quantities, with persistent storage via `localStorage`
- **User Authentication** — Sign up, log in, and session management powered by **Supabase Auth**
- **Protected Routes** — Cart page is accessible only to authenticated users
- **Animations** — Page transitions and UI animations using **Framer Motion**
- **Responsive Design** — Optimized for various screen sizes with modern CSS
- **Toast Notifications** — User-friendly feedback with **React Hot Toast**

## Tech Stack

| Technology       | Purpose                       |
| ---------------- | ------------------------------ |
| React 19         | UI framework                  |
| React Router v7  | Client-side routing           |
| Supabase         | Authentication & backend      |
| Framer Motion    | Page/component animations     |
| Swiper           | Product image sliders         |
| React Hot Toast  | Notification toasts           |
| React Icons      | Icon library                  |
| DummyJSON API    | Product data source           |
| Create React App | Build tooling & dev server    |

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd reactecommercewebsite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm start`       | Start development server       |
| `npm run build`   | Build for production           |
| `npm test`        | Run test suite                 |

## Environment Variables

| Variable                     | Description                |
| ---------------------------- | -------------------------- |
| `REACT_APP_SUPABASE_URL`     | Supabase project URL       |
| `REACT_APP_SUPABASE_ANON_KEY` | Supabase anonymous API key |

## Project Structure

```
src/
├── components/
│   ├── header.jsx
│   ├── topheader.jsx
│   ├── bottumheader.jsx
│   ├── Heroslider.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── createAcount.jsx
│   ├── categorypage.jsx
│   ├── pagetransition.jsx
│   ├── taostmessage.jsx
│   ├── ProtectedRoute.jsx
│   └── slidProduct/
│       ├── products.jsx
│       ├── productsDetails.jsx
│       ├── sliderProduct.jsx
│       ├── productloading.jsx
│       ├── productdetailsloading.jsx
│       └── cart.jsx
├── context/
│   ├── authcontext.jsx       # Supabase authentication context
│   └── contextcategory.jsx   # Cart state & category definitions
├── footer.jsx
├── supabaseClient.js
├── App.jsx
└── index.js
```

## License

This project is for educational/demonstration purposes.
