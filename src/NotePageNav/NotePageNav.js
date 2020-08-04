import React from 'react'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import Base from '../Base/Base'
import config from '../config'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.match.params.noteId

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
        let indexCount = this.context.notes.findIndex( e => e.id === noteId)
        this.context.notes.splice(indexCount,1);
        window.location.reload();
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotePageNav'>
        <Base
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <br />
          Back
        </Base>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
        <div>
          {note.content}
        </div>
        <br/>
        <div>
        <button
          className='Card-Delete Item'
          type='button'
          onClick={this.handleClickDelete}
          id={noteId}
        >
          Remove
        </button> 
        </div>
      </div>
    )
  }
}