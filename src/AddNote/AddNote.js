import React, { Component } from 'react';
import ValidationError from '../Errors/ValidationError'
import ApiContext from '../ApiContext';
import config from '../config';
import PropTypes from 'prop-types';
import FormError from '../Errors/FormError';
import Base from '../Base/Base'


export default class AddNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      folderId: '',
      content: '',
      touched: false,
      folderTouched: false
    }
  }

  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = ApiContext

  clickHandler(){
    this.setState({click: true})
  }

  updateNoteName(name){
    this.setState({name: name, touched: true});
  }

  folderSelector(folderChoice){
    this.setState({folderId: folderChoice, folderTouched: true});
  }

  updateContent(message){
    this.setState({content: message});
  }

  validateNewNote() { 
    const newNoteTrim = this.state.name.trim()
    if(newNoteTrim < 1){
      return( "Note must be filled out" )
    }
  }

  validateFolder() {
    if(this.state.folderId === 'none'){
      return "Please select a valid folder"
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name: this.state.name, folderId: this.state.folderId, content: this.state.content })
    })
    .then(res => {
      console.log({res})
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e))
      } else {
        // console.log(res.json())
        return res.json()
      }
    }).then(body => {
      this.context.addFolder(body)
    })
    .catch(error => {
      console.error({ error })
    })
  }

  render() {
    const { folders=[]} = this.context;
    const newNoteError = this.validateNewNote();
    const folderSelectionError = this.validateFolder();
    
      return(
        <FormError>
          <div>
            <form onSubmit={this.handleSubmit}>
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
            <Base
              tag='button'
              role='link'
              onClick={() => this.props.history.goBack()}
              className='NotePageNav__back-button'
            >
              <br />
              Back
            </Base>
          </div>          
        </FormError>
        
      ); 
  }
}

AddNote.propTypes = {
  name: PropTypes.string,
  folderId: PropTypes.string,
  content: PropTypes.string,
  touched: PropTypes.bool,
  folderTouched: PropTypes.bool,
};
