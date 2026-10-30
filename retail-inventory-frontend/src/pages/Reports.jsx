import { useEffect, useState } from 'react'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'
import Layout from '../components/Layout'
import api from '../api/axios'

const PIE_COLORS = ['#2563EB', '#F59E0B', '#16A34A', '#7C3AED', '#64748B']

export default function Reports() {
  const [reportType, setReportType] = useState('Inventory Report')
  const [movement, setMovement] = useState([])
  const [categoryShare, setCategoryShare] = useState([])

  useEffect(() => {
    async function load() {
      try {
        // GET /api/reports/stock-movement -> [{ month, stockIn, stockOut }]
        // GET /api/reports/category-distribution -> [{ name, value }]
        const [moveRes, catRes] = await Promise.all([
          api.get('/reports/stock-movement'),
          api.get('/reports/category-distribution'),
        ])
        setMovement(moveRes.data)
        setCategoryShare(catRes.data)
      } catch {
        setMovement([])
        setCategoryShare([])
      }
    }
    load()
  }, [])

  return (
    <Layout title="Reports">
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="rounded-md border border-border px-3 py-2 text-sm">
          <option>Inventory Report</option>
          <option>Sales Report</option>
          <option>Supplier Report</option>
        </select>
        <button className="rounded-md bg-primary text-white text-sm font-medium px-4 py-2 hover:bg-primary/90">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-panel border border-border rounded-lg p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Stock Movement</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={movement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="stockIn" name="Stock In" stroke="#2563EB" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="stockOut" name="Stock Out" stroke="#F59E0B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-panel border border-border rounded-lg p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryShare} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {categoryShare.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  )
}
