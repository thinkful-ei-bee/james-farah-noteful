import React, { Component } from 'react'
import NotefulForm from './NotefulForm'
import NotefulContext from './NotefulContext';


export default class AddFolder extends Component {
    static contextType = NotefulContext;

    
    handleSubmit = e => {
        e.preventDefault()
        const { name } = e.target
        const folder = {
            name: name.value,
        }
        fetch(`http://localhost:9090/folders`)
        .then (res => {
            if (!res.ok){
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(folderResponseData => {
            name.value = ''
            this.context.addFolder(folderResponseData)
        })
        .catch(error => console.log(error))
    }
 
    render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
