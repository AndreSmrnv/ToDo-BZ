import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ListComponent extends Component {

    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            tasks: [],
            currentTask: null
        }
    }

    componentDidMount() {
        /* fetch API in action */
        fetch('/api/lists/all', { credentials: "same-origin" })
            .then(response => {
                return response.json();
            })
            .then(tasks => {
                // Fetched product is stored in the state
                this.setState({ tasks });
            });
        }

    renderTasks() {
        return this.state.tasks.map(task => {
            return (
                //this.handleClick() method is invoked onClick.
                <li onClick={
                    () =>this.handleClick(task)} key={task.id} >
                    { task.name }
                </li>
            );
        })
    }

    handleClick(task) {
        //handleClick is used to set the state
        this.setState({currentTask:task});

    }

    render() {
        return (
            <div>
                <div>
                    <h3>All Tasks</h3>
                    <ul>
                        { this.renderTasks() }
                    </ul>
                </div>

                <Task task={this.state.currentTask} />
            </div>
        );
    }
}

export default ListComponent;

if (document.getElementById('list')) {
    ReactDOM.render(<ListComponent />, document.getElementById('list'));
}
