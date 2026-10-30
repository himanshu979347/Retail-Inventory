# Retail Inventory Management System — Frontend

React 18 + Vite + Tailwind + React Router + Axios + Recharts + lucide-react.
Styled to match the reference admin UI (navy sidebar, icon stat cards, charts,
pagination). Talks to your Node/Express + PostgreSQL backend.

## 1. Install

```bash
cd retail-inventory-frontend
npm install
cp .env.example .env      # edit VITE_API_URL if your backend runs elsewhere
npm run dev
```

Open http://localhost:5173 — starts on `/login`.

## 2. Pages (all under src/pages/)

| Page | Route | Matches |
|---|---|---|
| Login | `/login` | split navy/white login, demo credentials box |
| Dashboard | `/` | 4 icon stat cards, stock bar chart, recent orders |
| Products | `/products` | search, category/status filter, thumbnail, pagination |
| Add/Edit Product | `/products/new` | full-page form + image upload box |
| Inventory | `/inventory` | warehouse + status filter, view/edit icons |
| Warehouses | `/warehouses` | CRUD table (name, location, manager, contact, status) |
| Orders | `/orders` | search, status filter, status pipeline, create order |
| Suppliers | `/suppliers` | search, contact person, add supplier modal |
| Reports | `/reports` | stock-movement line chart, category pie chart |
| Users | `/users` | role + status table |
| Settings | `/settings` | profile form |

## 3. Backend endpoints expected

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/login` | `{ email, password }` → `{ token, user }` |
| GET | `/products?search=&category=&status=&page=&pageSize=` | product list |
| POST / PUT / DELETE | `/products[/:id]` | create / update (multipart, for image) / delete |
| GET | `/warehouses` | list warehouses |
| POST / PUT / DELETE | `/warehouses[/:id]` | warehouse CRUD |
| GET | `/inventory?search=&warehouseId=&status=` | stock per warehouse |
| POST | `/inventory/transfer` | `{ productId, fromWarehouseId, toWarehouseId, quantity }` |
| GET | `/suppliers?search=` | list suppliers |
| POST / DELETE | `/suppliers[/:id]` | supplier CRUD |
| GET | `/orders?search=&status=&limit=` | order list |
| POST | `/orders` | create order |
| PUT | `/orders/:id/status` | `{ status }` |
| GET | `/reports/summary` | dashboard stat cards |
| GET | `/reports/stock-movement` | `[{ month, stockIn, stockOut }]` |
| GET | `/reports/category-distribution` | `[{ name, value }]` |
| GET | `/users` | user list |
| PUT | `/settings/profile` | update profile |

Until an endpoint exists, the matching page shows an empty state instead of
crashing.

## 4. Build order (match to your sprints)

1. Auth → Dashboard shell renders after login.
2. Products + Add/Edit Product page (image upload as multipart form data).
3. Warehouses + Inventory + stock transfer (DB transaction on the backend).
4. Suppliers, Orders (status only moves forward in the pipeline).
5. Reports (aggregate queries once the rest exists), Users, Settings last.

## 5. Styling system

Colors/fonts are defined once in `tailwind.config.js`:
- `navy` (#15304D) — sidebar only.
- `primary` (#2563EB) — buttons, active nav, links.
- `success` / `warning` / `danger` / `purple` — status badges and stat icons.
- `font-mono` — SKUs, quantities, order IDs only.

## 6. Build for deployment

```bash
npm run build   # outputs dist/ — serve via Nginx in your Docker image
```
