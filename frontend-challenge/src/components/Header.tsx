export default function Header() {
  return (
    <header className="container-default py-3 sticky top-0 z-30 bg-neutral-50/80 backdrop-blur border-b">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary">TC</div>
        <div>
          <h1 className="text-lg font-semibold">Tennis Courts</h1>
          <p className="text-xs text-neutral-500">Find, review, and enjoy 🎾</p>
        </div>
      </div>
    </header>
  )
}
