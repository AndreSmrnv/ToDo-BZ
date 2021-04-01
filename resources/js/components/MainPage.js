import React, { Component } from "react";
import ListsPredefined from "./ListsPredefined";
import ListsUser from "./ListsUser";
import Tasks from "./Tasks";
import ListsComponent from "./ListsComponent"; //Просьба пока не убирать!!!

class MainPage extends Component {
     constructor(props) {
         super(props);
         this.state = {
             userId: user.user_id,
             userName: user.user_name,
             userEmail: user.user_email,
         }
     }

    render() {
        var mainStyles = {
            height: '50vh',
            backgroundColor: '#f1efef',
            padding: '1rem',
        }
        return (

            <div className="main-page">
                <ListsPredefined userId={ this.state.userId }/>
                <ListsUser userId={ this.state.userId }/>
                <Tasks userId={ this.state.userId } listId={ this.props.listId }/>

                <div style={mainStyles}>
                    <h3>Hello, {this.state.userName}</h3>
                    <ListsComponent />
                </div>
            </div>
        );
    }
}

export default MainPage;
