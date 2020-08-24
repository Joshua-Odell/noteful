import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import config from '../config'
import './note.css'


export default class Note extends React.Component {
  
  static contextType = ApiContext;

  
  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    console.log(noteId)

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(`${noteId}`)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id } = this.props
    //console.log(name, id)
    return (
      <div className='Card'>
        <p className='Card-Title Item'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </p>
        <button
          className='Card-Delete Item'
          type='button'
          onClick={this.handleClickDelete}
          id={id}
        >
          {' '}
          Remove
        </button>        
      </div>
    )
  }
}
