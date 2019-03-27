import React from 'react';
import Header from './header'
import { Link } from 'react-router-dom';
import SideBar from './sideBar';
import { Route } from 'react-router-dom';
import Notes from './Note';


export default class MainPage extends React.Component{
    render(){
        return(
            <div className="main-page">
                
            <Header/>
            <Route path='/folder' render={()=> <SideBar folders={this.props.folders}/>}/>
       {/* <Route path='/sideBar' component={SideBar}/>
       
    //    render={()=> <SideBar folders={this.props.folders} />}  */}
       
           
           
        <Route path='/notes' render={()=> <Notes notes={this.props.notes} />}
            />
     
            </div>
        )
    }
}