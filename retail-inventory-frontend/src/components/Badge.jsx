const styles = {
  success: 'bg-successsoft text-success',
  warning: 'bg-warningsoft text-warning',
  danger: 'bg-dangersoft text-danger',
  info: 'bg-primarysoft text-primary',
  gray: 'bg-gray-100 text-gray-600',
}

export default function Badge({ tone = 'gray', children }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[tone]}`}>
      {children}
    </span>
  )
}
