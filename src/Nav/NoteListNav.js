import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import { countNotesForFolder } from '../notes-helpers';
import Base from './Base';
import AddFolder from '../Folder/add-folder';


export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div>
        <ul className='Container'>
          {folders.map(folder =>
            <li className='item' key={folder.id}>
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
          <AddFolder/>
        </div>
      </div>
    )
  }
}
