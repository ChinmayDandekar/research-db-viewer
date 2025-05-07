# 📚 Research Papers App (Next.js + App Router)

A responsive Next.js application that fetches and displays accepted research papers with features like dynamic search, sort, filters, modal routing, pagination, and detail views — powered by Strapi.

---

## 🚀 Features

* 📄 Paginated list of research papers
* 🔍 Debounced search with category filter
* ↕️ Sorting by title, year, impact factor
* 📌 Detail view via intercepting modal route or full page
* 🧾 Sectioned paper metadata with icons and publisher logos
* ⚡ Caching & performance optimization

---

## 🧰 Tech Stack

* **Next.js 14** (App Router)
* **SCSS Modules**
* **Strapi API**
* **TypeScript**
* **Client-side Caching**
* **Interception Routing (Modals)**

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
gh repo clone ChinmayDandekar/research-db-viewer
cd research-db-viewer
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment (if required)

If you need environment variables for the API URL, create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://easydash.enago.com
```

> Update fetch URLs to use this env variable where applicable.

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000/)

---

## 📁 Folder Structure Highlights

```
/app               # App Router pages and routes
/components        # UI components (List, Card, Modal, etc.)
/hooks             # Custom React hooks (e.g., debounce)
/styles            # SCSS module styles
/public            # Static assets
```

---

## 🧪 Scripts

* `npm run dev` — Start local dev server
* `npm run build` — Build for production
* `npm run start` — Start production server
* `npm run lint` — Lint the codebase

---
