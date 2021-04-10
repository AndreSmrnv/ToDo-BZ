import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CreateList from "@logged_in/components/CreateList";
import { Link } from "react-router-dom";
import { addList } from '@actions/lists';
import { loadLists } from '@actions/lists';
import { loadTasks } from '@actions/tasks';

class ListsUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentList: '',
        }
    }

    addList = (name) => {
        // Request (name, pattern_id, predefined, user_id)
        this.props.addList(name, 1, 0, this.props.userId);
    }

    getCurrentList(index) {
        return this.state.currentList === index;
    }

    setCurrentList(index) {
        this.setState({
            currentList: index,
        });
    }

    async handleNavigate(listId) {
        this.setCurrentList(listId);
        await this.props.loadTasks(listId);
    }

    componentDidMount() {
        this.props.loadLists('/api/lists/predefined/0');
    }

    render() {
        // console.log('this.props.lists');
        const lists = (this.props.lists) ?  this.props.lists.map((elem) => (
            <Link to={`/list/${elem.id}`}
                  key={ elem.id }
                  className="lists-user__link"
            >
                <ListItem
                    button
                    selected={ this.getCurrentList(elem.id) }
                    onClick={ () => this.handleNavigate(elem.id) } >
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={ elem.name } />
                </ListItem>
            </Link>
            )
        ) : ['Списков задач пока нет...'];

        return (
            <div className="lists-user">
                <List>
                    { lists }
                    <ListItem>
                        <CreateList user={ this.props.userId } addList={ this.addList } />
                    </ListItem>
                </List>
            </div>
        );
    }
}

const mapState = ({ listsReducer }) => ({
    lists: listsReducer.lists,
});

const mapAction = dispatch => bindActionCreators({ addList, loadLists, loadTasks }, dispatch);

export default connect(mapState, mapAction)(ListsUser);