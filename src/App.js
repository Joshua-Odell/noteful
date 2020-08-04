import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ListNotes from './ListNotes/ListNotes'
import "./App.css"
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import ApiContext from './ApiContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NotePageMain from './NotePageMain/NotePageMain';
import config from './config';
import NoteError from './Errors/NoteError';

export default class App extends Component {
    
    //All buttons are functioning but the changes are not being displayed promptly 

    state ={
        notes: [],
        folders: [],
        selectedFolder: 'all'
    }
    
    componentDidMount() {
        
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
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

        return( 
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
                    <NoteError>
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
                    </NoteError>                    
                </main>
            </ApiContext.Provider>
            
        )
    }
    
}