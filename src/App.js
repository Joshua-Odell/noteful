import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';

import ListNotes from './Folder/ListNotes'
import "./App.css"
import dummyStore from './dummy-store';
import NoteListNav from './Nav/NoteListNav';
import NotePageNav from './Nav/NotePageNav';
import ApiContext from './ApiContext';
import ListFolders from './Note/ListFolders';

export default class App extends Component {

    state ={
        notes: [],
        folders: []
    }
    
    componentDidMount() {
        setTimeout(() => this.setState(dummyStore), 600);
        // Promise.all([
        //     fetch(`${config.API_ENDPOINT}/notes`),
        //     fetch(`${config.API_ENDPOINT}/folders`)
        // ])
        //     .then(([notesRes, foldersRes]) => {
        //         if (!notesRes.ok)
        //             return notesRes.json().then(e => Promise.reject(e));
        //         if (!foldersRes.ok)
        //             return foldersRes.json().then(e => Promise.reject(e));

        //         return Promise.all([notesRes.json(), foldersRes.json()]);
        //     })
        //     .then(([notes, folders]) => {
        //         this.setState({notes, folders});
        //     })
        //     .catch(error => {
        //         console.error({error});
        //     });
    }

    handleDeleteItem = Id => {
        this.setState({
            notes: this.state.notes.filter(note => note.Id !== Id)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote
        };
        return(
            <ApiContext.Provider value={value}>
                <main>
                    <nav>{this.renderNavRoutes()}</nav>
                    <header>
                        <h1>
                            <Link to='/'>
                                Noteful
                            </Link>
                        </h1>
                    </header>
                    <div className="App">                                        
                        <div className="item">
                            {['/', '/folder/:folderId'].map(path => (
                                <Route exact key={path} path={path}><ListFolders/></Route>
                            ))}
                        </div>
                        <div className="item">
                            {['/', '/note/:noteId'].map(path => (
                                <Route exact key={path} path={path}><ListNotes/></Route> 
                            ))}
                        </div>
                    </div>
                </main>
            </ApiContext.Provider>
            
        )
    }
    
}