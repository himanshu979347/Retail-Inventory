import { useState } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Settings() {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', companyName: '' })
  const [saved, setSaved] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    await api.put('/settings/profile', form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Layout title="Settings">
      <form onSubmit={handleSubmit} className="bg-panel border border-border rounded-lg p-6 max-w-lg space-y-4">
        <h2 className="text-sm font-semibold text-ink">Profile</h2>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Full Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Company Name</label>
          <input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="rounded-md bg-primary text-white px-5 py-2 text-sm font-medium hover:bg-primary/90">
            Save Changes
          </button>
          {saved && <span className="text-sm text-success">Saved.</span>}
        </div>
      </form>
    </Layout>
  )
}
