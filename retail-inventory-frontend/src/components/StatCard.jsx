const toneClasses = {
  blue: 'bg-primarysoft text-primary',
  green: 'bg-successsoft text-success',
  orange: 'bg-warningsoft text-warning',
  purple: 'bg-purplesoft text-purple',
}

export default function StatCard({ label, value, icon: Icon, tone = 'blue' }) {
  return (
    <div className="bg-panel border border-border rounded-lg px-5 py-4 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${toneClasses[tone]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-xl font-semibold text-ink mt-0.5">{value}</p>
      </div>
    </div>
  )
}
