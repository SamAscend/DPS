const backendHttp = 'http://localhost:5000/notes';
const socket = io('http://localhost:5000');

let notes = [];

// Fetch and render notes from backend
async function fetchNotes() {
  const res = await fetch(backendHttp);
  notes = await res.json();
  renderNotes(notes);
}

// Add new note to backend
async function addNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) {
    alert('Note cannot be empty!');
    return;
  }

  const res = await fetch(backendHttp, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, done: false })
  });

  input.value = '';
  const newNote = await res.json();
  notes.push(newNote);
  renderNotes(notes);
}

// Toggle checklist status
async function toggleDone(id, done) {
  await fetch(`${backendHttp}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done: !done })
  });

  const note = notes.find(n => n.id === id);
  if (note) note.done = !done;
  renderNotes(notes);
}

// Delete note
async function deleteNote(id) {
  await fetch(`${backendHttp}/${id}`, {
    method: 'DELETE'
  });

  notes = notes.filter(n => n.id !== id);
  renderNotes(notes);
}

// Edit note
async function editNote(id, currentText) {
  const newText = prompt("Edit note:", currentText);
  if (newText !== null && newText.trim() !== "") {
    await fetch(`${backendHttp}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText.trim() })
    });

    const note = notes.find(n => n.id === id);
    if (note) note.text = newText.trim();
    renderNotes(notes);
  }
}

// Filter search
function filterNotes() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = notes.filter(n => n.text.toLowerCase().includes(query));
  renderNotes(filtered);
}

// Render all notes
function renderNotes(noteList) {
  const list = document.getElementById('notesList');
  list.innerHTML = '';

  noteList.forEach(note => {
    const li = document.createElement('li');
    li.className = "note-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = note.done;
    checkbox.onchange = () => toggleDone(note.id, note.done);

    const span = document.createElement("span");
    span.textContent = note.text;
    span.className = "note-text" + (note.done ? " done" : "");
    span.onclick = () => editNote(note.id, note.text);

    const actions = document.createElement("div");
    actions.className = "note-actions";

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => deleteNote(note.id);

    actions.appendChild(delBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

// Socket.io real-time update
socket.on('note_added', (note) => {
  notes.push(note);
  renderNotes(notes);
});

// Initial load
fetchNotes();
