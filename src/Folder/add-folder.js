import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';
import PropTypes from 'prop-types';


export default class AddFolder extends Component { // folder id is 32 charecters long
  constructor(props){
    super(props);
    this.state = {
      newFolder: '',
      touched: false
    }
  }
  static contextType = ApiContext
  
  updateFolderName(newFolder){
    this.setState({newFolder: newFolder, touched: true});
  }

  validateFolderName() {
    const { folders=[] } = this.context
    const newFolderName = this.state.newFolder.trim()
    console.log(newFolderName)
    if(newFolderName.length < 1 || newFolderName.match(/[0-9]/)){
      return "Enter a valid Folder Name"
    }else if ( folders.includes(newFolderName)){
      return "There is already a folder by that name"
    }
  }

  handleSubmit(event) {
    const newFolderId = Math.floor(Math.random() * Math.floor(999999999999))
    event.preventDefault();
    fetch(`${config.API_ENDPOINT}/folders/${newFolderId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        else console.log(res.json())
      })
      
      .catch(error => {
        console.error({ error })
      })
    // I need to figure out how to update folders and note list. Callback? how does this work with context.
  }

  render() {
      return(
        <form className='Form-Class'>
          <h2> Add a Folder</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" onChange={e => this.updateFolderName(e.target.value)}/>
            {this.state.touched && ( <ValidationError message={this.validateFolderName} />)}
            <button type='submit' disabled={this.validateFolderName()}>Save</button>
          </div>
        </form>
      ); 
  }
}

AddFolder.propTypes = {
  newFolder: PropTypes.string,
  touched: PropTypes.bool,
}