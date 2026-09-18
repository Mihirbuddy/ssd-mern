import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/notes";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get(API_URL);
        setNotes(response.data);
      } catch {
        setError("Unable to load notes.");
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(API_URL, { title, content });
      setNotes((currentNotes) => [response.data, ...currentNotes]);
      setTitle("");
      setContent("");
    } catch {
      setError("Unable to create the note.");
    }
  }

  async function handleDelete(id) {
    setError("");

    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes((currentNotes) =>
        currentNotes.filter((note) => note._id !== id),
      );
    } catch {
      setError("Unable to delete the note.");
    }
  }

  return (
    <main className="container">
      <h1>Student Notes</h1>

      <form className="note-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
        />

        <button type="submit">Add Note</button>
      </form>

      {error && <p className="error">{error}</p>}

      <section className="notes" aria-live="polite">
        {loading ? (
          <p className="status">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="status">No notes yet — add one above!</p>
        ) : (
          notes.map((note) => (
            <article className="note-card" key={note._id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <time dateTime={note.createdAt}>
                {new Date(note.createdAt).toLocaleString()}
              </time>
              <button type="button" onClick={() => handleDelete(note._id)}>
                Delete
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default App;
