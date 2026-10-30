import { useEffect, useState } from 'react'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Badge from '../components/Badge'
import api from '../api/axios'

const emptyForm = { name: '', contactPerson: '', email: '', phone: '' }

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([])
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  async function load() {
    const { data } = await api.get('/suppliers', { params: { search } })
    setSuppliers(data)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  async function handleSubmit(e) {
    e.preventDefault()
    await api.post('/suppliers', form)
    setForm(emptyForm)
    setModalOpen(false)
    load()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this supplier?')) return
    await api.delete(`/suppliers/${id}`)
    load()
  }

  const columns = [
    { key: 'name', header: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'contactPerson', header: 'Contact Person' },
    { key: 'email', header: 'Email', render: (r) => <a href={`mailto:${r.email}`} className="text-primary hover:underline">{r.email}</a> },
    { key: 'phone', header: 'Phone' },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={r.status === 'Active' ? 'success' : 'danger'}>{r.status || 'Active'}</Badge> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex gap-3">
          <button className="text-primary hover:opacity-70" aria-label="Edit"><Pencil size={15} /></button>
          <button onClick={() => handleDelete(r.id)} className="text-danger hover:opacity-70" aria-label="Delete"><Trash2 size={15} /></button>
        </div>
      ),
    },
  ]

  return (
    <Layout title="Suppliers">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="relative w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search suppliers..."
            className="w-full rounded-md border border-border pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          />
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-1.5 rounded-md bg-primary text-white text-sm font-medium px-4 py-2 hover:bg-primary/90">
          <Plus size={15} /> Add Supplier
        </button>
      </div>

      <DataTable columns={columns} rows={suppliers} />

      <Modal open={modalOpen} title="Add supplier" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Contact Person</label>
            <input required value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Phone</label>
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-md border border-border px-4 py-2 text-sm">Cancel</button>
            <button type="submit" className="rounded-md bg-primary text-white px-4 py-2 text-sm font-medium">Save</button>
          </div>
        </form>
      </Modal>
    </Layout>
  )
}
