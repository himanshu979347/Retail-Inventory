import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import Inventory from './pages/Inventory'
import Warehouses from './pages/Warehouses'
import Suppliers from './pages/Suppliers'
import Orders from './pages/Orders'
import Reports from './pages/Reports'
import Users from './pages/Users'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'

function P({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<P><Dashboard /></P>} />
      <Route path="/products" element={<P><Products /></P>} />
      <Route path="/products/new" element={<P><AddProduct /></P>} />
      <Route path="/inventory" element={<P><Inventory /></P>} />
      <Route path="/warehouses" element={<P><Warehouses /></P>} />
      <Route path="/suppliers" element={<P><Suppliers /></P>} />
      <Route path="/orders" element={<P><Orders /></P>} />
      <Route path="/reports" element={<P><Reports /></P>} />
      <Route path="/users" element={<P><Users /></P>} />
      <Route path="/settings" element={<P><Settings /></P>} />
    </Routes>
  )
}
