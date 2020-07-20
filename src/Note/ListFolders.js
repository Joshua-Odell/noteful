import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import AddNote from './add-note';
import ApiContext from '../ApiContext';
import { getNotesForFolder } from '../notes-helpers';
import Note from './note';
import AddFolder from '../Folder/add-folder';

export default class ListFolders extends React.Component {
    static defaultProps = {
        click: false,
      match: {
        params: {}
      }
    }
    static contextType = ApiContext

    handleDeleteNote = folderId => {
        this.props.history.push(`/`)
      }

    render() {
        const { folderId } = this.props.match.params
        const { folders=[] } = this.context
        

        return(
            <div>
                <ul>
                    {folders.map(folder =>
                    <li key={folder.id}>
                        {folder.name}
                    </li>
                    )}
                </ul>
                <AddFolder tag={Link} to='/add-folder' type='button' click={this.props.click} >Add Folder</AddFolder>
                
            </div>
        )
    }
    
} 