import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError'
import ApiContext from '../ApiContext';


export default class AddNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      newNote: '',
      folderSelection: '',
      click: false,
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

  validateNewNote() {  // I am getting undefined in the components section for this validation
    const newNoteTrim = this.state.newNote.trim()
    console.log(newNoteTrim)
    if(newNoteTrim < 1){
      return( "Note must be filled out" )
    }
  }

  validateFolder() {
    if(this.state.folderSelection === 'none'){
      return "Please select a valid folder"
    }
  }

  render() {
    const { folders=[]} = this.context;
    const newNoteError = this.validateNewNote();
    const folderSelectionError = this.validateFolder();
    if(this.state.click){
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
                <option value={folder.name}>{folder.name}</option>
              )}
            </select>
            {this.state.folderTouched && (
              <ValidationError message={folderSelectionError} />
            )}            
            <button type='submit' disabled={this.validateNewNote() || this.validateFolder()}>Save</button>
          </div>
        </form>
      );
    } else {
      return(
        <button type='button' onClick={e => this.clickHandler()}>Add Note</button>
      );
    }
  }
}

