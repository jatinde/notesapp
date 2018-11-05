const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const commandOptions = [{
    describe: 'Title of Note',
    demand: true,
    alias:'t'
}, {
    describe: 'Body of Note',
    demand: true,
    alias:'b'
}]
const argv = yargs
    .command('add','Adding a new note', {
        title: commandOptions[0],
        body: commandOptions[1]
    })
    .command('list', 'List all notes')
    .command('read', 'Get a note with title', {
        title: commandOptions[0]
    })
    .command('remove', 'Get a note with title', {
        title: commandOptions[0]
    })
    .help()
    .argv;
//const command = process.argv[2];
const command = argv._[0];

if(command === 'add') {  
    const note = notes.addNote(argv.title, argv.body); 
    if(note) {
        console.log(`Note added with title ${note.title} and body ${note.body}`);        
    } else {
        console.log(`Note with title ${argv.title} already exists.`);        
    }
} else if(command === 'list') {
    const allNotes = notes.getAll();
    allNotes.forEach((note, idx) => {
        console.log(`${idx}: ${note.title} ---> ${note.body}`);        
    });
} else if(command === 'read') {
    const note = notes.getNote(argv.title);

    if(note) {
        console.log(`Note found with title: ${note.title} ----> body: ${note.body}`); 
        
    } else {
        console.log('Note not exists');        
    }
} else if(command === 'remove') {
    if(notes.removeNote(argv.title)) {
        console.log(`Note removed with title ${argv.title}`);        
    } else {
        console.log(`Not able to remove note with title ${argv.title} as doesn't rexist`);
    }
} else {
    console.log("Command not reognized");    
}




