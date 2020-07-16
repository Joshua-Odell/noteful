import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function FolderList(props) {
    return(
        <div>
            <ul>
                {props.folders.map(folder =>
                <li key={folder.id}>
                    <NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink>
                </li>
                    )}
            </ul>
            <Link to='/add-folder'>Add Folder Buton</Link>
            
        </div>
    )
} 