/* eslint-disable */
// docs.jsx: app shell: topbar + sidebar + main + TOC + hash routing + search

const PAGES = window.SCT_PAGES;
const G = window.SCT_GLYPHS;

const SECTIONS = [
  { id: 'Home',     kind: 'home' },
  { id: 'Square',   kind: 'shape', icon: 'square',   defaultOpen: false },
  { id: 'Circle',   kind: 'shape', icon: 'circle',   defaultOpen: false },
  { id: 'Triangle', kind: 'shape', icon: 'triangle', defaultOpen: false },
];

function useHashRoute() {
  const get = () => {
    const h = (window.location.hash || '').replace(/^#\/?/, '');
    return h || 'welcome';
  };
  const [route, setRoute] = React.useState(get);
  React.useEffect(() => {
    const onHash = () => setRoute(get());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function findPage(id) {
  return PAGES.find(p => p.id === id) || PAGES[0];
}

const PAGE_ORDER = PAGES.map(p => p.id);

function pagesBySection() {
  const out = {};
  PAGES.forEach(p => {
    out[p.section] = out[p.section] || [];
    out[p.section].push(p);
  });
  return out;
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="m s"></span>
      <span className="m c"></span>
      <span className="m t"></span>
    </span>
  );
}

function Topbar({ page, onSearch, theme, onToggleTheme, onMenuOpen }) {
  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onMenuOpen} aria-label="Open navigation">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="2" y1="4.5" x2="14" y2="4.5"/>
          <line x1="2" y1="8" x2="14" y2="8"/>
          <line x1="2" y1="11.5" x2="14" y2="11.5"/>
        </svg>
      </button>
      <a className="brand" href="#/welcome">
        <BrandMark />
        <span className="brand-name"><b>SquareCircleTriangle</b></span>
      </a>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="search" onClick={onSearch} aria-label="Search">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="4.5"></circle>
            <line x1="10.5" y1="10.5" x2="14" y2="14"></line>
          </svg>
          <span>Search…</span>
          <span className="kbd"><span>⌘</span><span>K</span></span>
        </button>
      </div>
      <div className="topbar-right">
        <button className="icon-btn" title="Toggle theme" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'dark'
            ? <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor"><path d="M11.5 9.5a4 4 0 1 1-5-5 4.5 4.5 0 0 0 5 5z"/></svg>
            : <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3"/></svg>
          }
        </button>
      </div>
    </header>
  );
}

function Sidebar({ currentId, open, onClose }) {
  const bySection = pagesBySection();

  const [collapsed, setCollapsed] = React.useState(() => {
    const init = {};
    SECTIONS.forEach(s => {
      if (s.kind === 'shape' || s.kind === 'group') {
        init[s.id] = !s.defaultOpen;
      }
    });
    return init;
  });

  React.useEffect(() => {
    const sec = SECTIONS.find(s => (bySection[s.id] || []).some(p => p.id === currentId));
    if (sec && (sec.kind === 'shape' || sec.kind === 'group')) {
      setCollapsed(c => ({ ...c, [sec.id]: false }));
    }
  }, [currentId]);

  const toggle = (sec) => setCollapsed(c => ({ ...c, [sec]: !c[sec] }));

  const homePage = PAGES.find(p => p.section === 'Home') || PAGES[0];

  return (
    <aside className={'sidebar' + (open ? ' is-open' : '')}
           onClick={(e) => { if (e.target.tagName === 'A') onClose?.(); }}>
      <button className="sidebar-close" onClick={onClose} aria-label="Close navigation">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="3" y1="3" x2="13" y2="13"/>
          <line x1="13" y1="3" x2="3" y2="13"/>
        </svg>
        Close
      </button>
      {SECTIONS.map(sec => {
        if (sec.kind === 'home') {
          return (
            <a key={sec.id}
               href={'#/' + homePage.id}
               className={'nav-home' + (currentId === homePage.id ? ' active' : '')}>
              <span className="nav-home-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2.5 7.5 8 2.5l5.5 5"/>
                  <path d="M3.5 7v6.5h9V7"/>
                </svg>
              </span>
              <span>Home</span>
            </a>
          );
        }

        const pages = bySection[sec.id] || [];
        const isShape = sec.kind === 'shape';
        const isCollapsed = !!collapsed[sec.id];
        const sectionActive = pages.some(p => p.id === currentId);

        if (isShape) {
          const topPage = pages.find(p => p.sectionTop);
          const restPages = pages.filter(p => !p.sectionTop);
          const ordered = topPage ? [topPage, ...restPages] : restPages;

          return (
            <div key={sec.id} className={'nav-group is-shape ' + (isCollapsed ? 'collapsed' : '') + (sectionActive ? ' has-active' : '')}>
              <button className="nav-group-header is-shape-header" onClick={() => toggle(sec.id)}
                      aria-expanded={!isCollapsed}>
                <span className="nav-shape-icon">{G[sec.icon]}</span>
                <span className="nav-shape-label">{sec.id}</span>
                <span className="badge">{ordered.length}</span>
                <svg className="chev" viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <polyline points="4,6 8,10 12,6"></polyline>
                </svg>
              </button>
              <div className="nav-children">
                {ordered.map(p => (
                  <a key={p.id}
                     className={'nav-item' + (currentId === p.id ? ' active' : '')}
                     href={'#/' + p.id}>
                    {p.sectionTop ? 'Overview' : p.title}
                  </a>
                ))}
              </div>
            </div>
          );
        }

        return (
          <div key={sec.id} className={'nav-group ' + (isCollapsed ? 'collapsed' : '') + (sectionActive ? ' has-active' : '')}>
            <button className="nav-group-header" onClick={() => toggle(sec.id)}
                    aria-expanded={!isCollapsed}>
              <span>{sec.id}</span>
              <svg className="chev" viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6">
                <polyline points="4,6 8,10 12,6"></polyline>
              </svg>
            </button>
            <div className="nav-children">
              {pages.map(p => (
                <a key={p.id}
                   className={'nav-item' + (currentId === p.id ? ' active' : '')}
                   href={'#/' + p.id}>
                  {p.title}
                </a>
              ))}
            </div>
          </div>
        );
      })}

      <div className="sidebar-footer">
        <BrandMark />
        <a href="#/privacy" className={'sidebar-footer-link' + (currentId === 'privacy' ? ' active' : '')}>Privacy Policy</a>
      </div>
    </aside>
  );
}

