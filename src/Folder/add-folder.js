import React, { Component } from 'react';


export default class AddFolder extends Component { // folder id is 32 charecters long
  constructor(props){
    super(props);
    this.state = {
      click: false
    }
  }

  clickHandler(){
    this.setState({click: true})
  }

  render() {
    if(this.state.click) {
      return(
        <form>
          <h2> Add a Folder</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" />
            <button type='submit'>Save</button>
          </div>
        </form>
      );
    } else {
        return(
          <button type='button'onClick={e => this.clickHandler()}>Add a Folder</button>
        );
      }
  }
}