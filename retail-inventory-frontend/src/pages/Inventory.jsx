import { useEffect, useState } from 'react'
import { Search, Eye, Pencil, Package } from 'lucide-react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'
import Badge from '../components/Badge'
import api from '../api/axios'

const STOCK_TONE = { 'In Stock': 'success', 'Low Stock': 'warning', 'Out of Stock': 'danger' }

export default function Inventory() {
  const [rows, setRows] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [search, setSearch] = useState('')
  const [warehouseFilter, setWarehouseFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    api.get('/warehouses').then((res) => setWarehouses(res.data)).catch(() => setWarehouses([]))
  }, [])

  async function load() {
    const { data } = await api.get('/inventory', {
      params: { search, warehouseId: warehouseFilter || undefined, status: statusFilter || undefined },
    })
    setRows(data)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, warehouseFilter, statusFilter])

  const columns = [
    { key: 'image', header: '', render: () => (
      <div className="w-9 h-9 rounded-md bg-bg border border-border flex items-center justify-center text-muted">
        <Package size={16} />
      </div>
    ) },
    { key: 'productName', header: 'Product' },
    { key: 'sku', header: 'SKU', render: (r) => <span className="font-mono text-xs">{r.sku}</span> },
    { key: 'warehouseName', header: 'Warehouse' },
    { key: 'quantity', header: 'Quantity', render: (r) => <span className="font-mono">{r.quantity}</span> },
    { key: 'statusLabel', header: 'Status', render: (r) => <Badge tone={STOCK_TONE[r.statusLabel] || 'gray'}>{r.statusLabel}</Badge> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-3">
          <button className="text-muted hover:text-ink" aria-label="View"><Eye size={15} /></button>
          <button className="text-primary hover:opacity-70" aria-label="Edit"><Pencil size={15} /></button>
        </div>
      ),
    },
  ]

  return (
    <Layout title="Inventory">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inventory..."
            className="w-full rounded-md border border-border pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          />
        </div>
        <select value={warehouseFilter} onChange={(e) => setWarehouseFilter(e.target.value)} className="rounded-md border border-border px-3 py-2 text-sm">
          <option value="">All Warehouses</option>
          {warehouses.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-md border border-border px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      <DataTable columns={columns} rows={rows} />
    </Layout>
  )
}
