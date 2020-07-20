import React from 'react';


export default function AddFolder(click) {
    if(click) {
      return(
        <form>
          <h2> Add a Folder</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" />
            <button type='submit'>Submit</button>
          </div>
        </form>
      );
    } else {
        return(
          <button type='button'>Save</button>
        );
      }
}