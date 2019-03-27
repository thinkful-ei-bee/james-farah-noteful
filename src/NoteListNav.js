import React from 'react'
import { NavLink } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import CircleButton from '../CircleButton/CircleButton'
//import { countNotesForFolder } from './App'
// import './NoteListNav.css'

export default function NoteListNav(props) {
  const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folderId === folderId).length
  return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {props.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(props.notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
      {/* <div className='NoteListNav__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
        </CircleButton>
      </div> */}
    </div>
  )
}

NoteListNav.defaultProps = {
  folders: []
}