function Toc({ pageId }) {
  const [items, setItems] = React.useState([]);
  const [activeId, setActiveId] = React.useState(null);

  React.useEffect(() => {
    const t = setTimeout(() => {
      const root = document.querySelector('.prose');
      if (!root) { setItems([]); return; }
      const hs = root.querySelectorAll('h2[id], h3[id]');
      setItems(Array.from(hs).map(h => ({
        id: h.id,
        text: h.textContent,
        level: h.tagName.toLowerCase(),
      })));
    }, 30);
    return () => clearTimeout(t);
  }, [pageId]);

  React.useEffect(() => {
    if (!items.length) return;
    const onScroll = () => {
      let best = null;
      let bestTop = -Infinity;
      items.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= 120 && top > bestTop) {
          bestTop = top;
          best = id;
        }
      });
      setActiveId(best || items[0]?.id);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  return (
    <aside className="toc">
      <div className="toc-title">On this page</div>
      <ul className="toc-list">
        {items.map(it => (
          <li key={it.id} className={(it.level === 'h3' ? 'h3 ' : '') + (activeId === it.id ? 'active' : '')}>
            <a href={'#' + it.id} onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(it.id);
              if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
                window.scrollTo({ top: y, behavior: 'smooth' });
                history.replaceState(null, '', '#' + it.id);
              }
            }}>{it.text}</a>
          </li>
        ))}
      </ul>
      <div className="toc-aside">
        <a href="#"><span style={{flex:'0 0 12px',display:'inline-flex'}}>
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M11 2H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/><path d="M8 6v4M6 8h4"/></svg>
        </span> Edit this page</a>
        <a href="#"><span style={{flex:'0 0 12px',display:'inline-flex'}}>
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
        </span> Page history</a>
        <a href="#"><span style={{flex:'0 0 12px',display:'inline-flex'}}>
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="10" height="10" rx="1"/><path d="M6 8h4M8 6v4"/></svg>
        </span> Suggest a change</a>
      </div>
    </aside>
  );
}

