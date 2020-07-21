import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';

import ListNotes from './Note/ListNotes'
import "./App.css"
import dummyStore from './dummy-store';
import NoteListNav from './Nav/NoteListNav';
import NotePageNav from './Nav/NotePageNav';
import ApiContext from './ApiContext';
import ListFolders from './Folder/ListFolders';
import AddFolder from './Folder/add-folder';
import AddNote from './Note/add-note';
import NotePageMain from './Note/NotePageMain';
import NoteListMain from './Note/NoteListMain';

export default class App extends Component {
    
    state ={
        notes: [],
        folders: [],
        selectedFolder: 'all'
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

    settingSelectedFolder(folderId){
        console.log(folderId);
        this.setState({selectedFolder: folderId});
        console.log(this.state.selectedFolder);
    }

    
    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            selectedFolder: this.state.selectedFolder
        };
        console.log(value)
        return( //call={this.settingSelectedFolder()} to go inside NoteListNav. NW maximumum update depth error
            <ApiContext.Provider value={value}>
                <main className="App">                    
                    <header>
                        <h1>
                            <Link to='/'>
                                Noteful
                            </Link>
                        </h1>
                        <nav>
                            {['/', '/folder/:folderId'].map(path => (
                                <Route exact key={path} path={path}>
                                    <NoteListNav /> 
                                </Route>
                            ))}
                            <Route path="/note/:noteId" component={NotePageNav} />
                            <Route path="/add-folder" component={AddFolder} />
                            <Route path="/add-note" component={AddNote} />
                        </nav>
                    </header>
                    <div className="notes">
                        {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={ListNotes}
                        />
                        ))}      
                        <Route path={"/note/:noteId"}><NotePageMain/></Route> 
                    </div>
                </main>
            </ApiContext.Provider>
            
        )
    }
    
}