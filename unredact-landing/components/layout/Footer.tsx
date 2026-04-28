export default function Footer() {
  return (
    <footer
      className="relative px-6 py-6"
      style={{
        background: 'var(--black)',
        borderTop: '1px solid rgba(34,211,238,0.08)',
      }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'rgba(241,240,255,0.25)' }}>
        <span className="font-mono font-medium" style={{ color: 'rgba(241,240,255,0.3)' }}>
          unredact.py
        </span>

        <div className="flex items-center gap-5">
          <a
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors"
          >
            MIT License
          </a>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
          <a
            href="https://github.com/oplumina/unredact.py/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors"
          >
            GitHub Issues
          </a>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
          <a
            href="https://github.com/oplumina/unredact.py#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors"
          >
            Privacy
          </a>
        </div>

        <span>© 2025 OpLumina</span>
      </div>
    </footer>
  );
}
