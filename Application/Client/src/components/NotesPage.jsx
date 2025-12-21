import React, { useEffect, useState } from 'react';
import api from '../api';

export default function NotesPage({ user, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null); // null | note
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const resetForm = () => {
    setEditingNote(null);
    setForm({ title: '', content: '' });
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setForm({ title: note.title, content: note.content });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (editingNote) {
        const res = await api.put(`/notes/${editingNote.id}`, form);
        setNotes((prev) =>
          prev.map((n) => (n.id === editingNote.id ? res.data : n))
        );
      } else {
        const res = await api.post('/notes', form);
        setNotes((prev) => [res.data, ...prev]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="notes-page">
      <header className="top-bar">
        <div className="brand">
          <span className="logo-dot" />
          <span className="brand-text">MyNotes</span>
        </div>
        <div className="top-right">
          <span className="user-label">Hi, {user.name}</span>
          <button className="secondary-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="notes-main">
        <section className="editor-card">
          <h2>{editingNote ? 'Edit Note' : 'Create Note'}</h2>
          <form onSubmit={handleSubmit} className="note-form">
            <input
              type="text"
              placeholder="Note title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              rows="5"
              placeholder="Write your note here..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            {error && <div className="error-text">{error}</div>}
            <div className="editor-actions">
              {editingNote && (
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
              <button className="primary-btn" type="submit" disabled={saving}>
                {saving
                  ? 'Saving...'
                  : editingNote
                  ? 'Update Note'
                  : 'Add Note'}
              </button>
            </div>
          </form>
        </section>

        <section className="notes-list">
          <div className="notes-list-header">
            <h2>Your Notes</h2>
            {loading && <span className="loading-badge">Loading...</span>}
          </div>

          {notes.length === 0 && !loading && (
            <p className="empty-text">
              No notes yet. Start by writing something on the left ✍️
            </p>
          )}

          <div className="notes-grid">
            {notes.map((note) => (
              <article key={note.id} className="note-card">
                <div className="note-header">
                  <h3>{note.title || 'Untitled'}</h3>
                  <span className="note-date">
                    {new Date(note.updated_at).toLocaleString()}
                  </span>
                </div>
                <p className="note-content">
                  {note.content || 'No content'}
                </p>
                <div className="note-actions">
                  <button
                    className="secondary-btn small"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="danger-btn small"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
