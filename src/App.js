import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from './NoteListNav'
import NotePageNav from './NotePageNav'
import NoteListMain from './NoteListMain'
import NotePageMain from './NotePageMain'
import AddFolder from './addFolder'
import AddNote from './addNote'
import { getNotesForFolder, findNote, findFolder } from './NoteHelpers'
import NotefulContext from './NotefulContext'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => 
      note.id !== noteId)
    this.setState({
      notes: newNotes
    })
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

  renderNavRoutes() {
    const { notes, folders } = this.state
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
    const { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addNote: this.addNote,
      addFolder: this.addFolder,
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
            {/* <FontAwesomeIcon icon='check-double' /> */}
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

export default App
