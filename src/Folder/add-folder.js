import React, { Component } from 'react';
import ApiContext from '../ApiContext';


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

  render() {
      return(
        <form className='Form-Class'>
          <h2> Add a Folder</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" onChange={e => this.updateFolderName(e.target.value)}/>
            <button type='submit'>Save</button>
          </div>
        </form>
      ); 
  }
}