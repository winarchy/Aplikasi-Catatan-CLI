const fs = require('fs');
const chalk = require('chalk');


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title) 

    if (!duplicateNote) {
        const colorLog = chalk.black.bgYellow.bold('New note added! / Catatan baru di tambahkan')
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(colorLog)
    }else {
        const colorLog = chalk.white.bgRed.bold('Note title taken! / Catatan sudah ada')
        console.log(colorLog)
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        const colorLog = chalk.black.bgGreen.bold('Note Removed! / Catatan di Hapus')
        saveNotes(notesToKeep)
        console.log(colorLog)
    }else {
        const colorLog = chalk.white.bgRed.bold('No Note Found / Tidak di temukan')
        console.log(colorLog)
    }

}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(chalk.blue.inverse(note.body))
    }else {
        console.log(chalk.red.inverse('Note not found! / Tidak ada catatan!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes / Daftar Catatan'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const loadNotes = () => {

    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}