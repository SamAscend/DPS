const backendHttp = 'http://localhost:5000/notes';
const socket = io('http://localhost:5000');

function appendNote(note) {
  const li = document.createElement('li');
  li.textContent = note.text;
  document.getElementById('notesList').appendChild(li);
}

async function fetchNotes() {
  const res = await fetch(backendHttp);
  const notes = await res.json();
  const list = document.getElementById('notesList');
  list.innerHTML = '';
  notes.forEach(appendNote);
}

async function addNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) {
    alert('Note cannot be empty!');
    return;
  }

  await fetch(backendHttp, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = '';
}

// Listen for new notes from server
socket.on('note_added', (note) => {
  appendNote(note);
});

// Load notes initially
fetchNotes();
