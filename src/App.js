import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import List from './Note/list';
import FolderList from './Folder/folder-list'
import "./App.css"
import dummyStore from './dummy-store';

export default class App extends Component {

    state ={
        notes: [],
        folders: []
    }
    
    componentDidMount() {
        setTimeout(() => this.setState(dummyStore), 600);
    }


    render() {
        const {notes, folders} = this.state
        return(
            <main>
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
                <div>
                <BrowserRouter>
                {['/', '/folder/:folderId'].map(path => (
                    <Route exact path='/'><FolderList folders={folders} notes={notes} /></Route> 
                ))}
                </BrowserRouter>
                </div>
          
                <div>
                <BrowserRouter>
                    <Route exact path='/'><List folders={folders} notes={notes}/></Route> 
                </BrowserRouter>
                </div>
            </div>
            </main>
            
        )
    }
    
}