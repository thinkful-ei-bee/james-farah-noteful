import React from 'react';
import { Link } from 'react-router-dom';

export default class Folder extends React.Component{
    render(){
    

        return(
            <div className="folder-side-bar">
                <p><Link to={`/folder/:${this.props.folderId}`} >{this.props.folderName}</Link></p>
            </div>
        )
    }
}