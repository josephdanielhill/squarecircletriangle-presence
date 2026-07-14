import { auth } from './lib/auth';
import { RouterProvider, useRouter, Link, matchRoute } from './lib/router';
import { Login } from './routes/Login';
import { PageList } from './routes/PageList';
import { PageNew } from './routes/PageNew';
import { PageEditor } from './routes/PageEditor';
import { DraftQueue } from './routes/DraftQueue';
import { DraftReview } from './routes/DraftReview';

function Shell({ children }: { children: React.ReactNode }) {
  const session = auth.useSession();
  const email = session.data?.user?.email;

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <Link to="/admin/pages" className="admin-brand">SquareCircleTriangle · Admin</Link>
        <nav className="admin-nav">
          <Link to="/admin/pages">Pages</Link>
          <Link to="/admin/drafts">Drafts</Link>
        </nav>
        <div className="admin-topbar-right">
          {email && <span className="field-hint">{email}</span>}
          <button className="btn-link" onClick={() => auth.signOut()}>Sign out</button>
        </div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  );
}

function Routes() {
  const { path } = useRouter();

  let params;
  if ((params = matchRoute('/admin/pages/new', path))) return <PageNew />;
  if ((params = matchRoute('/admin/pages/:id/edit', path))) return <PageEditor pageId={params.id} />;
  if ((params = matchRoute('/admin/drafts/:draftId', path))) return <DraftReview draftId={params.draftId} />;
  if ((params = matchRoute('/admin/drafts', path))) return <DraftQueue />;
  return <PageList />;
}

function AdminInner() {
  const session = auth.useSession();

  if (session.isPending) {
    return <div className="login-screen"><p className="field-hint">Loading…</p></div>;
  }
  if (!session.data) {
    return <Login />;
  }
  return (
    <Shell>
      <Routes />
    </Shell>
  );
}

export function AdminApp() {
  return (
    <RouterProvider>
      <AdminInner />
    </RouterProvider>
  );
}
