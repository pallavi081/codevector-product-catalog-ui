import { truncateCursor } from '../utils/format'

/**
 * A small, honest readout of the pagination state actually driving the app —
 * the cursor token itself, not a page number. This exists because correct
 * cursor-based pagination (vs. fake page numbers) is the core technical
 * requirement of this assignment, so the UI surfaces it instead of hiding it.
 */
export default function CursorTrail({ cursor, hasMore, loadedCount }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-ink-border bg-ink-panel/40 px-3 py-2 font-mono text-[11px] text-ink_text-muted">
      <span className="text-ink_text-muted/70">cursor:</span>
      <span className="rounded bg-ink-border/60 px-1.5 py-0.5 text-violet">
        {cursor ? truncateCursor(cursor) : 'null'}
      </span>
      <span className="text-ink_text-muted/40">·</span>
      <span className="text-ink_text-muted/70">has_more:</span>
      <span className={hasMore ? 'text-mint' : 'text-ink_text-muted'}>
        {String(hasMore)}
      </span>
      <span className="text-ink_text-muted/40">·</span>
      <span className="text-ink_text-muted/70">loaded:</span>
      <span className="text-ink_text-primary">{loadedCount}</span>
    </div>
  )
}
