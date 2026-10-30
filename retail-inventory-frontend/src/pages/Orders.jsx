import { useEffect, useState } from 'react'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'
import Badge from '../components/Badge'
import api from '../api/axios'

const STATUS_TONE = { Pending: 'warning', Processing: 'warning', Packed: 'info', Shipped: 'info', Delivered: 'success' }
const STATUS_FLOW = ['Pending', 'Processing', 'Packed', 'Shipped', 'Delivered']

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  async function load() {
    const { data } = await api.get('/orders', { params: { search, status: status || undefined } })
    setOrders(data)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status])

  async function advanceStatus(order) {
    const next = STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1]
    if (!next) return
    await api.put(`/orders/${order.id}/status`, { status: next })
    load()
  }

  async function handleDelete(id) {
    if (!confirm('Cancel this order?')) return
    await api.delete(`/orders/${id}`)
    load()
  }

  const columns = [
    { key: 'id', header: 'Order ID', render: (r) => <span className="font-mono text-xs text-primary">#{r.id}</span> },
    { key: 'customerName', header: 'Customer' },
    { key: 'date', header: 'Date' },
    { key: 'total', header: 'Total Amount', render: (r) => `$${r.total}` },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={STATUS_TONE[r.status] || 'gray'}>{r.status}</Badge> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex gap-3">
          {r.status !== 'Delivered' && (
            <button onClick={() => advanceStatus(r)} className="text-primary hover:opacity-70" aria-label="Advance status"><Pencil size={15} /></button>
          )}
          <button onClick={() => handleDelete(r.id)} className="text-danger hover:opacity-70" aria-label="Cancel order"><Trash2 size={15} /></button>
        </div>
      ),
    },
  ]

  return (
    <Layout title="Orders">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="relative w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-full rounded-md border border-border pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          />
        </div>
        <div className="flex gap-3 items-center">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border border-border px-3 py-2 text-sm">
            <option value="">All Status</option>
            {STATUS_FLOW.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="flex items-center gap-1.5 rounded-md bg-primary text-white text-sm font-medium px-4 py-2 hover:bg-primary/90">
            <Plus size={15} /> Create Order
          </button>
        </div>
      </div>

      <DataTable columns={columns} rows={orders} />
    </Layout>
  )
}
