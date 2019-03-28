import React, { Component } from 'react'
import NotefulForm from './NotefulForm'
import NotefulContext from './NotefulContext'
//import './AddFolder.css'



export default class AddFolder extends Component {
  static contextType = NotefulContext;
  state= {
    error: null,
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name } = e.target
    const folder = {
      
    }
    this.setState({error: null})
    fetch(`http://localhost:9090/folders`,{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok){
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        name.value = ''
        this.context.addFolder(data)
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({error})
      })
  }

  render() {
    const { error } = this.state
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
            <button 
              type='submit'
              onSubmit={this.handleSubmit}
            > Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
