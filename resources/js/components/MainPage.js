import React, { Component } from "react";
import ListsPredefined from "./ListsPredefined";
import ListsUser from "./ListsUser";
import Tasks from "./Tasks";

class MainPage extends Component {
     constructor() {
         super();
         this.state = {
             userId: user.user_id,
             userName: user.user_name,
             userEmail: user.user_email,
         }
     }

    render() {
        return (
            <div className="main-page">
                <ListsPredefined userId={ this.state.userId }/>
                <ListsUser userId={ this.state.userId }/>
                <Tasks userId={ this.state.userId }/>
            </div>
        );
/*
        var mainStyles = {
            height: '80vh',
            backgroundColor: '#f1efef',
            padding: '1rem',
        }
        return (
            <div style={mainStyles}>
                <h3>Hello, {this.state.userName}</h3>
                <ListsComponent />
            </div>
        );
*/
    }
}

export default MainPage;
