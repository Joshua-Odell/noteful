import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import ValidationError from '../Errors/ValidationError';
import config from '../config';
import PropTypes from 'prop-types';
import FormError from '../Errors/FormError';
import Base from '../Nav/Base';


export default class AddFolder extends Component { 
  constructor(props){
    super(props);
    this.state = {
      name: '',
      touched: false
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
  
  updateFolderName(newFolder){
    this.setState({name: newFolder, touched: true});
  }

  validateFolderName() {
    const { folders=[] } = this.context
    const newFolderName = this.state.name.trim()
    console.log(newFolderName)
    if(newFolderName.length < 1 || newFolderName.match(/[0-9]/)){
      return "Enter a valid Folder Name"
    }else if ( folders.includes(newFolderName)){
      return "There is already a folder by that name"
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name: this.state.name })
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
      return(
        <FormError>
          <div>
            <form className='Form-Class' onSubmit={this.handleSubmit}>
              <h2> Add a Folder</h2>
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" onChange={e => this.updateFolderName(e.target.value)}/>
                {this.state.touched && ( <ValidationError message={this.validateFolderName} />)}
                <button type='submit' disabled={this.validateFolderName()}>Save</button>
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

AddFolder.propTypes = {
  newFolder: PropTypes.string,
  touched: PropTypes.bool,
}