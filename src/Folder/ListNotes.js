import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import AddNote from '../Note/add-note';
import ApiContext from '../ApiContext';
import { getNotesForFolder } from '../notes-helpers';
import Note from '../Note/note';

export default class ListNotes extends React.Component {
    static defaultProps = {
        click: false,
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
                <ul>
                    {notesForFolder.map(note =>
                    <li key={note.id}>
                        <Note
                            id={note.id}
                            name={note.name}
                            modified={note.modified}
                        />
                    </li>
                    )}
                </ul>
                <AddNote tag={Link} to='/add-note' type='button' > Add Note </AddNote>
                
            </div>
        )
    }
    
} 