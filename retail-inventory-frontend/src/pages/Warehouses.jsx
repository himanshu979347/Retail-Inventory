import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Badge from '../components/Badge'
import api from '../api/axios'

const emptyForm = { name: '', location: '', manager: '', contact: '' }

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  async function load() {
    const { data } = await api.get('/warehouses')
    setWarehouses(data)
  }

  useEffect(() => { load() }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    await api.post('/warehouses', form)
    setForm(emptyForm)
    setModalOpen(false)
    load()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this warehouse?')) return
    await api.delete(`/warehouses/${id}`)
    load()
  }

  const columns = [
    { key: 'name', header: 'Name', render: (r) => <span className="text-primary font-medium">{r.name}</span> },
    { key: 'location', header: 'Location' },
    { key: 'manager', header: 'Manager' },
    { key: 'contact', header: 'Contact' },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={r.status === 'Active' ? 'success' : 'gray'}>{r.status || 'Active'}</Badge> },
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
    <Layout title="Warehouses">
      <div className="flex justify-end mb-4">
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-1.5 rounded-md bg-primary text-white text-sm font-medium px-4 py-2 hover:bg-primary/90">
          <Plus size={15} /> Add Warehouse
        </button>
      </div>

      <DataTable columns={columns} rows={warehouses} />

      <Modal open={modalOpen} title="Add warehouse" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3">
          {['name', 'location', 'manager', 'contact'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-ink mb-1 capitalize">{field}</label>
              <input
                required
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-md border border-border px-4 py-2 text-sm">Cancel</button>
            <button type="submit" className="rounded-md bg-primary text-white px-4 py-2 text-sm font-medium">Save</button>
          </div>
        </form>
      </Modal>
    </Layout>
  )
}
