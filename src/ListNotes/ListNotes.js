import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ApiContext from '../ApiContext';
import { getNotesForFolder } from '../notes-helpers';
import Note from '../Note/Note';
import '../Note/note.css';
import Base from '../Base/Base'

export default class ListNotes extends React.Component {
    static defaultProps = {
      match: {
        params: {}
      }
    }
    static contextType = ApiContext

    handleDeleteNote = noteId => {
        this.props.history.push(`/`)
    }

    render() {
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
            return(
                <div>
                    <div className='Note-Title'>
                        <h2>Notes</h2>
                        <div className='Add-Note-Button'>
                            <Base tag={Link} to='/add-note' type='button' className='Add-Note'> Add Note </Base>
                        </div>
                    </div>                
                    <ul>
                        {notesForFolder.map(note =>
                        <li className="Note-Cards" key={note.id}>
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>
                        )}
                    </ul>              
                </div>
            )
        } 
    
} 