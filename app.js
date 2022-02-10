const notes = require('./notes');
const chalk = require('chalk');
const yargs = require('yargs');

// Yargs Version
yargs.version('1.0.1');

// Creat add comands
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body Note',
            demandOption: true,
            type: 'string'
        }
    },

    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Removing commands
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
       notes.removeNote(argv.title)
    }
})

// List commands
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler() {
        notes.listNotes()
    }
})

// Read commands
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse();
