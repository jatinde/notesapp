const fs = require('fs');

const fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes-data.json'));
    } catch (error) {
        return [];
    }
}

const saveNotes = notes => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

const addNote = (title, body) => {
    let notes =  fetchNotes();  

    const duplicateNotes = notes.filter(noteIn => noteIn.title === title)
    if(duplicateNotes.length === 0) {
        const note = {
            title,
            body
        };
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

const getAll = () => {
    return fetchNotes();   
}

const getNote = (title) => {
    const notes = fetchNotes();
    const filteredNotes = notes.filter(note => note.title === title);
    const note =  filteredNotes[0];
    return note;    
}

const removeNote = (title) => {
    const notes = fetchNotes();
    const filteredNotes = notes.filter(note => note.title !== title);  
    saveNotes(notes);
    return notes.length !== filteredNotes.length;
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}
