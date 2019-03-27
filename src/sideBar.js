import React from 'react';
import Folder from './Folder'
import { Route } from 'react-router-dom';
import Notes from './Note';


export default class SideBar extends React.Component{
    
    render(){
        console.log('here')
        const folders = this.props.folders.map((item, index) => {
            return (
                <Folder key={index}  folderName = {item.name}
                folderId= {item.id}>
                <Route path="/folder" component = {Notes}></Route>
                </Folder>
            )
        });
        return(
            <div className="side-bar">
                {folders}
                <p>I'm working</p>
            </div>
        )
    }
}