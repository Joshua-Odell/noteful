 // A list of notes in related folder
 import React from 'react';
 import Note from './note';
 import { Link, NavLink } from 'react-router-dom';

 export default function List(props) {
     return(
         <div> 
            <ul>
                {props.notes.map(notes =>
                <li key={notes.id}>
                    <NavLink to={`/notes/${notes.name}`}>{notes.name}</NavLink>
                </li>
                )}   
            </ul>
            <Link to='/Add-Note'>
                Add a Note Button    
            </Link>   
         </div>
     )
 }