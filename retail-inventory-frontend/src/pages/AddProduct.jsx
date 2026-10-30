import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ImagePlus } from 'lucide-react'
import Layout from '../components/Layout'
import api from '../api/axios'

export default function AddProduct() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const editId = params.get('edit')
  const [form, setForm] = useState({ name: '', sku: '', category: '', price: '', description: '' })
  const [image, setImage] = useState(null)

  function set(field) {
    return (e) => setForm({ ...form, [field]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = new FormData()
    Object.entries(form).forEach(([k, v]) => payload.append(k, v))
    if (image) payload.append('image', image)

    if (editId) {
      await api.put(`/products/${editId}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
    } else {
      await api.post('/products', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
    navigate('/products')
  }

  return (
    <Layout title={editId ? 'Edit Product' : 'Add Product'}>
      <button onClick={() => navigate('/products')} className="flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-4">
        <ArrowLeft size={15} /> Back
      </button>

      <form onSubmit={handleSubmit} className="bg-panel border border-border rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Product Name *</label>
            <input required value={form.name} onChange={set('name')} placeholder="Enter product name"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">SKU *</label>
            <input required value={form.sku} onChange={set('sku')} placeholder="Enter SKU"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm font-mono focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Category *</label>
            <select required value={form.category} onChange={set('category')}
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none">
              <option value="">Select category</option>
              <option>Electronics</option>
              <option>Apparel</option>
              <option>Footwear</option>
              <option>Accessories</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Price *</label>
            <input required type="number" step="0.01" value={form.price} onChange={set('price')} placeholder="0.00"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm font-mono focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Description</label>
            <textarea value={form.description} onChange={set('description')} placeholder="Enter description" rows={3}
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Product Image</label>
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg h-56 cursor-pointer hover:border-primary text-muted">
            {image ? (
              <span className="text-sm text-ink px-4 text-center">{image.name}</span>
            ) : (
              <>
                <ImagePlus size={28} />
                <span className="text-sm">Click to upload image</span>
                <span className="text-xs">PNG, JPG up to 5MB</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </label>

          <div className="flex justify-end gap-2 mt-8">
            <button type="button" onClick={() => navigate('/products')} className="rounded-md border border-border px-4 py-2 text-sm">
              Cancel
            </button>
            <button type="submit" className="rounded-md bg-primary text-white px-5 py-2 text-sm font-medium hover:bg-primary/90">
              Save Product
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}
