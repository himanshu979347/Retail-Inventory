import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'
import Badge from '../components/Badge'
import api from '../api/axios'

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/users').then((res) => setUsers(res.data)).catch(() => setUsers([]))
  }, [])

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', render: (r) => <Badge tone="info">{r.role}</Badge> },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={r.status === 'Active' ? 'success' : 'gray'}>{r.status || 'Active'}</Badge> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-3">
          <button className="text-primary hover:opacity-70" aria-label="Edit"><Pencil size={15} /></button>
          <button className="text-danger hover:opacity-70" aria-label="Delete"><Trash2 size={15} /></button>
        </div>
      ),
    },
  ]

  return (
    <Layout title="Users">
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-1.5 rounded-md bg-primary text-white text-sm font-medium px-4 py-2 hover:bg-primary/90">
          <Plus size={15} /> Add User
        </button>
      </div>
      <DataTable columns={columns} rows={users} />
    </Layout>
  )
}
