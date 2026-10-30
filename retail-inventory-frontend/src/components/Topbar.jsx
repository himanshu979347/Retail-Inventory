import { Search, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Topbar({ title }) {
  const { user, logout } = useAuth()
  const initials = (user?.name || 'Admin User')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className="flex items-center justify-between border-b border-border bg-panel px-6 py-3.5">
      <div className="flex items-center gap-4 flex-1">
        {title && <h1 className="text-xl font-semibold text-ink shrink-0">{title}</h1>}
        <div className="relative max-w-xs w-full ml-4 hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full rounded-md border border-border bg-bg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-muted hover:text-ink" aria-label="Notifications">
          <Bell size={19} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-danger" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-none">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-muted mt-0.5">{user?.role || 'Administrator'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="text-sm text-muted hover:text-ink border border-border rounded-md px-3 py-1.5"
        >
          Log out
        </button>
      </div>
    </header>
  )
}
