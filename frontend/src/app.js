import React, { useEffect, useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const handleAddNote = async () => {
    const res = await fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
    setText('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.text}</li>
        ))}
      </ul>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="New note" />
      <button onClick={handleAddNote}>Add</button>
    </div>
  );
}

export default App;
