
import React from 'react'
import Note from './Note'
import NotefulContext from './NotefulContext';
import {findNote}  from './NoteHelpers'



export default class NotePageMain extends React.Component {
  static contextType = NotefulContext;

  render(){
    const { notes } = this.context;
    console.log(notes)
    const note = findNote(notes, this.props.match.params.noteId)
    console.log(note)
    return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
      <div className='NotePageMain__content'>
        {/* {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )} */}
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
}
