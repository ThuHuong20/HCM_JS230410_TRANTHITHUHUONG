"use strict";
class Note {
    constructor(note, id = Date.now() * Math.random()) {
        this.note = note;
        this.id = id;
    }
}
class NoteManager {
    constructor() {
        var _a;
        this.notes = [];
        let notesLocal = JSON.parse((_a = (localStorage.getItem("notes"))) !== null && _a !== void 0 ? _a : "[]");
        let notesTemp = [];
        for (let i in notesLocal) {
            notesTemp.push(new Note(notesLocal[i].note, notesLocal[i].id));
        }
        this.notes = notesTemp;
        this.render();
    }
    createNote(newNote) {
        this.notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.render();
    }
    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id != id);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.render();
    }
    render() {
        let renderEl = document.getElementById("content_list");
        let noteString = ``;
        this.notes.map((note, index) => {
            noteString += `
                <div id="list_note">
                    <p>${note.note}</p>
                     <i  onclick="handleDeleteNote(${note.id})" class="fa-solid fa-trash-can"></i>
                </div>
            `;
        });
        renderEl.innerHTML = noteString;
    }
}
const notes = new NoteManager();
function addNewNote() {
    let noteValue = document.getElementById("note").value;
    let newNote = new Note(noteValue);
    notes.createNote(newNote);
    alert("Note added successfully!");
    document.getElementById("note").value = "";
}
function handleDeleteNote(id) {
    if (confirm("Do you want to delete note")) {
        notes.deleteNote(id);
        alert("Delete note successfully!");
    }
}
