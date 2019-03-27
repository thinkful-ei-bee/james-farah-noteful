import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from './NoteListNav'
import NotePageNav from './NotePageNav'
import NoteListMain from './NoteListMain'
import NotePageMain from './NotePageMain'
import NotefulContext from './NotefulContext'
// import AddFolder from '../AddFolder/AddFolder'
// import AddNote from '../AddNote/AddNote'
import dummyStore from './store'

export default class App extends Component {
  state = {
    notes:[],
    folders:[],
  }

  componentDidMount() {
    Promise.all ([
      fetch (`http://localhost:9090/notes`),
      fetch (`http://localhost:9090/folders`)])
    .then(([notesResponse, foldersResponse]) => {
      if (!notesResponse.ok){
        throw new Error (notesResponse.status)
      }
      if (!foldersResponse.ok){
        throw new Error (foldersResponse)
      }
      return Promise.all([notesResponse.json(), foldersResponse.json()])
    })
    .then (arrOfJsonRes => {
      console.log(arrOfJsonRes)
      this.setState({
        notes: arrOfJsonRes[0],
        folders: arrOfJsonRes[1], 
      })
    })
    .catch(err => console.log(err));
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder
      ]
    })
  }

  handleAddNotes = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  handleDeleteFolder = folderId => {
    const newFolders = this.state.folders.filter(folder => folder.id !== folderId)
    this.setState({
      folders: newFolders
    })
  }

  handleDeleteNote = noteId => {
    const newNote = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNote
    })
  }

findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)
findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)
getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)
countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folderId === folderId).length


  renderNavRoutes() {

    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
          <Route
          path='/note/:noteId'
              component={NotePageNav}
              />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {

    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
                component={NoteListMain}
                />
              )
            }
        <Route
          path='/note/:noteId'
              component={NotePageMain}
          />
      </>
    )
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
    }

    return (
      <div className='App'>
      <NotefulContext.Provider value={contextValue}>
       <nav className='App__nav'>
          {this.renderNavRoutes()}
        </nav>
        <header className='App__header'>
          <h1>
            <Link to='/'>Noteful</Link>
            {' '}
          </h1>
        </header>
        <main className='App__main'>
          {this.renderMainRoutes()}
        </main>
        </NotefulContext.Provider>
      </div>
    )
  }
}
