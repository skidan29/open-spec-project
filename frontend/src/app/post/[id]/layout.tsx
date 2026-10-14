import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      {/* Сайдбар — общий только для /dashboard/* */}
      <aside style={{
        width: 200,
        padding: 24,
        background: '#f1f5f9',
        borderRight: '1px solid #e2e8f0',
      }}>
        <h3>Dashboard</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link href="/dashboard">Обзор</Link>
          <Link href="/dashboard/settings">Настройки</Link>
          <Link href="/dashboard/profile">Профиль</Link>
        </nav>
      </aside>

      {/* Сюда подставляется конкретная страница */}
      <main style={{ flex: 1, padding: 24 }}>
        {children}
      </main>
    </div>
  );
}