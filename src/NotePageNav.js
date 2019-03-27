
import React from 'react'
import NotefulContext from './NotefulContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import CircleButton from '../CircleButton/CircleButton'
// import './NotePageNav.css'

export default class NotePageNave extends React.Component {
  
  static contextType = NotefulContext;

  render() {
    const {folders} = this.context
  
  return (
    <div>
      <button onClick={() => folders.history.goBack()}>
        Back
      </button>
      {folders && (
        <h3 className='NotePageNav__folder-name'>
          {folders.name}
        </h3>
      )}
    </div>
  

    // <div className='NotePageNav'>
    //   <CircleButton
    //     tag='button'
    //     role='link'
    //     onClick={() => props.history.goBack()}
    //     className='NotePageNav__back-button'
    //   >
    //     <FontAwesomeIcon icon='chevron-left' />
    //     <br />
    //     Back
    //   </CircleButton>
    //   {props.folder && (
    //     <h3 className='NotePageNav__folder-name'>
    //       {props.folder.name}
    //     </h3>
    //   )}
    // </div>
  )
}

}
// NotePageNav.defaultProps = {
//   history: {
//     goBack: () => {}
//   }
// }