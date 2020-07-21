import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError'
import ApiContext from '../ApiContext';
import config from '../config';
import PropTypes from 'prop-types';


export default class AddNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      newNote: '',
      folderSelection: '',
      content: '',
      touched: false,
      folderTouched: false
    }
  }
  static contextType = ApiContext

  clickHandler(){
    this.setState({click: true})
  }

  updateNoteName(newNote){
    this.setState({newNote: newNote, touched: true});
  }

  folderSelector(folderChoice){
    this.setState({folderSelection: folderChoice, folderTouched: true});
  }

  updateContent(message){
    this.setState({content: message});
  }

  validateNewNote() { 
    const newNoteTrim = this.state.newNote.trim()
    if(newNoteTrim < 1){
      return( "Note must be filled out" )
    }
  }

  validateFolder() {
    if(this.state.folderSelection === 'none'){
      return "Please select a valid folder"
    }
  }

  handleSubmit(event) {
    const newNoteId = Math.floor(Math.random() * Math.floor(999999999999))
    event.preventDefault();
    fetch(`${config.API_ENDPOINT}/notes/${newNoteId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      
      .catch(error => {
        console.error({ error })
      })
    // I need to figure out how to update folders and note list. Callback? how does this work with context.
  }

  render() {
    const { folders=[]} = this.context;
    const newNoteError = this.validateNewNote();
    const folderSelectionError = this.validateFolder();
    
      return(
        <form>
          <h2> Add a Note</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" onChange={e => this.updateNoteName(e.target.value)} />
            {this.state.touched && (
              <ValidationError message={newNoteError} />
            )}
            <label htmlFor="note-folder">Folder:</label>
            <select id="note-folder" name="note-folder" onChange={e => this.folderSelector(e.target.value)}>
              <option value='none'>--Pick A Folder--</option>
              {folders.map(folder =>
                <option value={folder.id}>{folder.name}</option>
              )}
            </select>
            {this.state.folderTouched && (
              <ValidationError message={folderSelectionError} />
            )}
            <label htmlFor='content'>What would you like your note to say?</label>
            <input type='text' name='content' id='content'onChange={e => this.updateContent(e.target.value)}/>            
            <button type='submit' disabled={this.validateNewNote() || this.validateFolder()}>Save</button>
          </div>
        </form>
      ); 
  }
}

AddNote.propTypes = {
  newNote: PropTypes.string,
  folderSelection: PropTypes.string,
  content: PropTypes.string,
  touched: PropTypes.bool,
  folderTouched: PropTypes.bool,
};
