import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import List from './Note/list';
import FolderList from './Folder/folder-list'
import "./App.css"
import dummyStore from './dummy-store';
import NoteListNav from './Nav/NoteListNav';
import NotePageNav from './Nav/NotePageNav';
import ApiContext from './ApiContext';

export default class App extends Component {

    state ={
        notes: [],
        folders: []
    }
    
    componentDidMount() {
        setTimeout(() => this.setState(dummyStore), 0);
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
                            <BrowserRouter>
                                <Link to='/'>
                                    Noteful
                                </Link>
                            </BrowserRouter>
                        </h1>
                    </header>
                    <div className="App">
                        <div className="item">
                            {['/', '/folder/:folderId'].map(path => (
                                <Route exact key={path} path={path}><FolderList/></Route> 
                            ))}
                        </div>
                
                        <div className="item">
                                <Route exact path='/note/:noteId'><List/></Route>
                        </div>
                    </div>
                </main>
            </ApiContext.Provider>
            
        )
    }
    
}