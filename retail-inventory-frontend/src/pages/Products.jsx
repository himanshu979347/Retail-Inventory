import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Pencil, Trash2, Plus, Package } from 'lucide-react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'
import Badge from '../components/Badge'
import api from '../api/axios'

const STOCK_TONE = { 'In Stock': 'success', 'Low Stock': 'warning', 'Out of Stock': 'danger' }
const PAGE_SIZE = 5

export default function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  async function load() {
    const { data } = await api.get('/products', { params: { search, category, status, page, pageSize: PAGE_SIZE } })
    setProducts(data.items ?? data)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, status, page])

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return
    await api.delete(`/products/${id}`)
    load()
  }

  const columns = [
    { key: 'image', header: 'Image', render: () => (
      <div className="w-9 h-9 rounded-md bg-bg border border-border flex items-center justify-center text-muted">
        <Package size={16} />
      </div>
    ) },
    { key: 'name', header: 'Name' },
    { key: 'sku', header: 'SKU', render: (r) => <span className="font-mono text-xs">{r.sku}</span> },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price', render: (r) => `$${r.price}` },
    { key: 'stock', header: 'Stock', render: (r) => <span className="font-mono">{r.stock}</span> },
    { key: 'statusLabel', header: 'Status', render: (r) => <Badge tone={STOCK_TONE[r.statusLabel] || 'gray'}>{r.statusLabel}</Badge> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex gap-3">
          <button onClick={() => navigate(`/products/new?edit=${r.id}`)} className="text-primary hover:opacity-70" aria-label="Edit">
            <Pencil size={15} />
          </button>
          <button onClick={() => handleDelete(r.id)} className="text-danger hover:opacity-70" aria-label="Delete">
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <Layout title="Products">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="relative w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setPage(1); setSearch(e.target.value) }}
            placeholder="Search products..."
            className="w-full rounded-md border border-border pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          />
        </div>
        <div className="flex gap-3 items-center">
          <select value={category} onChange={(e) => { setPage(1); setCategory(e.target.value) }} className="rounded-md border border-border px-3 py-2 text-sm">
            <option value="">All Categories</option>
            <option>Electronics</option>
            <option>Apparel</option>
            <option>Footwear</option>
            <option>Accessories</option>
          </select>
          <select value={status} onChange={(e) => { setPage(1); setStatus(e.target.value) }} className="rounded-md border border-border px-3 py-2 text-sm">
            <option value="">All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
          <button
            onClick={() => navigate('/products/new')}
            className="flex items-center gap-1.5 rounded-md bg-primary text-white text-sm font-medium px-4 py-2 hover:bg-primary/90"
          >
            <Plus size={15} /> Add Product
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={products}
        pagination={{ page, totalPages: 5, onChange: setPage, totalLabel: `Showing page ${page} of products` }}
      />
    </Layout>
  )
}
