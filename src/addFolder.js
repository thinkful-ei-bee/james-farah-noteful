import React, { Component } from 'react'
import NotefulForm from './NotefulForm'
import NotefulContext from './NotefulContext'
//import './AddFolder.css'



export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = NotefulContext;
  state= {
    error: null,
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name } = e.target
    const folder = {
      name: name['name'].value,
    }
    fetch(`http://localhost:9090/folders`,{
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok)
        return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.log({ error })
      })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' />
          </div>
          <div className='buttons'>
            <button 
              type='submit'
            > Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
