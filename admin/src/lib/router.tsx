import { createContext, useContext, useEffect, useState } from 'react';

// Minimal path-based client router for the /admin/* SPA -- no external
// dependency, just enough to match the routes this app needs.
const RouterContext = createContext<{ path: string; navigate: (to: string) => void } | null>(null);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    const onPop = () => setPath(location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to: string) => {
    if (to !== location.pathname) {
      history.pushState(null, '', to);
      setPath(to);
    }
  };

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

export function Link({ to, className, children, onClick }: { to: string; className?: string; children: React.ReactNode; onClick?: () => void }) {
  const { navigate } = useRouter();
  return (
    <a href={to} className={className} onClick={(e) => { e.preventDefault(); onClick?.(); navigate(to); }}>
      {children}
    </a>
  );
}

// Matches "/admin/pages/:id/edit" style patterns against the current path.
export function matchRoute(pattern: string, path: string): Record<string, string> | null {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    if (p.startsWith(':')) params[p.slice(1)] = decodeURIComponent(pathParts[i]);
    else if (p !== pathParts[i]) return null;
  }
  return params;
}
