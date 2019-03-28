import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
//import { format } from 'date-fns';



function deleteNote(noteId, cb){
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
    // headers: {

    // }
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => {
        throw error
      })
    }
    return res.json()
  })
  .then(data => {
    cb(noteId)
  })
  .catch(error => {
    console.error(error)
  })
}

export default function Note(props) {
    return (
      <NotefulContext.Consumer>
        {(context) => (
          <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${props.id}`}>
              {props.name}
            </Link>
          </h2>
          <button 
            className='Note__delete' 
            type='button'
            onClick={() => {
              deleteNote(
                props.id,
                context.deleteNote,
              )
            }}
    
          >
            {' '}
            remove
          </button>
          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified
              {' '}
              <span className='Date'>
                {/* {format(props.modified, 'Do MMM YYYY')} */}
              </span>
            </div>
          </div>
        </div>
         )}
    
    </NotefulContext.Consumer>
  )}
