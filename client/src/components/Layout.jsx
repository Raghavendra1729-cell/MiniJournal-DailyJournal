import { Link } from 'react-router-dom'

function Layout({ children, user, onLogout }) {
  return (
    <div className="min-h-dvh bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to={user ? "/" : "/login"} className="font-semibold">MiniJournal</Link>
          <nav className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-600">{user.name || user.userName || user.email}</span>
                <button onClick={onLogout} className="text-sm px-3 py-1.5 rounded-md bg-gray-900 text-white">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-700">Login</Link>
                <Link to="/register" className="text-sm px-3 py-1.5 rounded-md bg-gray-900 text-white">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}

export default Layout


