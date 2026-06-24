import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import StatsBar from './components/StatsBar'
import CategoryFilter from './components/CategoryFilter'
import SearchBox from './components/SearchBox'
import ProductTable from './components/ProductTable'
import ProductCardGrid from './components/ProductCardGrid'
import SkeletonState from './components/SkeletonState'
import EmptyState from './components/EmptyState'
import ErrorState from './components/ErrorState'
import LoadMoreButton from './components/LoadMoreButton'
import CursorTrail from './components/CursorTrail'
import { useProducts } from './hooks/useProducts'
import { useHealth } from './hooks/useHealth'
import { useDebouncedValue } from './hooks/useDebouncedValue'

const PAGE_SIZE = 12

export default function App() {
  const [category, setCategory] = useState('All')
  const [searchInput, setSearchInput] = useState('')
  const search = useDebouncedValue(searchInput, 200)

  const {
    items,
    nextCursor,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    retry,
  } = useProducts({ category, limit: PAGE_SIZE })

  const { status: healthStatus } = useHealth()

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    )
  }, [items, search])

  const averagePrice = useMemo(() => {
    if (items.length === 0) return 0
    const sum = items.reduce((acc, p) => acc + (Number(p.price) || 0), 0)
    return sum / items.length
  }, [items])

  function handleCategorySelect(cat) {
    setCategory(cat)
    setSearchInput('')
  }

  const showInitialLoading = isLoading
  const showError = !isLoading && error && items.length === 0
  const showEmpty = !isLoading && !error && items.length === 0
  const showNoSearchMatches =
    !isLoading && !error && items.length > 0 && filteredItems.length === 0

  return (
    <div className="min-h-screen pb-20">
      <Navbar healthStatus={healthStatus} />

      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <section className="mb-6">
          <StatsBar
            productsLoaded={items.length}
            category={category}
            averagePrice={averagePrice}
            healthStatus={healthStatus}
            hasMore={hasMore}
          />
        </section>

        {/* Filters + Search */}
        <section className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <CategoryFilter selected={category} onSelect={handleCategorySelect} />
          <SearchBox
            value={searchInput}
            onChange={setSearchInput}
            resultCount={filteredItems.length}
            totalCount={items.length}
          />
        </section>

        {/* Cursor pagination readout */}
        {!showInitialLoading && !showError && (
          <section className="mb-5">
            <CursorTrail
              cursor={nextCursor}
              hasMore={hasMore}
              loadedCount={items.length}
            />
          </section>
        )}

        {/* Main content states */}
        <section className="space-y-4">
          {showInitialLoading && <SkeletonState rows={8} />}

          {showError && <ErrorState message={error} onRetry={retry} />}

          {showEmpty && (
            <EmptyState
              message={`No products found${category !== 'All' ? ` in "${category}"` : ''}`}
              hint="Try a different category or check back later."
              actionLabel={category !== 'All' ? 'Clear filter' : undefined}
              onAction={category !== 'All' ? () => handleCategorySelect('All') : undefined}
            />
          )}

          {showNoSearchMatches && (
            <EmptyState
              message={`No matches for "${search}"`}
              hint="Search only looks through products already loaded. Try Load More to search a wider set."
              actionLabel="Clear search"
              onAction={() => setSearchInput('')}
            />
          )}

          {!showInitialLoading && !showError && filteredItems.length > 0 && (
            <>
              <ProductTable products={filteredItems} />
              <ProductCardGrid products={filteredItems} />
            </>
          )}

          {/* Inline error on a failed "Load More" (items already present) */}
          {error && items.length > 0 && (
            <p className="text-center text-sm text-red-400">{error}</p>
          )}

          {!showInitialLoading && !showError && items.length > 0 && !search && (
            <LoadMoreButton
              onClick={loadMore}
              isLoading={isLoadingMore}
              hasMore={hasMore}
            />
          )}
        </section>
      </main>

      <footer className="mt-12 border-t border-ink-border/60 px-4 py-6 text-center font-mono text-[11px] text-ink_text-muted">
        Built with React · Vite · Tailwind — backed by FastAPI + PostgreSQL (Neon)
      </footer>
    </div>
  )
}
