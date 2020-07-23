import React from 'react';
import ApiContext from '../ApiContext';

export default class ListFolders extends React.Component {
    static defaultProps = {
        click: false,
      match: {
        params: {}
      }
    }
    static contextType = ApiContext

    handleDeleteNote = folderId => {
        this.props.history.push(`/`)
      }


    render() {
        const { folderId } = this.props.match.params
        const { folders=[] } = this.context
        
        

        return(
            <div>
                <ul>
                    {folders.map(folder =>
                    <li key={folder.id} onClick={e => this.props.settingSelectedFolder(folder.id)}>
                        {folder.name}
                    </li>
                    )}
                </ul>
                
                
            </div>
        )
    }
    
} 