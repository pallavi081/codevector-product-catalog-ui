function SkeletonRow() {
  return (
    <tr className="border-b border-ink-border/60 last:border-b-0">
      {[1, 2, 3, 4, 5].map((i) => (
        <td key={i} className="px-5 py-4">
          <div className="skeleton h-4 w-full max-w-[140px] rounded" />
        </td>
      ))}
    </tr>
  )
}

function SkeletonCard() {
  return (
    <div className="glass rounded-xl p-4 shadow-glass">
      <div className="flex items-start justify-between gap-2">
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="skeleton h-4 w-12 rounded" />
      </div>
      <div className="skeleton mt-3 h-5 w-20 rounded-full" />
      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-ink-border/60 pt-3">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-3 w-16 rounded" />
      </div>
    </div>
  )
}

export default function SkeletonState({ rows = 6 }) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-ink-border lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-border bg-ink-panel/80">
              {['Product', 'Category', 'Price', 'Created', 'Updated'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-ink_text-muted"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </>
  )
}
