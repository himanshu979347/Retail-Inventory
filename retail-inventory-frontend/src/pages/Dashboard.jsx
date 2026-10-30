import { useEffect, useState } from 'react'
import { Package, Boxes, ShoppingCart, Truck } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'
import Layout from '../components/Layout'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import api from '../api/axios'

const STATUS_TONE = { Processing: 'warning', Shipped: 'info', Pending: 'warning', Delivered: 'success' }

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    async function load() {
      try {
        // GET /api/reports/summary -> { totalProducts, totalInventory, totalOrders, totalSuppliers }
        // GET /api/orders?limit=5 -> recent orders
        // GET /api/reports/stock-movement -> [{ month, stockIn, stockOut }]
        const [summaryRes, ordersRes, movementRes] = await Promise.all([
          api.get('/reports/summary'),
          api.get('/orders', { params: { limit: 5 } }),
          api.get('/reports/stock-movement'),
        ])
        setStats(summaryRes.data)
        setRecentOrders(ordersRes.data)
        setChartData(movementRes.data)
      } catch {
        setStats({ totalProducts: '—', totalInventory: '—', totalOrders: '—', totalSuppliers: '—' })
        setRecentOrders([])
        setChartData([])
      }
    }
    load()
  }, [])

  const columns = [
    { key: 'id', header: 'Order ID', render: (r) => <span className="font-mono text-xs text-primary">#{r.id}</span> },
    { key: 'customerName', header: 'Customer' },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={STATUS_TONE[r.status] || 'gray'}>{r.status}</Badge> },
    { key: 'date', header: 'Date' },
  ]

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Products" value={stats?.totalProducts ?? '…'} icon={Package} tone="blue" />
        <StatCard label="Total Inventory" value={stats?.totalInventory ?? '…'} icon={Boxes} tone="green" />
        <StatCard label="Total Orders" value={stats?.totalOrders ?? '…'} icon={ShoppingCart} tone="orange" />
        <StatCard label="Total Suppliers" value={stats?.totalSuppliers ?? '…'} icon={Truck} tone="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-panel border border-border rounded-lg p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Inventory Overview</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="stockIn" name="Stock In" fill="#60A5FA" radius={[4, 4, 0, 0]} />
              <Bar dataKey="stockOut" name="Stock Out" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-panel border border-border rounded-lg p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.length === 0 && <p className="text-sm text-muted">No recent orders.</p>}
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between text-sm border-b border-border last:border-0 pb-2.5 last:pb-0">
                <div>
                  <p className="font-mono text-xs text-primary">#{o.id}</p>
                  <p className="text-ink">{o.customerName}</p>
                </div>
                <Badge tone={STATUS_TONE[o.status] || 'gray'}>{o.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
