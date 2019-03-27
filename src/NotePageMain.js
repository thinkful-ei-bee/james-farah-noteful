
import React from 'react'
import Note from './Note'
import NotefulContext from './NotefulContext';
import { countNotesForFolder } from './NoteHelpers'


export default class NotePageMain extends React.Component {
  static contextType = NotefulContext;
 
  render() {
  const { notes } = this.context
  console.log(notes)
  
  return (
    <section className='NotePageMain'>
      <Note
        id={notes.id}
        name={notes.name}
        modified={notes.modified}
      />
      {/* <div className='NotePageMain__content'>
        {notes.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div> */}
    </section>
  )
}
}