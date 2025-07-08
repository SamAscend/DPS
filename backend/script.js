document.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.getElementById("note-input");
  const addNoteBtn = document.getElementById("add-note-btn");
  const noteList = document.getElementById("note-list");
  const searchInput = document.getElementById("search-input");

  let notes = [];

  const renderNotes = (filter = "") => {
    noteList.innerHTML = "";

    const filteredNotes = notes.filter(note =>
      note.content.toLowerCase().includes(filter.toLowerCase())
    );

    filteredNotes.forEach(note => {
      const noteItem = document.createElement("li");
      noteItem.className = note.done ? "note done" : "note";

      const contentSpan = document.createElement("span");
      contentSpan.textContent = note.content;

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "actions";

      const doneBtn = document.createElement("button");
      doneBtn.textContent = note.done ? "Undone" : "Done";
      doneBtn.onclick = () => {
        note.done = !note.done;
        renderNotes(searchInput.value);
      };

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        const newText = prompt("Edit your note:", note.content);
        if (newText !== null && newText.trim() !== "") {
          note.content = newText.trim();
          renderNotes(searchInput.value);
        }
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        notes = notes.filter(n => n.id !== note.id);
        renderNotes(searchInput.value);
      };

      actionsDiv.appendChild(doneBtn);
      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(deleteBtn);

      noteItem.appendChild(contentSpan);
      noteItem.appendChild(actionsDiv);

      noteList.appendChild(noteItem);
    });
  };

  addNoteBtn.addEventListener("click", () => {
    const content = noteInput.value.trim();
    if (content !== "") {
      notes.push({
        id: Date.now(),
        content: content,
        done: false,
      });
      noteInput.value = "";
      renderNotes(searchInput.value);
    }
  });

  searchInput.addEventListener("input", () => {
    renderNotes(searchInput.value);
  });

  renderNotes();
});
