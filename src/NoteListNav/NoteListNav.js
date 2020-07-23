import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import { countNotesForFolder } from '../notes-helpers';
import Base from '../Base/Base';
import AddFolder from '../AddFolder/AddFolder';


export default class NoteListNav extends React.Component {
  state ={
    selectedFolder: 'all'
  }

  static contextType = ApiContext;
  
  settingSelectedFolder(folderId){
    console.log(folderId);
    this.setState({selectedFolder: folderId});
    console.log(this.state.selectedFolder);
}

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div>
        <ul className='Container'>
          {folders.map(folder =>
            <li className='item' key={folder.id} onClick={e => this.settingSelectedFolder(folder.id)}>
              <NavLink
                to={`/folder/${folder.id}`}
              >
                <span>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className="add-folder-button">
          <Base tag={Link} to='/add-folder' type='button'> Add a Folder </Base>
        </div>
      </div>
    )
  }
}
