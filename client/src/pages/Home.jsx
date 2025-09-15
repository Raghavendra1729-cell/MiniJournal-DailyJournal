import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../api/client.js'

function EntryCard({ entry, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(entry.content)
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    const res = await api.updateEntry(entry.id, { content })
    const j = res.journal || res
    onUpdate({ id: j._id || j.id, date: j.date || j.createdAt, content: j.content })
    setSaving(false)
    setEditing(false)
  }

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-600">{new Date(entry.date).toLocaleDateString()}</div>
        <div className="flex gap-2">
          {!editing ? (
            <button className="text-sm px-2 py-1 rounded border" onClick={() => setEditing(true)}>Edit</button>
          ) : (
            <button className="text-sm px-2 py-1 rounded bg-gray-900 text-white" disabled={saving} onClick={save}>{saving ? 'Saving…' : 'Save'}</button>
          )}
          <button className="text-sm px-2 py-1 rounded border" onClick={() => onDelete(entry.id)}>Delete</button>
        </div>
      </div>
      {!editing ? (
        <p className="whitespace-pre-wrap text-gray-800">{content}</p>
      ) : (
        <textarea className="w-full rounded-md border p-2" rows={4} value={content} onChange={e => setContent(e.target.value)} />
      )}
    </div>
  )
}

function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectedRef = useRef(false)
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [newContent, setNewContent] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await api.getEntries()
        const list = res.journals || res
        const normalized = list.map(e => ({ id: e._id || e.id, date: e.date || e.createdAt, content: e.content }))
        setEntries(normalized)
      } catch (e) {
        if (!redirectedRef.current && (e?.message?.toLowerCase().includes('access denied') || e?.message?.includes('Invalid token') || e?.message?.includes('401'))) {
          redirectedRef.current = true
          if (location.pathname !== '/login') navigate('/login', { replace: true })
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [navigate, location.pathname])

  async function create() {
    if (!newContent.trim()) return
    const res = await api.createEntry({ date: new Date().toISOString(), content: newContent.trim() })
    const j = res.journal || res
    const created = { id: j._id || j.id, date: j.date || j.createdAt, content: j.content }
    setEntries(prev => [created, ...prev])
    setNewContent('')
  }

  function update(updated) {
    setEntries(prev => prev.map(e => e.id === updated.id ? updated : e))
  }

  async function remove(id) {
    await api.deleteEntry(id)
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  if (loading) {
    return (
      <div className="min-h-40 grid place-items-center">
        <div className="animate-spin h-10 w-10 rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-white p-4">
        <h2 className="font-semibold mb-2">New entry</h2>
        <textarea className="w-full rounded-md border p-2 mb-3" rows={4} placeholder="How was your day?" value={newContent} onChange={e => setNewContent(e.target.value)} />
        <button onClick={create} className="px-3 py-1.5 rounded-md bg-gray-900 text-white">Add entry</button>
      </div>
      <div className="space-y-3">
        {entries.map(e => (
          <EntryCard key={e.id} entry={e} onUpdate={update} onDelete={remove} />
        ))}
        {entries.length === 0 && <p className="text-gray-600 text-sm">No entries yet.</p>}
      </div>
    </div>
  )
}

export default Home