function PageView({ page }) {
  const idx = PAGE_ORDER.indexOf(page.id);
  const prev = idx > 0 ? findPage(PAGE_ORDER[idx - 1]) : null;
  const next = idx < PAGE_ORDER.length - 1 ? findPage(PAGE_ORDER[idx + 1]) : null;

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, [page.id]);

  return (
    <div className="page">
      <nav className="breadcrumb">
        <a href="#/welcome">Home</a>
        {page.section !== 'Home' && (
          <>
            <span className="sep">/</span>
            <span className={page.sectionTop ? 'current' : ''}>{page.section}</span>
          </>
        )}
        {!page.sectionTop && page.section !== 'Home' && (
          <>
            <span className="sep">/</span>
            <span className="current">{page.title}</span>
          </>
        )}
        {page.section === 'Home' && page.id !== 'welcome' && (
          <>
            <span className="sep">/</span>
            <span className="current">{page.title}</span>
          </>
        )}
      </nav>

      {page.id === 'welcome' && (
        <div className="homepage-hero">
          <img src="welcome-hero.jpg" alt="Sunrise over mountains" fetchpriority="high" />
        </div>
      )}

      {page.eyebrow && <div className="page-eyebrow">{page.eyebrow}</div>}
      <h1 className="page-title">{page.title}</h1>
      {page.lede && (
        page.ledeQuote
          ? <blockquote className="page-lede-quote">{page.lede}</blockquote>
          : <p className="page-lede">{page.lede}</p>
      )}

      {page.updated && (
        <div className="page-meta">
          <span className="avatar">{(page.updated || '').match(/by (\w)/)?.[1] || 'S'}</span>
          <span>Last updated {page.updated}</span>
        </div>
      )}

      <div className="prose">{page.body()}</div>

      {(prev || next) && (
        <div className="page-nav">
          {prev ? (
            <a className="pn prev" href={'#/' + prev.id}>
              <div className="pn-lbl"><span>←</span> PREVIOUS</div>
              <div className="pn-title">{prev.title}</div>
            </a>
          ) : <span/>}
          {next ? (
            <a className="pn next" href={'#/' + next.id}>
              <div className="pn-lbl">NEXT <span>→</span></div>
              <div className="pn-title">{next.title}</div>
            </a>
          ) : <span/>}
        </div>
      )}

      <div className="page-footer-meta">
        <span>{page.section} · /{page.id}</span>
      </div>
    </div>
  );
}

function SearchOverlay({ open, onClose }) {
  const [q, setQ] = React.useState('');
  const [hi, setHi] = React.useState(0);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 30); setQ(''); setHi(0); }
  }, [open]);

  const results = React.useMemo(() => {
    if (!q) return PAGES.slice(0, 6);
    const needle = q.toLowerCase();
    return PAGES.filter(p =>
      p.title.toLowerCase().includes(needle) ||
      p.lede.toLowerCase().includes(needle) ||
      p.section.toLowerCase().includes(needle)
    ).slice(0, 12);
  }, [q]);

  const go = (id) => {
    window.location.hash = '#/' + id;
    onClose();
  };

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setHi(h => Math.min(results.length - 1, h + 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setHi(h => Math.max(0, h - 1)); }
      if (e.key === 'Enter' && results[hi]) { e.preventDefault(); go(results[hi].id); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, hi, results]);

  if (!open) return null;
  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="head">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/>
          </svg>
          <input ref={inputRef} value={q} placeholder="Search…"
                 onChange={(e) => { setQ(e.target.value); setHi(0); }} />
          <span style={{fontFamily:'var(--ff-mono)',fontSize:11,color:'var(--muted-2)'}}>ESC</span>
        </div>
        <div className="results">
          {results.length === 0 && <div className="empty">No matches for "<strong>{q}</strong>".</div>}
          {results.map((r, i) => (
            <div key={r.id} className={'result' + (hi === i ? ' kbd-on' : '')}
                 onMouseEnter={() => setHi(i)}
                 onClick={() => go(r.id)}>
              <span>{r.title}</span>
              <span className="crumb">{r.section}</span>
            </div>
          ))}
        </div>
        <div className="foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

window.SCT_App = function App() {
  const route = useHashRoute();
  const page = findPage(route);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  React.useEffect(() => { setSidebarOpen(false); }, [route]);
  React.useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { palette: 'cream', font: 'plex', density: 'comfortable' });
  React.useEffect(() => { applyTweaks(t); }, [t.palette, t.font, t.density]);

  const theme = (t.palette === 'dark' || t.palette === 'ink') ? 'dark' : 'light';
  const toggleTheme = () => setTweak('palette', theme === 'dark' ? 'cream' : 'dark');

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(s => !s);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Topbar page={page} onSearch={() => setSearchOpen(true)}
              theme={theme} onToggleTheme={toggleTheme}
              onMenuOpen={() => setSidebarOpen(true)} />
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
      <div className="layout">
        <Sidebar currentId={page.id} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="main">
          <PageView page={page} />
        </main>
      </div>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio label="Palette" value={t.palette}
            options={[
              { value: 'cream', label: 'Cream' },
              { value: 'bone',  label: 'Bone' },
              { value: 'dark',  label: 'Dark' },
              { value: 'ink',   label: 'Ink' },
            ]}
            onChange={(v) => setTweak('palette', v)} />
        </TweakSection>
        <TweakSection label="Typography">
          <TweakSelect label="Body" value={t.font}
            onChange={(v) => setTweak('font', v)}
            options={[
              { value: 'plex',     label: 'IBM Plex Sans (default)' },
              { value: 'manrope',  label: 'Manrope' },
              { value: 'newsread', label: 'Newsreader serif' },
            ]} />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio label="Density" value={t.density}
            options={[
              { value: 'compact',     label: 'Compact' },
              { value: 'comfortable', label: 'Comfy' },
              { value: 'spacious',    label: 'Spacious' },
            ]}
            onChange={(v) => setTweak('density', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};
