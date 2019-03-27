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
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 200)
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
          // render={routeProps => {
            // const { noteId } = routeProps.match.params
            // const note = this.findNote(notes, noteId) || {}
            // const folder = this.findFolder(folders, note.folderId)
            // return (
              component={NotePageNav}
                // {...routeProps}
                // folder={folder}
              />
            )
          }}
        />
        {/* <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        /> */}
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
            // render={routeProps => {
            //   const { folderId } = routeProps.match.params
            //   const notesForFolder = this.getNotesForFolder(notes, folderId)
              // return (
                component={NoteListMain}
                  // {...routeProps}
                  // notes={notesForFolder}
                />
              )
            }}
          />
        )}
        <Route
          path='/note/:noteId'
          // render={routeProps => {
          //   const { noteId } = routeProps.match.params
          //   const note = this.findNote(notes, noteId)
          //   return (
              component={NotePageMain}
                // {...routeProps}
                // note={note}
              />
            )
          }}
        />
        {/* <Route
          path='/add-folder'
          // component={AddFolder}
        />
        <Route
          path='/add-note'
          render={routeProps => {
            return (
              <AddNote
                {...routeProps}
                folders={folders}
              />
            )
          }}
        /> */}
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
