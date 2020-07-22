import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import AddNote from './add-note';
import ApiContext from '../ApiContext';
import { getNotesForFolder } from '../notes-helpers';
import Note from './note';
import './note.css';
import Base from '../Nav/Base'

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
        const { selectedFolder } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)

        console.log(selectedFolder, "list note render")
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