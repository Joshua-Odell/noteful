import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ApiContext from '../ApiContext'
import config from '../config'
import './note.css'


export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props
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
        >
          {' '}
          remove
        </button>        
      </div>
    )
  }
}
