import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { api } from './api/client.js'
// no profile check here; handled within pages

function App() {
  const [user, setUser] = useState(null)

  async function handleLogout() {
    try { await api.logout() } catch {}
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={!user ? <Login onAuthed={setUser} /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!user ? <Register onAuthed={setUser} /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
